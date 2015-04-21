angular.module('MusicLibraryApp').controller('TypeController',function ($scope,MusicService,$routeParams,capitalizeFirstLetter) {
    var id = $routeParams.id;
    $scope.type = $routeParams.type;
    $scope.isArtist = ($scope.type === 'artist');
    $scope.isAlbum = ($scope.type === 'album');
    $scope.isTrack = ($scope.type === 'track');
    $scope.isPlaylist = ($scope.type === 'playlist');
    $scope.getCapitalizedType = function(){ return capitalizeFirstLetter($scope.type);};
    
    if($scope.isArtist){
        MusicService.getArtistWithAlbums(id).then(function(res) {
            $scope.data = res.data;
        },function(error){
            console.error('An error happened!',error);
        });
    }
    
    if($scope.isAlbum){
        MusicService.getAlbumWithTracks(id).then(function(res) {
            $scope.data = res.data;
        },function(error){
            console.error('An error happened!',error);
        });
    }
    
    if($scope.isTrack){
        MusicService.getTrack(id).then(function(res) {
            $scope.data = res.data;
        },function(error){
            console.error('An error happened!',error);
        });
    }
});