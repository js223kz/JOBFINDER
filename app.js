var app = angular.module("JobFinderApp", ["ui.router", "ngGeolocation"])

app.config(function($stateProvider){
    $stateProvider
    .state('start', {
        url:'',
        controller: 'StartController',
        templateUrl: 'partials/StartView.html'
    })
    .state('platsbanken', {
        url:'/platsbanken',
        controller: 'PlatsbankenController',
        templateUrl: 'partials/PlatsbankenView.html'
    })
    .state('jobdetails', {
        url:'/jobbdetaljer',
        controller: 'JobDetailsController',
        templateUrl: 'partials/DetailsView.html'
    })
});


    