"use strict";
// helper functions
const csvToJson          = require( "csvtojson" );
const shipmentsDataModel = require( "../models" ).shipments_data;

// define children circle props
const setChildrenProps = async( childrenArrObj ) => {
	return {
		name : childrenArrObj.cost,
		size : childrenArrObj.weight
	};
};
// define parent circle props
const setParentsProps = async( childrenArr ) => {
	return {
		name     : childrenArr[ 0 ].new_cost,
		size     : childrenArr[ 0 ].new_weight,
		children : await Promise.all( childrenArr.map( setChildrenProps ) )
	};
};

// import functions
const prepare = async( rawData ) => {
	// parse into self save memory
	rawData = JSON.parse( JSON.stringify( rawData ) ); // eslint-disable-line
	// initialize json struture & set master circle props
	let json = { name: rawData[ 0 ].source_id, children: [] };
	
	// parse data by new_shipment_id which is parent id
	await Promise.all( rawData.map( ( rawDataObj ) => {
		if ( !json.children[ rawDataObj.new_shipment_id - 1 ] ) {
			json.children[ rawDataObj.new_shipment_id - 1 ] = [];
		}
		json.children[ rawDataObj.new_shipment_id - 1 ].push( rawDataObj );
		return null;
	} ) );
	json.children = await Promise.all( json.children.map( setParentsProps ) );

	return json;
};

// fill database from project csv file
const fillDb = async () => {
	const jsonArray = await csvToJson().fromFile( `${__dirname}/../csv/shipments.csv` );

	const rawData = await shipmentsDataModel.bulkCreate( jsonArray );
	return rawData;
}

// initialize db
const initializeDb = async () => {
	// database is empty
	const countShipments = await shipmentsDataModel.count();
	if (countShipments === 0) {
		await fillDb()
	}
}
initializeDb();

module.exports = { prepare, fillDb };
