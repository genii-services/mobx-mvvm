/*
function handleError(e, isFatal) {
	try {
		//require('ExceptionsManager').handleException(e, isFatal)
		console.warn('[Exception]', e.stack)  
	} catch(ee) {
	  	console.warn('Failed to print error: ', ee.message)
	}
}

var ErrorUtils = require('ErrorUtils')
ErrorUtils.setGlobalHandler(handleError)
*/
export function whoami(_this, _arguments, deco = '1;94') {
	return `\x1b[${deco}m[${_this ? typeof _this === 'object' ? _this.constructor.name : _this.toString() : 'unknown' }.${_arguments ? typeof _arguments === 'object' ? _arguments.callee.name : _arguments.toString() : optional || '' }]\x1b[0m`
}

export function trace() {
	if(__DEV__) console.log(...arguments)
}

