const envLoader = require('./index.js');
envLoader.init(['PORT', 'DB_URL']);
console.log('My Port is:', process.env.PORT);
