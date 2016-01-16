var app = angular.module("JobFinderApp", ["ui.router", "ngGeolocation"])

app.config(function($stateProvider){
    $stateProvider
    .state('start', {
        url:'',
        controller: 'StartController',
        templateUrl: 'partials/startview.html'
    })
});