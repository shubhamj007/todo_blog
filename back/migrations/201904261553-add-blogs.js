'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'blogs',
        'imgUrl',
        {
          type: Sequelize.STRING,
          allowNull: true
        }
      ),
      queryInterface.addColumn(
        'blogs',
        'public_id',
        {
          type: Sequelize.STRING,
          allowNull: true
        }
      ),
      queryInterface.addColumn(
        'blogs',
        'version',
        {
          type: Sequelize.STRING,
          allowNull: true
        }
      )
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('blogs', 'imgUrl'),
      queryInterface.removeColumn('blogs', 'public_id'),
      queryInterface.removeColumn('blogs', 'version')
    ]);
  }
};
