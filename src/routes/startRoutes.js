var express = require('express');

var startRouter = express.Router();


startRouter.route('/')
    .get(function (req, res) {
    var newUser = false;
    if(newUser === true){
        res.render('welcomeView');
    }else{
        res.render('settingsView');
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
         
 