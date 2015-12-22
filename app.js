var app = angular.module("JobFinderApp", ["ui.router"])

app.config(function($stateProvider){
    $stateProvider
    .state('login', {
        url:'/',
        controller:'LoginController',
        templateUrl:'views/login.html'
    });
})