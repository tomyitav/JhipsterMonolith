(function() {
    'use strict';

    angular
        .module('jhipstermonolithApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'Principal', 'LoginService', '$state'];

    function HomeController ($scope, Principal, LoginService, $state) {
        var vm = this;

        vm.account = null;
        vm.isAuthenticated = null;
        vm.profilePicLocation= 'app/account/social/question-mark2.png';
        vm.login = LoginService.open;
        vm.register = register;
        $scope.$on('authenticationSuccess', function() {
            getAccount();
        });

        getAccount();

        function getAccount() {
            Principal.identity().then(function(account) {
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated;
                if(account != null) {
                    vm.profilePicLocation = '/social/profilepic';
                }
            });
        }
        function register () {
            $state.go('register');
        }
    }
})();
