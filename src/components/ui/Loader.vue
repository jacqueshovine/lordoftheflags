<template>
  <div class="loader">
    <div class="compass">
      <div class="ring"></div>
      <div class="ticks"></div>
      <div class="cardinal n">N</div>
      <div class="cardinal s">S</div>
      <div class="cardinal e">E</div>
      <div class="cardinal w">W</div>
      <div class="needle">
        <svg viewBox="-28 -28 56 56">
          <polygon points="0,-22 4,0 0,3 -4,0" fill="#B94A3F" stroke="#0E2A47" stroke-width="0.8" stroke-linejoin="round"/>
          <polygon points="0,22 4,0 0,-3 -4,0" fill="#F5EBD6" stroke="#0E2A47" stroke-width="0.8" stroke-linejoin="round"/>
          <circle cx="0" cy="0" r="2" fill="#D4A940" stroke="#0E2A47" stroke-width="0.8"/>
        </svg>
      </div>
    </div>
    <div class="lbl">Loading flags…</div>
  </div>
</template>

<style scoped>
.loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: var(--space-8) 0;
}

.compass {
  width: 56px;
  height: 56px;
  position: relative;
}

.ring {
  position: absolute;
  inset: 0;
  border: 1.5px solid var(--earth-900);
  border-radius: 50%;
}

.ticks {
  position: absolute;
  inset: 0;
}
.ticks::before,
.ticks::after {
  content: "";
  position: absolute;
  background: var(--earth-900);
}
.ticks::before {
  left: 50%;
  top: 2px;
  bottom: 2px;
  width: 1px;
  transform: translateX(-50%);
}
.ticks::after {
  top: 50%;
  left: 2px;
  right: 2px;
  height: 1px;
  transform: translateY(-50%);
}

.cardinal {
  position: absolute;
  font-family: var(--font-display-sc);
  font-size: 9px;
  color: var(--earth-900);
  letter-spacing: 0.05em;
}
.n { top: -13px;    left: 50%;  transform: translateX(-50%); }
.s { bottom: -13px; left: 50%;  transform: translateX(-50%); }
.e { right: -12px;  top: 50%;   transform: translateY(-50%); }
.w { left: -12px;   top: 50%;   transform: translateY(-50%); }

.needle {
  position: absolute;
  inset: 0;
  animation: spin 2.4s cubic-bezier(0.7, 0.1, 0.3, 0.9) infinite;
}
.needle svg {
  width: 100%;
  height: 100%;
  display: block;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.lbl {
  font-family: var(--font-display-sc);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--earth-700);
}
</style>
