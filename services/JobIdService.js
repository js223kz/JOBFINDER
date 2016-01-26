app.factory('JobIdService',function($rootScope, $timeout){
var service = {};
  service.id = false;
  service.sendId = function(id){
      this.id = id;
      $timeout(function(){
         $rootScope.$broadcast('id_shared');
      },100);
  };
  service.getId = function(){
    return this.id;
  };
  return service;
});