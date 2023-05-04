module.exports = (sequelize, Sequelize) => {
    const User_Login = sequelize.define("login", {/* login c'est le nom de la table ds la database */
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      }
    });
  
    return User_Login;
  };
  