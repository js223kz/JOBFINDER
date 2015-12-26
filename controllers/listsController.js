app.controller('ListsController', function($scope, $state){
    if(localStorage['username'] === undefined){
        $state.go('login');
    }
    
});