musicLibraryApp.controller('OverviewTypeController',function ($scope,MusicService,$routeParams,capitalizeFirstLetter) {
    $scope.type = $routeParams.type;
    $scope.isArtist = ($scope.type === 'artist');
    $scope.isAlbum = ($scope.type === 'album');
    $scope.isTrack = ($scope.type === 'track');
    $scope.isPlaylist = ($scope.type === 'playlist');
    $scope.getCapitalizedType = function(){ return capitalizeFirstLetter($scope.type);};
    $scope.newtypeData = {};
    
    //exclude track from being able to dragdrop types
    if(!$scope.isTrack){
        $scope.listselected = [{properties:{name:'Dennis'}}];
        $scope.listlib = [];
        
        //define associated type, provisional
        var connType = '';
        if($scope.isArtist)
            connType = 'album';
        if($scope.isAlbum)
            connType = 'track';
        if($scope.isPlaylist)
            connType = 'track';
        MusicService.getAll(connType).then(function(listlib){
            $scope.listlib = listlib.data;
            },
            function(error){
                console.log('error',error);
            });
    }
    
    $scope.createAction = function(){
        console.log('listselected',$scope.listselected);
        
        //TODO: send listselected as relations with created type
       /* MusicService.create($scope.type, $scope.newtypeData).then(function(result){
            console.log('success');
        },
        function(error){
            console.log('error');
        });*/
    }
    
    $scope.cleanAction = function(){
        $scope.newtypeData = {properties:{}}
    }
    
    //load all types, TODO: filter by search result, reduce to 10, results
    MusicService.getAll($scope.type).then(function(res) {
        $scope.tabledata = res.data;
    },function(error){
        console.error('An error happened!',error);
    });
});