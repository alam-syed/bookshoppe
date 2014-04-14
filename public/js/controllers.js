'use strict';

function navbar($rootScope, $route)
{
    var vm = this;
    vm.isCurrent = isCurrent;
    vm.subHeader = false;

    vm.logout = function () {
        $.removeCookie('user', { path: '/' });
        window.location = "/Login";
    }

    activate();

    function activate() {
        console.log('navbar Activated');
    }

    $rootScope.$on('$routeChangeStart',
        function (event, next, current) {
            $('.st-loader').show();
            console.log('routeChangeStart');
        }
    );

    $rootScope.$on('$routeChangeSuccess', function () {
        vm.subHeader = $route.current.loadedTemplateUrl != 'views/home.html';
        $('.st-loader').hide();
        $("html, body").animate({ scrollTop: 0 }, 100);
        console.log('routeChangeSuccess');
    });

    function isCurrent(route) {
        return $route.current.loadedTemplateUrl === route ? 'active' : '';
    }
}

function subjects(datacontext)
{
    var vm = this;
    vm.Subjects = [];

    activate();

    function activate() {
        datacontext.subjects().then(function (data){
            vm.Subjects = data;
        });
        console.log('subjects Activated');
    }
}

function authors(datacontext)
{
    var vm = this;
    vm.Authors = []

    activate();

    function activate() {
        datacontext.authors().then(function (data){
            vm.Authors = data;
        });
        console.log('authors Activated');
    }
}

function booklist($routeParams, datacontext)
{
    var vm = this;
    vm.books = []
    vm.title = '';
    vm.noData = '';

    activate();

    function activate() {
        var id = $routeParams.id;
        var type = $routeParams.type;

        if(type=='author')
        {
            datacontext.authorBooks(id).then(function (data){
                vm.books = data;
                if(data.length > 0)
                {
                    vm.title = 'Author Books - ' + data[0].author.name;
                    vm.noData = '';
                }
                else
                {
                    vm.noData = 'There are no books available under this author';
                }
            });
        }
        else
        {
            datacontext.subjectBooks(id).then(function (data){
                vm.books = data;
                if(data.length > 0)
                {
                    vm.title = 'Subject Books - ' + data[0].subject.name;
                    vm.noData = '';
                }
                else
                {
                    vm.noData = 'There are no books available under this subject';
                }

            });
        }

        console.log('booklist Activated');
    }
}

function home($scope)
{

}

function about($scope)
{

}