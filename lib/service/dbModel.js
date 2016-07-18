/**
 * Created by yuhogyun on 2016. 7. 18..
 */

var Sequelize = require('sequelize');
var Q = require('q');

function DbModel(sequelize){

    console.log("모델");

    this.models = {};

    this.models['user'] = sequelize.define('user', {
        username: Sequelize.STRING,
        birthday: Sequelize.DATE
    });

    return models;
}


module.exports = DbModel;


