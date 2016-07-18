/**
 * Created by yuhogyun on 2016. 7. 18..
 */

var Sequelize = require('sequelize');
const DbModel = require('./dbModel');

function DbService (configObj) {

    this.configObj = configObj;

    this.sequelize = new Sequelize(configObj['dbName'] ,configObj['dbUsername'], configObj['dbPassword'],{
        host: 'localhost',
        dialect: 'postgresql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    });

    this.model = DbModel(this.sequelize);

}

DbService.prototype.createTest = function () {
    //this.model['user'].create({ username: 'fnord', job: 'omnomnom' });

    var newVerificationCode = this.model['user'].build({
        username: "hogy",
        birthday: Date()
    });
    newVerificationCode.save().then(function(result){

    }).catch(function(error){

    });

};

DbService.prototype.sync = function (){
    this.sequelize.sync();

};

module.exports = DbService;
