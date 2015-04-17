//add draggable-jquery with directive
musicLibraryApp.directive('draggableType', function() {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
            var params = {
                    helper: 'clone',
                    revert: 'invalid'
                };
            if(attrs.connecttosortable){
                params.connectToSortable = '#'+attrs.connecttosortable;
            }
            $(elm).draggable(params);
        }
    };
})