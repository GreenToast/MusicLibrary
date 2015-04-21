//add draggable-jquery with directive
angular.module('MusicLibraryApp').directive('sortedTypeItem', function() {
    return {
        restrict: 'A',
        scope:{
            sortedTypeItem: '='
        },
        templateUrl: 'templates/directives/sortedTypeItem.html',
        link: function(scope,elm) {
            scope.remove = function(){
                angular.element(elm).trigger('removeSortedItem', scope.sortedTypeItem);
            };
        }
    };
})