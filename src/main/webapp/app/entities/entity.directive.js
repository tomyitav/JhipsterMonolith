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
                title: '@'
            },
            template : '<div class="pull-right"><input type="search" ng-model="vm.searchQuery" id="searchQuery" placeholder="search"><button class="btn btn-primary btn-sm btn-raised" ui-sref={{title}} uib-tooltip="Create new car"><span class="glyphicon glyphicon-plus"></span></button></div>'
        };

        return directive;
    }
})();
