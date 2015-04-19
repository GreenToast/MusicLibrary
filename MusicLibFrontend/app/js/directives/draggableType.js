//add draggable-jquery with directive
musicLibraryApp.directive('draggableType', function() {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
            var params = {
                    helper: 'clone',
                    revert: 'invalid'
                };
            if(attrs.connectToSortable){
                params.connectToSortable = "[sortable-type-list='"+attrs.connectToSortable+"']";
            }
            angular.element(elm).draggable(params);
            elm.disableSelection();
        }
    };
})