"use strict";
const shipmentsDataModel = require( "../models" ).shipments_data;
const csvToJson          = require( "csvtojson" );
const shipmentsService   = require( "../services" ).shipments;
const fs                 = require( "fs" );

// csv config upload to database
const upload = async( req, res ) => {
	try {
		const csvFilePath = req.files.csv.path;
		const jsonArray = await csvToJson().fromFile( csvFilePath );
	
		await fs.unlinkSync( csvFilePath );
		const rawData = await shipmentsDataModel.bulkCreate( jsonArray );
		// returning object compiled for D3
		const data = await shipmentsService.prepare( rawData );
	
		return res.status( 200 ).send( data );
	} catch ( error ) {
		return res.status( 400 ).send( error );
	}
};

// destroy all database data
const clean = async( req, res ) => {
	try {
		await shipmentsDataModel.destroy( { where: {} } );
		return res.status( 200 ).send( "OK" );
	} catch ( error ) {
		return res.status( 400 ).send( error );
	}
};


module.exports = {
	upload,
	clean
};
