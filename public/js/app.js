'use strict';

var app = angular.module('app', ['ngAnimate','ngRoute','ngSanitize']);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                controller: 'home',
                templateUrl: 'views/home.html'
            }).
            when('/subjects', {
                controller: 'subjects',
                templateUrl: 'views/subjects.html'
            }).
            when('/authors', {
                controller: 'authors',
                templateUrl: 'views/authors.html'
            }).
            when('/about', {
                controller: 'about',
                templateUrl: 'views/about.html'
            }).
            when('/booklist/:id', {
                controller: 'booklist',
                templateUrl: 'views/booklist.html'
            });
        $routeProvider.otherwise({ redirectTo: '/' });
}]);

app.factory('datacontext', ['$http', '$q', datacontext]);

app.controller('home', ['$scope', home]);
app.controller('navbar', ['$rootScope', '$route', navbar]);
app.controller('subjects', ['datacontext', subjects]);
app.controller('authors', ['datacontext', authors]);
app.controller('about', ['$scope', about]);
app.controller('booklist', ['$routeParams', 'datacontext', booklist]);

app.directive('booksummary', [booksummary]);

app.run(['$route',  function ($route) {
    // Include $route to kick start the router.
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }

        if ($(this).scrollTop() > 5) {
            $('.ShadowBorder').fadeIn(100);
        } else {
            $('.ShadowBorder').fadeOut(100);
        }
    });

    $('.scrollup').click(function () {
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });
}]);