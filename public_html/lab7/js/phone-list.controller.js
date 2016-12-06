// sets controller, injects with function within phones.service. creates an array of phones 
// after making a request to the json data, then renders the phones on the page.

(function () {
    
    'use strict';
    angular
            .module('app')
            .controller('PhoneListController', PhoneListController);
    
    PhoneListController.$inject = ['PhonesService'];
    
    function PhoneListController(PhonesService) {
        var vm = this;
        vm.phones = [];
        
        activate();
        
        function activate() {}
            PhonesService.getPhones().then(function(response){
                vm.phones = response;
            });
    }
}) ();