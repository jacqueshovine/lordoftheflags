# Key Takeaways 


# Flag Preloading & Caching Strategy

## The Problem

**Issue:** Flags were loading slowly between rounds, especially on poor connections, because:
1. Each flag is a separate HTTP request to the dev server
2. Browsers lazy-load images only when `<img>` tags are rendered
3. Even local files take time: disk read → parse SVG → render

## The Solution: Preload + Cache

**Strategy:** Load all flags into browser cache before the game starts, then use cached versions during gameplay.

## Implementation

### 1. Preload Function (`helpers.js`)

```javascript
export function preloadFlags(flags) {
  const promises = flags.map(flag => {
    return new Promise((resolve) => {
      const img = new Image();           // Create invisible Image object
      img.onload = () => resolve(img);   // Resolve with the image itself
      img.onerror = () => resolve(img);  // Don't block on errors
      img.src = getFlagUrl(flag.code);   // Trigger browser download
    });
  });
  
  return Promise.all(promises);  // Wait for all, return array of Image objects
}
```

**Key points:**
- Setting `img.src` triggers browser to download and cache the image
- Browser caches by URL - same URL = cache hit (instant)
- Returns the Image objects (not just resolving) - this is critical!

### 2. Store References (`game.js`)

```javascript
const preloadedImages = ref([]);  // Keep references alive

async function initGame(filter = null) {
  loading.value = true;
  
  // Store the returned Image objects
  preloadedImages.value = await preloadFlags(getFilteredFlags.value);
  
  loading.value = false;
  gameRunning.value = true;
  nextRound();
}
```

### 3. Cleanup (`resetGame`)

```javascript
function resetGame(playAgain = false) {
  preloadedImages.value = [];  // Clear references, allow GC to clean up
  
  if (playAgain) {
    initGame(currentFilter.value);  // Reload flags for new game
  }
}
```

## The Garbage Collection Caveat

### The Problem

- Image objects created temporarily get garbage collected
- When GC runs, it may signal the browser to clear unused cached data
- Without persistent references, flags could be evicted from cache

### The Solution

```javascript
// ❌ WITHOUT REFERENCES - Images can be garbage collected
await preloadFlags(flags);  // Images loaded, then unreachable
// GC may delete Image objects → browser may clear cache → flags reload slowly

// ✅ WITH REFERENCES - Images stay in memory
preloadedImages.value = await preloadFlags(flags);  // Store references
// GC sees: Pinia store → preloadedImages → Image objects
// Can't delete - still reachable! → Cache guaranteed to stay
```

## How Browser Caching Works

1. **During preload:** `img.src = "url"` → Browser downloads and caches by URL
2. **During game:** `<img :src="getFlagUrl(code)">` → Same URL → Cache hit → Instant display
3. **Cache persistence:** As long as Image objects have references, GC won't touch them

## JavaScript Garbage Collection (GC)

### How It Works

JavaScript uses **"mark and sweep"** with **reachability**:

1. **Root objects** - Always reachable:
   - Global variables
   - Currently executing function's local variables
   - Variables in the call stack (e.g., Pinia store)

2. **Mark phase** - GC traces from roots to find all reachable objects

3. **Sweep phase** - Anything NOT reachable gets deleted

### Key Principle

**The GC only cares about "Can this be reached RIGHT NOW?" not "Might it be used later?"**

```javascript
const preloadedImages = ref([img1, img2, img3]);
// GC thinks: "preloadedImages exists → can reach the array → can reach images"
// Result: Keep everything (even if never used again)

preloadedImages.value = [];
// Old images no longer reachable → GC deletes them
```

### Reachability Chain

```
Pinia Store (root)
    ↓
preloadedImages.value (array)
    ↓
[img1, img2, img3...] (Image objects)
    ↓
Cached flag data in browser memory
```

As long as this chain exists, the GC won't touch anything in it.

### Vue ref() vs Native JavaScript

`ref()` doesn't change how GC works - it's just a reactive wrapper:

```javascript
// Vue ref
const preloadedImages = ref([]);

// Is essentially
const preloadedImages = { value: [] };
```

The GC treats both the same way - it only cares about reachability through any variable/property.

## Result

- **~1-2 second wait** when starting a game (with loader displayed)
- **Instant flag display** for all rounds (0ms load time)
- **Smooth gameplay** even on poor connections
- **Memory efficient** - flags cleared when game ends

## Async/Await Concepts Used

### What `await` Does

```javascript
await preloadFlags(firstBatch);  // Pauses HERE until Promise resolves
console.log("Loaded!");          // Only runs AFTER preload finishes
```

- `await` pauses **only this function** - rest of the app keeps running
- Browser doesn't freeze; other components, animations continue

### Why `async` is Required

```javascript
// ✅ VALID
async function initGame() {
  await preloadFlags(firstBatch);
}

// ❌ ERROR - can't use await without async
function initGame() {
  await preloadFlags(firstBatch);  // SyntaxError!
}
```

**`async` tells JavaScript:** "This function will use `await` and work with Promises"

When you mark a function as `async`:
1. Allows you to use `await` inside it
2. Automatically wraps the return value in a Promise

### Promises Explained

A **Promise** represents an asynchronous operation that will complete in the future.

```javascript
return new Promise((resolve) => {
  const img = new Image();
  img.onload = () => resolve(img);  // "I'm done! Here's the result"
  img.src = url;                     // Start async operation
});
```

**In our preloading:**
- Each promise = "loading one flag image"
- `Promise.all()` = wait for ALL promises to resolve
- Returns when every single flag has finished downloading
