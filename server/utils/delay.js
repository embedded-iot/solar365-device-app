const delay = (timeDelay) => {
  return new Promise(((resolve, reject) => {
    setTimeout(resolve, timeDelay)
  }));
};

module.exports = delay
