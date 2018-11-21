"use strict";
const shipmentsDataModel = require( "../models" ).shipments_data;
const shipmentsService   = require( "../services" ).shipments;

// index renderer
const getIndex = async( req, res, next ) => {
	const apiUrl = `${req.protocol}://${req.get( "host" )}`;

	try {
		// get data from database ordered by new_shipment_id in case it is parent id
		const rawData = await shipmentsDataModel.findAll( {
			order : [
				[ "new_shipment_id", "ASC" ]
			],
			raw : true
		} );
		const data = await shipmentsService.prepare( rawData );
		// all is OK, render index & send data
		return res.render( "index", { title: "PEVN Stack", data: { apiUrl, shipments: data } } );
	} catch ( error ) {
		if (error.message.includes("Cannot read property 'source_id' of undefined")) {
			// database is empty
			const rawData = await shipmentsService.fillDb();
			// returning object compiled for D3
			const data = await shipmentsService.prepare( rawData );
			// all is OK, render index & send data
			return res.render( "index", { title: "PEVN Stack", data: { apiUrl, shipments: data } } );
		} else {
			// unexpected error sending
			return res.render( "index", { title: "PEVN Stack", data: { apiUrl, shipments: {} } } );
		}
	}
};

module.exports = { getIndex };
