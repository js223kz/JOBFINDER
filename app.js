var app = angular.module("JobFinderApp", ["ui.router", "ngGeolocation"])

app.config(function($stateProvider){
    $stateProvider
    .state('start', {
        url:'',
        controller: 'StartController',
        templateUrl: 'partials/startview.html'
    })
    .state('settings', {
        url:'settings',
        controller:'SettingsController',
        templateUrl:'partials/settings.html'
    })
    .state('lists', {
        url: '/lists',
        controller: 'ListsController',
        templateUrl: 'views/lists.html'
    })   
});