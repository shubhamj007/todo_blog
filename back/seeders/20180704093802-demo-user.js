'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        
        await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
	    // await queryInterface.sequelize.query('TRUNCATE TABLE user_roles');
	    // await queryInterface.sequelize.query('TRUNCATE TABLE permission_sets');
	    await queryInterface.sequelize.query('TRUNCATE TABLE users');
        
        let currentDate = new Date();
        return await queryInterface.bulkInsert('users', [{
                first_name: 'admin',
                last_name: 'admin',
                email: 'admin@admin.com',
                password: '$2b$10$vX3uNCKX3vm8pOHE3E8Kj.0jfjE3h5NPR94fYZMl1bDwIsbFR4nMa',
                // role_id: roleId,
                // permission_set_id: permissionSetId,
                created_at: currentDate,
                updated_at: currentDate
            }
        ]).then(_=>{
            queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        })
    },

    down: (queryInterface, Sequelize) => {  
        return queryInterface.bulkDelete('users', null, {});
    }
};
