var app = angular.module("JobFinderApp", ["ui.router", "ngGeolocation"]);

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


})

app.run(function($window, $rootScope) {
    $rootScope.online = navigator.onLine;
    $window.addEventListener("offline", function () {
        $rootScope.$apply(function() {
            $rootScope.online = false;
        });
    }, false);
    $window.addEventListener("online", function () {
        $rootScope.$apply(function() {
            $rootScope.online = true;
        });
    }, false);
});

