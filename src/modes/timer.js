export default {
  id: 'timer',
  name: 'Timer',
  icon: '⏱️',
  description: 'Guess as many flags as possible within a time limit.',

  // ========================================================================================================================
  // SETTINGS
  // ========================================================================================================================
  hasRegions: true,
  regions: ['World', 'Africa', 'America', 'Asia', 'Europe', 'Oceania'],
  hasTimer: true,
  timerDuration: 30, // in seconds
  feedbackDelay: 500, // faster feedback for timer mode
};
