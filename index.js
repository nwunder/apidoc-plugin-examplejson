module.exports = {
	init: function(app) {
		app.addHook('parser-find-element-apiexamplejson', require('./src/apiexamplejson')(app));
	}
};
