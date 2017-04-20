const trim = require('trim');

function parse(content) {
	content = trim(content);

	if (content.length === 0)
		return null;

	// @apiExampleJson (optional group) {json=relative_path} additional_argument
	var parseRegExp = /^(?:\((.+?)\)){0,1}\s*\{(.+?)=(.+?)\}\s*(?:(.+))?/g;
	var matches = parseRegExp.exec(content);
	var parseRegExp2 = /^(\w+)\s*(.*)/;
	var matches2 = parseRegExp2.exec(matches[4]);

	if ( ! matches)
		return null;

	return {
		group: matches[1],
		schema : matches[2],
		path : matches[3],
		element : matches2[1],
		title: matches2[2]
	};
}

module.exports = {
	parse: parse,
	path: 'local',
	method: 'push',
	preventGlobal: true
};
