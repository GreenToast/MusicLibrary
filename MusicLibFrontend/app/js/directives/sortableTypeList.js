//add sortable-jquery with directive
angular.module('MusicLibraryApp').directive('sortableTypeList', function(ngAttr) {
    return {
        restrict: 'A',
        scope: {
            receiveToList: '=',
            deleteType: '&'
        },       
        templateUrl: 'templates/directives/sortableTypeList.html',
        link: function(scope, elm) {   
            var initialized = false;
            
            function moveType(from,to){
                scope.receiveToList.splice(to, 0, scope.receiveToList.splice(from, 1)[0]);
            }
            
            function addType(pos,id,name) {
                
                if (initialized) {
                    scope.receiveToList.splice(pos, 0,{_id:id,properties:{name:name}});
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
            var listElement = angular.element(angular.element(elm).children()[0]);
            listElement.sortable({
                revert: true,
            });
            
            listElement.disableSelection();
            
            //TODO: fix function
            listElement.on('removeSortedItem', function(item){
                var pos = i;
                for (var i = 0; i < scope.receiveToList.length; i++){
                    if(scope.receiveToList[i] === item){
                        pos = i;
                        break;
                    }
                }
                scope.receiveToList.splice (pos,1);
            });
            
            listElement.on( 'sortdeactivate', function( event, ui ) { 
                var from = angular.element(ui.item).scope().$index;
                var to = listElement.children().index(ui.item);
                if(to>=0){
                    scope.$apply(function(){
                        if(from>=0){
                           moveType(from,to); 
                        }else{
                            var id = parseInt(ui.item.context.attributes['draggable-type'].nodeValue);
                            var name = ui.item.context.innerText;
                            addType(to,id,name);
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