'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.addColumn('blogs', 'likes', {
    type: Sequelize.INTEGER
  })
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.removeColumn('blogs', 'likes') 
  }
};
