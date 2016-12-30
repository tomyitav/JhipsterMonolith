(function() {
    'use strict';

    angular
        .module('jhipstermonolithApp')
        .directive('searchAdd', searchAdd);

    searchAdd.$inject = ['$translate', '$locale', 'tmhDynamicLocale'];

    function searchAdd($translate, $locale, tmhDynamicLocale) {
        var directive = {
            restrict: 'E',
            scope: {
                title: '@',
                tooltip: '@',
                search: '='
            },
            templateUrl:"app/entities/search-add-template.html"
        };

        return directive;
    }
})();
