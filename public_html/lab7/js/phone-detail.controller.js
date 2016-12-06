// sets controller of the app, injects with route parameters, and function within phones.service
// in this case parameter is the phoneID. this allows a specific phone to be clicked on
// so that more detailed information on the phone can be rendered

(function () {
    
    'use strict'
    angular
            .module('app')
            .controller('PhoneDetailController', PhoneDetailController);
    
    PhoneDetailController.$inject = ['$routeParams', 'PhonesService'];
    
    function PhoneDetailController($routeParams, PhonesService) {
        var vm = this;
        
        vm.phone = {};
        var id = $routeParams.phoneId;
        
        activate();
        
        function activate(){}
            PhonesService.findPhone(id).then(function(response){
                vm.phone = response;
            });
    }
}) ();