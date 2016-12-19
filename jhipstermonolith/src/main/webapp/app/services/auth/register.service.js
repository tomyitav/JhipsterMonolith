(function () {
    'use strict';

    angular
        .module('jhipstermonolithApp')
        .factory('Register', Register);

    Register.$inject = ['$resource'];

    function Register ($resource) {
        return $resource('api/register', {}, {});
    }
})();
