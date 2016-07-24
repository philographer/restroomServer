/**
 * Created by yuhogyun on 2016. 7. 18..
 */

var Sequelize = require('sequelize');
var Q = require('q');
var request = require('request');

const DbModel = require('./dbModel');

function DbService (configObj) {
    this.dbName = configObj['dbName'];
    this.dbUsername = configObj['dbUsername'];
    this.dbPassword = configObj['dbPassword'];

    this.sequelize = new Sequelize(this.dbName ,this.dbUsername, this.dbPassword = configObj['dbPassword'],{
        host: 'restroomdb.ctabe3wb6pkc.ap-northeast-2.rds.amazonaws.com',
        dialect: 'postgresql',
        port: 5432,
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    });
    this.model = DbModel(this.sequelize);
};

module.exports = DbService;

DbService.prototype.getSequelize = function () {
    return this.sequelize;
};

DbService.prototype.createUser = function(facecbookId, username){
    var deferred = Q.defer();
    this.model['user'].findOrCreate({
        where: {
            facebookId: facecbookId,
            username: username
        }
    }).then(function(result){
        deferred.resolve(result[0]['dataValues']['id']);
    }).catch(function(error){
        deferred.reject(error);
    });

    return deferred.promise;
};

DbService.prototype.createComment = function(paramObj){
    var deferred = Q.defer();
    var newComment = this.model['comment'].build({
        comment: paramObj['comment'],
        star: paramObj['star'],
        user_id: paramObj['user_id'],
        restroom_id: paramObj['restroom_id'],
        username: paramObj['username']
    });
    newComment.save().then(function(comment){
        deferred.resolve(comment);
    }).catch(function(error){
        deferred.reject(new Error(error));
    });

    return deferred.promise;
};

DbService.prototype.readComment = function(query){
    var deferred = Q.defer();
    this.model['comment']
        .findAll({
            where: {
                restroom_id: parseInt(query.restroom_id)
            }
        }).then(function(comments){
        deferred.resolve(comments);
    }).catch(function(error){
        deferred.reject(new Error(error));
    });
    return deferred.promise;
};

DbService.prototype.countStar = function(query){
    var deferred = Q.defer();
    this.model['comment']
        .findAndCountAll({
            where: {
                restroom_id: parseInt(query.restroom_id)
            }
        }).then(function(comments){
        deferred.resolve(comments);
    }).catch(function(error){
        deferred.reject(new Error(error));
    });
    return deferred.promise;
};

DbService.prototype.count = function(){
    var deferred = Q.defer();
    /*
    this.sequelize.
    query('SELECT count(*) totalComment,(SELECT sum(star) FROM comments) totalStar,(select count(*) FROM restrooms) totalRestroom FROM comments').spread(function(result, metadata){
        console.log(result);
    });
    */

    this.sequelize
        .query('SELECT count(*) totalComment,(SELECT sum(star) FROM comments) totalStar,(select count(*) FROM restrooms) totalRestroom FROM comments', { type: this.sequelize.QueryTypes.SELECT}).then(function(result){
        var result = result[0];
        if(parseInt(result['totalcomment']) == 0){
            result['totalstar'] = 0;
        }
        var retObj = {
            message: "success",
            totalComment: parseInt(result['totalcomment']),
            totalStar: parseInt(result['totalstar']),
            totalRestroom: parseInt(result['totalrestroom'])};
        deferred.resolve(retObj);
    }).catch(function(error){
        deferred.reject(new Error(error));
    });

    return deferred.promise;
};

DbService.prototype.loadRestroom = function(query){
    const limit = 0.2;
    var deferred = Q.defer();
    this.model['restroom']
        .findAll({
            where: {
                lat: {
                    $between: [parseFloat(query.minLat) - limit, parseFloat(query.maxLat) + limit]
                },
                lng: {
                    $between: [parseFloat(query.minLng) - limit, parseFloat(query.maxLng) + limit]
                }
            },
            limit: 10000
        }).then(function (restrooms){
            return deferred.resolve(restrooms);
        }).catch(function(error){
            return deferred.reject(new Error(error));
    });
    return deferred.promise;
};

DbService.prototype.briefRestroom = function(query){
    var deferred = Q.defer();
    this.sequelize
        .query('SELECT AVG(comments.star) star_avg, comment recent_comment FROM comments WHERE comments.restroom_id = '+ query.restroom_id +' GROUP BY id ORDER BY created_at DESC LIMIT 1', { type: this.sequelize.QueryTypes.SELECT}).then(function(result){

        var retObj = {};

        if (result.length == 0){
            retObj = {
                message: "success",
                star_avg: 0,
                recent_comment: "리뷰가 존재하지 않습니다."
            };
        }else{
            var result = result[0];
            retObj = {
            message: "success",
            star_avg: result['star_avg'],
            recent_comment: result['recent_comment']
            };
        }
        deferred.resolve(retObj);
    }).catch(function(error){
        console.log(error.message);
        deferred.reject(new Error(error));
    });
    return deferred.promise;
};

DbService.prototype.detailRestroom = function(query){
    var deferred = Q.defer();
    this.model['restroom']
        .findAll({
            where: {
                id: query.restroom_id
            },
        }).then(function (restrooms){
        return deferred.resolve(restrooms);
    }).catch(function(error){
        return deferred.reject(new Error(error));
    });
    return deferred.promise;
};


DbService.prototype.createTest = function () {
    var newVerificationCode = this.model['user'].build({
        username: "hogy",
        birthday: Date()
    });
    newVerificationCode.save().then(function(result){

    }).catch(function(error){

    });

};

DbService.prototype.requestRestroom = function(object) {
    var deferred = Q.defer();
    var newRequest = this.model['request'].build({
        name: object['name'],
        contact: object['contact'],
         address: object['address'],
        agency: object['agency'],
        open: object['open'],
         division: object['division'], 
        latlng: object['latlng'],
        user_id: object['user_id']
    });

    newRequest.save().then(function (result) {
        deferred.resolve(result);
    }).catch(function (error) {
        deferred.reject(new Error(error));
    });

    return deferred.promise;
};


DbService.prototype.createRestroom = function(object) {
    var deferred = Q.defer();
    var newRestroom = this.model['restroom'].build({
        address1: object['address1'],
        address2: object['address2'],
        agency: object['agency'],
         contact: object['contact'],
         dataDate: object['dataDate'],
         division: object['division'],
         lat: object['lat'],
         lng: object['lng'],
         name: object['name'],
        open: object['open'],
        unisex: object['unisex']
    });

    newRestroom.save().then(function(result){
        deferred.resolve(result);
    }).catch(function(error){
        deferred.reject(new Error(error));
    });

    return deferred.promise;
};

DbService.prototype.fbAuth = function(client_id,redirectUrl,secret,code){
    var deferred = Q.defer();
    request('https://graph.facebook.com/v2.3/oauth/access_token?client_id='+client_id+'&redirect_uri='+redirectUrl+'&client_secret='+secret+'&code='+code, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var authBody = JSON.parse(body);
            request('https://graph.facebook.com/v2.5/me?access_token='+authBody['access_token'], function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var infoBody = JSON.parse(body);
                    var retObj = {};
                    retObj['username'] = infoBody['name'];
                    retObj['facebookId'] = infoBody['id'];
                    retObj['access_token'] = authBody['access_token'];
                    deferred.resolve(retObj);
                }
                else{
                    deferred.reject({msg: "get info something wrong!"});
                }
            });
        }
        else{
            deferred.reject({msg: "something wrong!"});
        }
    });
    return deferred.promise;

};

DbService.prototype.sync = function (){
    this.sequelize.sync();
};

