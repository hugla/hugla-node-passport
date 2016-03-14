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

		if (this.config.passport.userDBAdapter) {
			this.userDBAdapterName = this.config.passport.userDBAdapter;
		} else {
			// TODO: change to error event
			throw new Error('no ');
		}

		this.userDBAdapter = app.getModule(this.userDBAdapterName);

		passport.serializeUser(function (user, done) {
			done(null, users[0].id);
		});
		passport.deserializeUser(function (id, done) {
			done(null, users[0]);
		});

		passport.use('local', new LocalStrategy(
			function (username, password, done) {

			})
		);

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