const shipmentsDataModel = require( "../models" ).shipments_data;
const dataService        = require( "../services" ).data;

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
		const data = await dataService.prepare( rawData );
		
		return res.render( "index", { title: "PEVN Stack", data: { apiUrl, shipments: data } } );
	} catch ( error ) {
		return res.render( "index", { title: "PEVN Stack", data: { apiUrl, shipments: {} } } );
	}
};

module.exports = { getIndex };
