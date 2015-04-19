'use strict';

//using modules Animate and Route
var musicLibraryApp = angular.module('MusicLibraryApp', ['ngRoute','ngAnimate']);

//Routing url to html-Page

musicLibraryApp.config(function ($routeProvider,$locationProvider) {
    
    /*angular.element.prototype.ngattr = function(name, value) {
        var element = angular.element(this).get(0);

        return element.getAttribute(name) || element.getAttribute('data-' + name);
    };*/
    //use locationProvider with != for SEO and Deeplinking support
    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix("!");
    $routeProvider
    .when('/overview',{templateUrl: '../templates/overview.html'})
    .when('/overview/:type',{templateUrl: '../templates/overviewType.html'})
    .when('/:type/:id',{templateUrl: '../templates/type.html'})
    .otherwise({redirectTo: '/overview'}); //Default
});