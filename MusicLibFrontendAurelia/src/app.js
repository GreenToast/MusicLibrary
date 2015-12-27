export class App {
  configureRouter(config, router) {
    config.title = 'Dennis Music Library';
    config.map([
    	{ route: '',  name: 'overview-router', moduleId: 'overview', nav: true, 	title: 'Overview', href:'#'  },
    	{ route: 'artist', name: 'artist', 		   moduleId: 'type-router', 			nav: true, title: 'Artist', href:'#/artist' },
    	{ route: 'album', name: 'album', 		   moduleId: 'type-router', 			nav: true, title: 'Album', href:'#/album'  },
    	{ route: 'playlist', name: 'playlist',	   moduleId: 'type-router', 			nav: true, title: 'Playlist', href:'#/playlist'  },
    	{ route: 'track', name: 'track', 		   moduleId: 'type-router', 			nav: true, title: 'Track', href:'#/track'  },
    	{ route: 'overview', redirect: '' }
    ]);

    this.router = router;
  }
}

