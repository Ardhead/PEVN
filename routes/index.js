"use strict";
const express = require( "express" );
const mainController = require( "../controllers/index" ).main;
const router = express.Router();

router.get( "/", mainController.getIndex );

module.exports = router;
