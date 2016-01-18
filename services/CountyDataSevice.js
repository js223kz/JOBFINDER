"use strict";
app.service('CountyDataService', ['$http', '$geolocation', '$window', '$q', function($http, $geolocation, $window, $q){

    function supported() {
        return 'geolocation' in $window.navigator;
    }
 
    //returns chached position data
    this.getCachedPosition = function(){
        return $q(function(resolve, reject){
            var position = JSON.parse(sessionStorage.getItem('userPosition'));
            console.log(position);
            if(position != undefined){
                resolve(position);
            }else{
                reject("Kan inte hämta cachad position");
            }
        });
    }
       
    //returns device current position
    function getUserPosition(){
        return $q(function(resolve, reject){
            if(supported()){
               var geolocation = $geolocation;
                geolocation.getCurrentPosition().then(function(location) {
                    var position = {
                        lat: location.coords.latitude,
                        lng: location.coords.longitude
                    }
                    if(!location.coords.error){
                        resolve(position);
                    }else{
                        reject("Vi kan inte hämta din position för tillfället.");
                    }
                });        
            }else{
               reject("Din browser stödjer inte geolocation"); 
            }               
        });
    }
    
    
            
    //get position information from google maps
    function getCountyName(position){
        var baseUrl = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=';
        return $q(function(resolve, reject){
            $http.get(baseUrl + position.lat + ',' + position.lng)
            //$http.get(baseUrl + '55.424908' + ',' +'12.975830')
            .success(function(response){
                resolve(response);
            }).error(function(error){
                reject("Vi kan för tillfället inte hämta information om din position. Försök igen!");
            });    

        });
    }

    //retrieve county name and city name from json returned by Google maps    
    function getCountyCode(json){
        return $q(function(resolve, reject){
            var position = {
                city: undefined,
                county: undefined
            }
            //getting name of county (always on the same position in json response)
            var countyPosition = json["results"].length -2;
            var county = json["results"][countyPosition].formatted_address;
            position.county = county.split(',')[0];

            //getting name of city (always on the same position in json response)
            var cityPosition = json["results"].length -4;
            var city = json["results"][cityPosition].formatted_address;
            position.city = city.split(',')[0];

            if(position.city != undefined || position.county != undefined){
                resolve(position);
            }else{
                reject("Vi kan för tillfället inte hämta information om din position. Försök igen!")
            }
        }); 
    }
    
    //get county id from static json file with counties and id:s
    function getCountyId(county){
        return $q(function(resolve, reject){
            $http.get("/files/counties.json").then(function(response){
                for(var i = 0; i < response.data.length; i++){
                   if(response.data[i].namn === county){
                       resolve(response.data[i].id);
                   }
                }             
            }, function(error){
                reject("Vi kan för tillfället inte avgöra vilket län du befinner dig och därför inte hämta information från Platsbanken.");
            });
        });
    }   

   
    
    this.updateUserPosition = function(){
        return $q(function(resolve, reject){
            var userPosition = {
            lat: undefined,
            lng: undefined,
            city: undefined,
            county: undefined,
            id: undefined
            }
             
           getUserPosition().then(function(position){
               if(angular.isNumber(position.lat) && angular.isNumber(position.lng)){
                userPosition.lat = position.lat;
                userPosition.lng = position.lng;

               getCountyName(position).then(function(json){
                    getCountyCode(json).then(function(positionData){
                        userPosition.city = positionData.city;
                        userPosition.county = positionData.county;

                        getCountyId(positionData.county).then(function(countyId){
                            userPosition.id = countyId;
                                console.log(userPosition);
                            if(sessionStorage.getItem("userPosition") != undefined){
                                sessionStorage.removeItem("userPosition");
                            }
                            sessionStorage.setItem("userPosition", JSON.stringify(userPosition));
                            resolve(JSON.parse(sessionStorage.getItem('userPosition')));
                        }, function(reason){
                            reject(reason);
                        });

                    }, function(reason){
                        reject(reason);
                    });
                }, function(reason){
                    reject(reject);
                });
             }else{
                 reject("Positionen har angivits i ett felaktigt format. Processen avbryts.");
             }
            }, function(reason){
                reject(reason);
            });
                       
        });
    }
}]);
