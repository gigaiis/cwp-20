const express = require('express');
const Promise = require('bluebird');
const bodyParser = require('body-parser');
const pug = require('pug');
const Sequelize = require('sequelize');

const app = express();

const db = require('./db')(Sequelize, '');
const Op = Sequelize.Op;

module.exports = db;

async function main()
{
    app.set('view engine', 'pug');

    app.use('/countries', require('./api/countries'));
    app.use('/cities', require('./api/cities'));
    app.get('/', (req, res) =>
    {
        res.render('index', { countriesCount: 10, citiesCount: 42 });
    });

    app.listen(3000, () => console.log('Example app listening on port 3000!'));

}

main();