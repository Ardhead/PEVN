"use strict";
const shipmentsDataModel = require( "../models" ).shipments_data;
const shipmentsService        = require( "../services" ).shipments;

// helper functions

// index renderer
const getIndex = async( req, res, next ) => {
	const apiUrl = `${req.protocol}://${req.get( "host" )}`;

	try {
		const rawData = await shipmentsDataModel.findAll( {
			order : [
				[ "new_shipment_id", "ASC" ]
			],
			raw : true
		} );
		const data = await shipmentsService.prepare( rawData );
		
		return res.render( "index", { title: "PEVN Stack", data: { apiUrl, shipments: data } } );
	} catch ( error ) {
		console.log('test error', error);
		if (error.message.includes("Cannot read property 'source_id' of undefined")) {
			// database is empty
			const rawData = await shipmentsService.fillDb();
			// returning object compiled for D3
			const data = await shipmentsService.prepare( rawData );
			return res.render( "index", { title: "PEVN Stack", data: { apiUrl, shipments: data } } );
		} else {
			return res.render( "index", { title: "PEVN Stack", data: { apiUrl, shipments: {} } } );
		}
	}
};

module.exports = { getIndex };
