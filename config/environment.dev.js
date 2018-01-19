/* eslint-env node */

const path = require('path');

module.exports = {
	NODE_ENV: 'development',
	OUTPUT_PUBLIC_PATH: '/',
	API_BASE_URL: 'http://api.tetra.ngrok.io',
	ALGOLIA_APP_ID: 'LDSERUCMS9',
	ALGOLIA_UTTERANCES_INDEX: 'utterances_stag',
	STRIPE_API_KEY: 'pk_test_ithBBU3VJ3z7OcJGizGYvQOf',
	INTERCOM_APP_ID: 'w52j168d',
	BRANCH_KEY: 'key_test_iaEOIEWWsgY2CWfsIyEMVbkiuxflv4GL',

	DEV_SERVER: {
		quiet: false,
		contentBase: path.join(__dirname, '..', 'devserver'),
		historyApiFallback: true, // redirect 404s to top-level index.html
		hot: true, // enable hot-reloading

		port: 4000,
		host: 'localhost',
		disableHostCheck: true
	}
};
