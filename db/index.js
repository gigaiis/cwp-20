const City = require('./city');
const Country = require('./country');
const CountryLanguage = require('./countryLanguage');
const Promise = require('bluebird');
const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

module.exports = (Sequelize, config)=>
{
    const sequelize =   new Sequelize('world', 'root', '11111',
                                    {
                                        host: '127.0.0.1',
                                        dialect: 'mysql',
                                        define: {
                                            timestamps: false,
                                            paranoid: false,
                                            freezeTableName: true
                                        }
                                    });

    const city = City(Sequelize, sequelize);
    const country = Country(Sequelize, sequelize);
    const countryLanguage = CountryLanguage(Sequelize, sequelize);

    country.hasMany(city, {foreignKey: 'CountryCode', primaryKey: 'Code'});
    country.hasMany(countryLanguage, {foreignKey: 'CountryCode', primaryKey: 'Code'});


    return {
        city,
        country,
        countryLanguage,
        sequelize: sequelize,
        Sequelize: Sequelize
    };
};