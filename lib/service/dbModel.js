/**
 * Created by yuhogyun on 2016. 7. 18..
 */

var Sequelize = require('sequelize');
var Q = require('q');

function DbModel(sequelize){

    this.models = {};

    this.models['user'] = sequelize.define('user', {
        facebookId: Sequelize.STRING,
        username: Sequelize.STRING
    });

    this.models['restroom'] = sequelize.define('restroom', {
        address1: Sequelize.STRING,
        address2: Sequelize.STRING,
        agency: Sequelize.STRING,
        contact: Sequelize.STRING,
        dataDate: Sequelize.STRING,
        division: Sequelize.STRING,
        lat: Sequelize.FLOAT,
        lng: Sequelize.FLOAT,
        name: Sequelize.STRING,
        open: Sequelize.STRING,
        unisex: Sequelize.STRING
    });

    this.models['comment'] = sequelize.define('comment', {
        comment: Sequelize.STRING,
        star: Sequelize.INTEGER,
        username: Sequelize.STRING
    }, {underscored: true});

    //Relation FK
    this.models['comment'].belongsTo(this.models['user']);
    this.models['comment'].belongsTo(this.models['restroom']);

    this.models['request'] = sequelize.define('request',{
        name: Sequelize.STRING,
        address: Sequelize.STRING,
        division: Sequelize.STRING,
        agency: Sequelize.STRING,
        contact: Sequelize.STRING,
        open: Sequelize.STRING,
        latlng: Sequelize.STRING
    },{underscored: true});

    //Relation FK
    this.models['request'].belongsTo(this.models['user']);
    return models;
}

module.exports = DbModel;

