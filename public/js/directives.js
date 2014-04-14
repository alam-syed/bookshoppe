'use strict';

function booksummary()
{
    return {
        restrict: 'E',
        replace: true,
        scope: {
            book: '=item'
        },
        templateUrl: 'views/booksummary.html',
        controller: function($scope)
        {
            $scope.addCart = function(id){
                alert('Added to Cart: ' + id);
            };

            $scope.addWishList = function(id){
                alert('Added to WishList: ' + id);
            };

        }
    };
}
