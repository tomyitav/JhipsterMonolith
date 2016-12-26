(function() {
    'use strict';

    angular
        .module('jhipstermonolithApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('train', {
            parent: 'entity',
            url: '/train',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'jhipstermonolithApp.train.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/train/trains.html',
                    controller: 'TrainController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('train');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('train-detail', {
            parent: 'entity',
            url: '/train/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'jhipstermonolithApp.train.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/train/train-detail.html',
                    controller: 'TrainDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('train');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Train', function($stateParams, Train) {
                    return Train.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'train',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('train-detail.edit', {
            parent: 'train-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/train/train-dialog.html',
                    controller: 'TrainDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Train', function(Train) {
                            return Train.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('train.new', {
            parent: 'train',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/train/train-dialog.html',
                    controller: 'TrainDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                speed: null,
                                diesel: null,
                                userid: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('train', null, { reload: 'train' });
                }, function() {
                    $state.go('train');
                });
            }]
        })
        .state('train.edit', {
            parent: 'train',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/train/train-dialog.html',
                    controller: 'TrainDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Train', function(Train) {
                            return Train.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('train', null, { reload: 'train' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('train.delete', {
            parent: 'train',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/train/train-delete-dialog.html',
                    controller: 'TrainDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Train', function(Train) {
                            return Train.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('train', null, { reload: 'train' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
