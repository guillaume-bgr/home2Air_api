const http = require('http');
const express = require('express')
const app = express();
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('home2air_api', 'root', '', {
        host: 'localhost',
        dialect: 'mysql'
});

async function test() {
	try {
		await sequelize.authenticate();
		console.log('Nous sommes connectés à la base de données');
	} catch (error) {
		console.error('Unable to connect to the database:');
	}
	try {
		await sequelize.sync();
		console.log('Toutes les tables ont été modifiées');
		} catch (error) {
			console.error('Erreur');
		}
}

test();


app.use(express.static('public'));

app.get('/', (request, response) => {
  console.log('hey')
})

app.listen('3000', 'localhost', () => {
    console.log('server start');
});