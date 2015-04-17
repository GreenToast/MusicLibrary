'use strict';

//using modules Animate and Route
var musicLibraryApp = angular.module('MusicLibraryApp', ['ngRoute',]);

//Routing url to html-Page

musicLibraryApp.config(function ($routeProvider,$locationProvider) {
    //use locationProvider with != for SEO and Deeplinking support
    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix("!");
    $routeProvider
    .when('/overview',{templateUrl: '../templates/overview.html'})
    .when('/overview/:type',{templateUrl: '../templates/overviewType.html'})
    .when('/:type/:id',{templateUrl: '../templates/type.html'})
    .otherwise({redirectTo: '/overview'}); //Default
});