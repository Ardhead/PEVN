"use strict";

const express              = require( "express" );
const path                 = require( "path" );
const logger               = require( "morgan" );
const cookieParser         = require( "cookie-parser" );
const bodyParser           = require( "body-parser" );
const app                  = express();
const webpack              = require( "webpack" );
const webpackDevMiddleware = require( "webpack-dev-middleware" );
const webpackHotMiddleware = require( "webpack-hot-middleware" );
const webpackAssets        = require( "express-webpack-assets" );

const config               = require( "./webpack.config" );

const NODE_ENV = process.env.NODE_ENV || "development";

// view engine settings
app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "jade" );
app.set( "trust proxy", true );

// express settings
app.use( logger( "dev" ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( cookieParser() );
app.use( express.static( path.join( __dirname, "public" ) ) );

// enable cross-origin resource sharing (CORS)
app.use( ( req, res, next ) => {
	res.header( "Access-Control-Allow-Origin", req.headers.origin );
	res.header( "Access-Control-Allow-Methods", "GET,PUT,POST,DELETE" );
	res.header( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token" );
	next();
} );

// webpack setup
if ( NODE_ENV === "production" ) {
	app.use( express.static( `${__dirname }/dist` ) );
} else {
	const compiler = webpack( config );

	app.use( webpackDevMiddleware( compiler, {
		publicPath : config.output.publicPath,
		stats      : { colors: true }
	} ) );
	app.use( webpackHotMiddleware( compiler ) );
}
app.use( webpackAssets( "./config/webpack-assets.json", {
	devMode : NODE_ENV !== "production"
} ) );

module.exports = app;
