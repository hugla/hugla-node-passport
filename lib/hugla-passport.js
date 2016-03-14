"use strict";

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

/**
 * HuglaPassport -
 */
class HuglaPassport {

	/**
	 * Class constructor
	 * @param {object} app Hugla app
	 * @param {object} app.config Configuration object
	 * @param {object} app.config.passport passport config object
	 */
	constructor(app) {
		this.config = app.config.passport || {};

		const http = app.getModule('hugla-http');
		http.addMiddlewareSetupAction(this.middlewareSetup.bind(this));
	}

	/**
	 * Middleware setup method
	 *
	 * @param {object} app Express app
	 */
	middlewareSetup(app) {
		app.use(passport.initialize());
		app.use(passport.session());
	}
}

module.exports = HuglaPassport;