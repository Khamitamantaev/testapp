module.exports = (sequelize, Sequelize) => {
    const Log = sequelize.define("logging", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
    });
    return Log;
  };