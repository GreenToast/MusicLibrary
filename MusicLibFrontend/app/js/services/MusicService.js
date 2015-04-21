//TODO add complete REST-API
angular.module('MusicLibraryApp').factory('MusicService',function($http){
    
    var url ='http://localhost:4730/api/';
    return {
        
        getArtistWithAlbums: function(id){
            return $http.get(url+'artist/'+id+'?relation=album');
        },
        
        getAlbumWithTracks: function(id){
            return $http.get(url+'album/'+id+'?relation=track');
        },
        
        getPlaylistWithTracks: function(id){
            return $http.get(url+'playlist/'+id+'?relation=track');
        },
        
        getTrack: function(id){
            return $http.get(url+'track/'+id);
        },
        
        getAll: function(type){
            return $http.get(url+type);
        },
        
        create: function(type, data){
            return $http.post(url+type,data);
        }

    }
});