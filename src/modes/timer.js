export default {
  id: 'timer',
  name: 'Timer',
  icon: '⏱️',
  get description() {
    return `Guess as many flags as possible within ${this.timerDuration} seconds!`;
  },

  // ========================================================================================================================
  // SETTINGS
  // ========================================================================================================================
  hasRegions: true,
  regions: ['World', 'Africa', 'America', 'Asia', 'Europe', 'Oceania'],
  hasTimer: true,
  timerDuration: 60, // in seconds
  feedbackDelay: 500, // faster feedback for timer mode
  wrongAnswersCount: 3,

  // ========================================================================================================================
  // HOOKS -- Functions called by the store at specific moments
  // ========================================================================================================================
  
  // Returns how many rounds to play (infinite until timer ends)
  initRounds() {
    return Infinity;
  },

  // Returns the next flag to guess
  pickNextFlag(flags, index, lastFlag) {
    const flag = flags[Math.floor(Math.random() * flags.length)];
    
    // Guard: avoid infinite loop if only 1 flag
    if (flags.length <= 1 || flag !== lastFlag) {
      return flag;
    }
    
    // Pick again to avoid repetition
    return this.pickNextFlag(flags, index, lastFlag);
  },

  // Returns current round number (tracked counter in timer)
  getCurrentRound(totalRounds, roundsLeft, roundCount) {
    return roundCount;
  },
};
