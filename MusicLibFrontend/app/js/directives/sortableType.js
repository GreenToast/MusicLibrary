//add sortable-jquery with directive
musicLibraryApp.directive('sortableType', function() {
    return {
        restrict: 'A',
        link: function(scope, elm) {
            $(elm).sortable({
                revert: true
            });
        }
    };
})