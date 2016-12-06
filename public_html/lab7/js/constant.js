//this function will call values that remain constant throughout the app, and can be reused.
//makes a request to the json file in data

(function () {
    
    'use strict';
    angular
            .module('app')
            .constant('REQUEST', {
                'Phones' : './data/phones.json'
    });
})();