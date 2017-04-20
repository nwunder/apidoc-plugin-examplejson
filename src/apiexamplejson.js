const fs = require('fs');
const path = require('path');
const elementParser = require('./parser-apiexamplejson');

function parseElements(app) {
	this.rootPath = './';

	if (!app.packageInfos) {
		throw new Error('Unexpected app, "packageInfos" not found.')
	}
	if (app.packageInfos.apiExampleJsonPath) {
		this.rootPath = app.packageInfos.apiExampleJsonPath;
	}

	return (element, block, filename) => {
		if (element.name === 'apiexamplejson') {
			let values = elementParser.parse(element.content, element.source);

			// relative path from project root if not explicitly defined as relative path
			let pathToFile = path.join(this.rootPath, values.path);
			if (values.path.startsWith('.')) {
				// relative path from file that defines the apidoc string
				pathToFile = path.join(path.dirname(filename), values.path);
			}
			let data = fs.readFileSync(pathToFile, 'utf8').toString();
			element.source = `@${values.element} {json} ${values.title}\n${data}\n`;
			element.name = values.element.toLowerCase();
			element.sourceName = values.element;
			element.content = `{json} ${values.title}\n${data}\n`;
		}

		return element;
	}
}

module.exports = parseElements;
