"use strict";

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userDBAdapterInterface = require('hugla-user-db-adapter');

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

		if (this.config.userDBAdapter) {
			this.userDBAdapterName = this.config.userDBAdapter;
		} else {
			// TODO: change to error event
			throw new Error('no ');
		}

		app.registerLaunchAction(this._onLaunch.bind(this));
		/*


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
		 */

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

	_onLaunch(callback) {
		this.userDBAdapter = app.getModule(this.userDBAdapterName);

		if (!this.userDBAdapter instanceof userDBAdapterInterface) {
			throw new Error("Module '" + this.userDBAdapterName + "' is not compliant with hugla-user-db-adapter module");
		}

		process.nextTick(function() {
			callback();
		});
	}
}

module.exports = HuglaPassport;