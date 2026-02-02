/**
 * Shuffles an array in place using the Fisher-Yates algorithm
 * @param {Array} array - The array to shuffle
 * @returns {Array} - The shuffled array
 */
export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Returns the flag URL for a given country code
 * Using local SVG files from assets/world_flags
 * @param {string} code - The country code (e.g., 'FR', 'US')
 * @returns {string} - The URL to the flag image
 */
export function getFlagUrl(code) {
  return new URL(`../assets/world_flags/${code.toLowerCase()}.svg`, import.meta.url).href;
}

/**
 * Preloads flag images for better performance
 * @param {Array} flags - Array of flag objects with code property
 * @returns {Promise} - Promise that resolves when all flags are loaded
 */
export function preloadFlags(flags) {
  const promises = flags.map(flag => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = resolve; // Resolve even on error to not block the game
      img.src = getFlagUrl(flag.code);
    });
  });
  
  return Promise.all(promises);
}
