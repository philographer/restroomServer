var app = require('../app');
var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile');
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/restroom', function(req, res) {
  app.dbService.loadRestroom(req.query).then(function(result){
    res.status(200).json(result);
  }).catch(function(error){
    res.status(500).json({error: error.message});
  });
});

router.get('/restroom/detail', function(req,res){
  app.dbService.detailRestroom(req.query).then(function(result){
    res.status(200).json(result);
  }).catch(function(error){
    res.status(500).json({error: error.message});
  });
});

router.post('/restroom', function(req, res) {
  app.dbService.createRestroom(req.body).then(function(result){
    res.status(200).json(result);
  }).catch(function(error){
    res.status(500).json({error: "error"});
  });
});

router.get('/restroom/count', function(req, res){
  app.dbService.count().then(function(result){
    res.status(200).json(result);
  }).catch(function(error){
    res.status(500).json(error.message);
  });
});

router.get('/restroom/count/star', function(req,res){
  app.dbService.countStar(req.query).then(function(result){
    res.status(200).json(result);
  }).catch(function(error){
    res.status(500).json(error.message);
  });
});

router.get('/restroom/brief', function(req, res){
  app.dbService.briefRestroom(req.query).then(function(result){
    res.status(200).json(result);
  }).catch(function(error){
    res.status(500).json(error.message);
  });
});

router.post('/restroom/comment', function(req, res){
  console.log(req.body);
  app.dbService.createComment(req.body['data']).then(function(result){
    console.log(result);
    res.status(200).json(result);
  }).catch(function(error){
    res.status(500).json(error.message);
  });
});

router.get('/restroom/comment', function(req, res){
  console.log(req.query);
  app.dbService.readComment(req.query).then(function(result){
    if(result.length == 0){
      res.status(200).json({msg: "Not Founded"});
    }else{
      res.status(200).json(result);
    }
  }).catch(function(error){
    res.status(500).json(error.message);
  });
});

router.post('/auth/facebook',function(req,res){
  console.log("진입");
  const client_id = '1749580705320334';
  const redirectUrl = 'http://localhost/';
  const secret = '1f6ef3bc5f6c7d4239c037a54a457fc3';
  const code = req.body.code;

  app.dbService.fbAuth(client_id,redirectUrl,secret,code).then(function(obj){
    console.log(redirectUrl);
    app.dbService.createUser(obj['facebookId'],obj['username']).then(function(id){
      res.status(200).json({
        access_token: obj['access_token'],
        username: obj['username'],
        facebookId: obj['facebookId'],
        id: parseInt(id)
      });
    }).catch(function(error){
      res.status(500).json({msg: "createUser Error"});
    });
  }).catch(function(error){
    res.status(500).json({msg: "fbAuth Error"});
  });

});

router.get('/test', function(req, res){
  var paramObj = {
    comment: "hello",
    star: 5,
    user_id: 1,
    restroom_id: 1
  };
  app.dbService.createComment(paramObj).then(function(result){
  }).then(function(error){
  });
});

/*
router.get('/test',function(req, res){
  var rFile = '../restroom.json';
  jsonfile.readFile(rFile, function(err, objs){
    jsonfile.spaces = 2;
    //console.log(objs);
    objs['results'].forEach(function(obj, index){
      app.dbService.createRestroom(obj);
    });
  });
});
*/

module.exports = router;
