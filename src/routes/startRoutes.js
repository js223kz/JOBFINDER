var express = require('express');
var partials = require('express-partials');



var startRouter = express.Router();


startRouter.route('/')
    .get(function (req, res) {
    var newUser = true;
    if(newUser === true){
        res.render('index',{newUser: newUser});
    }else{
        //res.render('index.ejs',{layout:false});
    }
}); 

startRouter.route('/Settings')
    .get(function (req, res) {
    var newUser = true;
    if(newUser === true){
        res.render('index',{newUser: false, settings: true});
    }else{
        //res.render('index.ejs',{layout:false});
    }
}); 

module.exports = startRouter;
         
 