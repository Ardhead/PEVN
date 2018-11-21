"use strict";
module.exports = ( sequelize, DataTypes ) => {
	const shipmentsData = sequelize.define( "shipments_data",
		{
			shipment_id : {
				allowNull : false,
				type      : DataTypes.INTEGER
			},
			cost : {
				type      : DataTypes.SMALLINT,
				allowNull : false
			},
			new_cost : {
				type      : DataTypes.SMALLINT,
				allowNull : false
			},
			new_weight : {
				type      : DataTypes.INTEGER,
				allowNull : false
			},
			new_shipment_id : {
				type      : DataTypes.INTEGER,
				allowNull : false
			},
			source_id : {
				type      : DataTypes.STRING,
				allowNull : false
			},
			weight : {
				type      : DataTypes.INTEGER,
				allowNull : false
			}
		},
		{
			timestamps : false
		}
	);

	shipmentsData.associate = function( models ) {
		// associations can be defined here
	};
	shipmentsData.removeAttribute( "id" );
	return shipmentsData;
};
