module.exports = function(configValue) {

	function dynamicConfigValue(key) {
		return () => configValue(key);
	}

	const findResult = (obj) => {

		const result = Object.keys(obj).reduce((acc, key) => {
			return { ...acc, [key]: obj[key] };
		}, {});
		return result;
	};

	const makeDynamicConfig = (obj) => {

		const handler  = {
			get: (item) => Object.keys(item.result).reduce((acc, key) => {
				return { ...acc, [key]: item.result[key]()};
			}, {})
		};
	
		var p = new Proxy({ result: findResult(obj)}, handler);
		return p.result;
	};

	

	return {
		makeDynamicConfig,
		dynamicConfigValue,
	};
}
/* function dynamicConfigValue(key) {
		//var p = new Proxy(configValue, handler);
		return () => configValue(key);
	}
	
	const makeDynamicConfig = (obj) => {
		const result = Object.keys(obj).reduce((acc, key) => {
			return { ...acc, [key]: obj[key]()};
		}, {});
		return result;
	};
	*/


