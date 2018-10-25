const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const db = require('../index');

const app = express.Router();
app.use(bodyParser.json());

app.get('/', (req, res) =>
{
    db.country.findAll()
        .then(arr =>
              {
                  let page = req.query.page? req.query.page: 1;
                  res.render('countries',
                  {
                      pageNumber: page,
                      countries: arr.slice(25 * (page - 1), 25 * page),
                      countPages: Math.ceil(arr.length / 25)
                  });
              });
});

app.get('/[A-Z][A-Z][A-Z]/', (req, res) =>
{

    async function sample()
    {
        let country = await db.country.findAll({where: {Code: req.url.slice(1)}});
        let capital = await db.city.findById(country[0].dataValues.Capital);
        let cities = await db.city.findAll({where: {CountryCode: req.url.slice(1)}, limit: 3, order:[['Population', 'DESC']]});
        let languages = await db.countryLanguage.findAll({where: {CountryCode: req.url.slice(1)}, limit: 3, order: [['Percentage', 'DESC']]});

        res.render('country',
                   {
                       country: country[0].dataValues,
                       capital: capital.dataValues,
                       cities: cities,
                       languages: languages,
                   });

    }
    sample();
});

module.exports = app;