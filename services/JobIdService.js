"use strict";

//sends specific jobid from PlatsbankenController
//to JobdDetailsController
app.factory('JobIdService',function($rootScope, $timeout){
var service = {};
  service.id = false;
  service.sendId = function(id){
      this.id = id;
      $rootScope.$broadcast('id_shared');
  };
  service.getId = function(){
    return this.id;
  };
  return service;
});
