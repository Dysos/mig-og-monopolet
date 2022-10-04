const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app.js');

app.listen(4000, () => {
	console.log('Server listening on port 3000');
});
