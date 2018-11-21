const express = require( "express" );
const router = express.Router();
const multipart = require( "connect-multiparty" );
const multipartMiddleware = multipart();
const shipmentsController = require( "../controllers/index" ).shipments;

// csv upload route
router.post( "/", multipartMiddleware, shipmentsController.upload );
// destroy all database data route
router.delete( "/", shipmentsController.clean );

module.exports = router;
