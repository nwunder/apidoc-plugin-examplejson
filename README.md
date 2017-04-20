# apidoc-plugin-examplejson

`@apiExampleJson {json=./success-example.json} apiSuccessExample Response 200`

Declutter apidoc strings by moving inline json examples to a file.

Turn this:

```javascript
/**
 * @api {get} /index Index
 * @apiSuccessExample Response 200
 * {
 *	 "success": true,
 *   "result": {
 *     "answer": 42
 *   }
 * }
 */
```

Into this:

```javascript
/**
 * @api {get} /index Index
 * @apiExampleJson {json=./api-examples/success-example.json} apiSuccessExample Response 200
 */
```

__success-example.json__
	```json
	{
	 "success": true,
	  "result": {
	    "answer": 42
	  }
	}
	```

## Configuration

Configure a default path to json files in apidoc.json.

```json
{
	"apiExampleJsonPath": "api-examples/"
}
```

Resolves from project root. For example, if `"apiExampleJsonPath" = "api-examples/"`, the drop the relative path from:

`@apiExampleJson {json=../api-examples/example.json} apiSuccessExample Response 200`

to get:

`@apiExampleJson {json=example.json} apiSuccessExample Response 200`

Both relative path and configured root path can be in use at the same time. If the path starts with '.' then the path is resolved from the file that defined the apidoc string. Otherwise, the path is resolved using the configured root path. If no root path is configured then './' is used as the default.

## Example Use

```javascript
/**
 * @api {get} /index Index
 * @apiExampleJson {json=./example.json} apiSuccessExample Response 200
 */
```
