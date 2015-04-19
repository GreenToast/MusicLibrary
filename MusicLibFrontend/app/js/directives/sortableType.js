//add sortable-jquery with directive
musicLibraryApp.directive('sortableType', function(ngAttr) {
    return {
        restrict: 'A',
        scope: {
            receiveToList: '=',
            receiveFromList: '=',
            deleteType: '&'
        },       
        templateUrl: 'templates/directives/sortableType.html',
        link: function(scope, elm) {   
            var initialized = false;
            
            function moveType(from,to){
                scope.receiveToList.splice(to, 0, scope.receiveToList.splice(from, 1)[0]);
            }
            
            function addType(pos,type) {
                if (initialized) {
                    scope.receiveToList.splice(pos, 0,type);
                }
            }
            
            function lookup(id){
                var el;
                scope.receiveFromList.forEach(function(lookupEl){
                    if (lookupEl._id === id){
                        el = lookupEl;
                        return;
                    }
                });
                return el;
            }
            
            //TODO: fix function
            scope.deleteType = function(id){
                for (var i = 0; i < scope.receiveToList.length; i++){
                    if(scope.receiveToList[i]._id === id){
                        scope.$apply(function(){
                            scope.receiveToList.splice (i,i);
                        });
                        break;
                    }
                }      
            }
            
            angular.element(elm).sortable({
                revert: true,
            });
            elm.disableSelection();
            
            elm.on( "sortdeactivate", function( event, ui ) { 
                var from = angular.element(ui.item).scope().$index;
                var to = elm.children().index(ui.item);
                if(to>=0){
                    scope.$apply(function(){
                        if(from>=0){
                           moveType(from,to); 
                        }else{
                            var id = parseInt(ui.item.context.attributes['draggable-type'].nodeValue);
                            var el = lookup(id);
                            if(el){
                                addType(to,el);
                            }
                            ui.item.remove();
                        }
                    });
                }
            });  
            
    
            
            function init() {
                if (!angular.isDefined(scope.receiveToList)) {
                    /*if (scope.tokenfield.tags.length > 0) {
                        // this call emits an 'afterCreateToken' event
                        // and this would imply a 'digest already in progress'
                        // without the initialized flag
                        elem.tokenfield('setTokens', scope.tokenfield.tags);
                    }
                }
                else {*/
                    scope.receiveToList = [];
                }

                initialized = true;
            }

            init();
            
            
        }
    };
})