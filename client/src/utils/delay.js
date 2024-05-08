const delay = async (duration) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve();
    }, duration);
  });
};

export default delay;
