"use strict";
module.exports = {
	up : ( queryInterface, Sequelize ) => {
		return queryInterface.createTable( "shipments_data", {
			shipment_id : {
				allowNull     : false,
				autoIncrement : true,
				primaryKey    : true,
				type          : Sequelize.INTEGER
			},
			cost : {
				type      : Sequelize.SMALLINT,
				allowNull : false
			},
			new_cost : {
				type      : Sequelize.SMALLINT,
				allowNull : false
			},
			new_weight : {
				type      : Sequelize.INTEGER,
				allowNull : false
			},
			new_shipment_id : {
				type      : Sequelize.INTEGER,
				allowNull : false
			},
			source_id : {
				type      : Sequelize.STRING,
				allowNull : false
			},
			weight : {
				type      : Sequelize.INTEGER,
				allowNull : false
			}
		} );
	},
	down : ( queryInterface, Sequelize ) => {
		return queryInterface.dropTable( "shipments_data" );
	}
};
