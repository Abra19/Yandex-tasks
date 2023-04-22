let currentConfig = 'first';

const changeConfig = (config) => {
	console.log(config, 'config');
	currentConfig = config;
}

const configValue = (key) => {
	console.log(currentConfig, 'current')
	return `${currentConfig}:${key}`;
}

module.exports = {
	changeConfig,
	configValue,
}
