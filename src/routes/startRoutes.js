var express = require('express');
var request = require('request');
fs = require('fs');

var startRouter = express.Router();


startRouter.route('/')
    .get(function (req, res) {
    var newUser = true;
    var url = 'http://api.arbetsformedlingen.se/af/v0/platsannonser/soklista/lan';
    var headers = { 
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Accept-Language': 'sv',
        'Accept': 'application/json',
        'From':'js223kz@student.lnu.se'
    };
    if(newUser === true){
        request({url:url, headers:headers}, function(error, response, body) {
            if(!error){
                fs.writeFile('./files/counties.txt', body, function (err) {
                  if (err){
                    console.log('couldn´t write to textfile');  
                  } 
                });
                res.render('settingsView');
             }else{
                 console.log(error);
             }
        });
    }
}); 

startRouter.route('/Settings')
    .get(function (req, res) {
    
    var request = require('request');
    res.render('settingsView');   
       
       
}); 

module.exports = startRouter;
         
