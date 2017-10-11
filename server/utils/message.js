var generateMessage = (from, text,type) => {
  return {
    from,
    text,
    type,
    createdAt: new Date().getTime()
  };
};

module.exports = {generateMessage};
