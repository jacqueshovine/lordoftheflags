export default {
  id: 'classic',
  name: 'Classic',
  icon: '🎯',
  description: 'Guess all flags from a region. No time limit.',

  // ========================================================================================================================
  // SETTINGS
  // ========================================================================================================================
  hasRegions: true,
  // Antarctica is included only in World region to avoid displaying it alone
  regions: ['World', 'Africa', 'America', 'Asia', 'Europe', 'Oceania'],
  hasTimer: false,
  feedbackDelay: 1500,
  wrongAnswersCount: 3,

  // ========================================================================================================================
  // HOOKS -- Functions called by the store at specific moments
  // ========================================================================================================================
  
  // Returns how many rounds to play (all flags in classic)
  initRounds(totalFlags) {
    return totalFlags;
  },

  // Returns the next flag to guess (sequential in classic)
  pickNextFlag(flags, index) {
    return flags[index];
  },

  // Returns current round numbe
  getCurrentRound(totalRounds, roundsLeft, roundCount) {
    return totalRounds - roundsLeft;
  },
};
