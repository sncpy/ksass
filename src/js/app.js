var App = {
    version: "{{VERSION}}"
};

var app = angular.module('ksass', ['ngRoute', 'ngAria']);

//
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/partials/home-partial.html',
            controller: 'HomeCtrl'
        });

    if (window.history && window.history.pushState) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
}]);
