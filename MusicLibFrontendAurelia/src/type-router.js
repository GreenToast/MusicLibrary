/*export class ChildRouter {
  heading = 'Child Router';

  configureRouter(config, router) {
    config.map([
      { route: ['', 'welcome'], name: 'welcome',       moduleId: 'welcome',       nav: true, title: 'Welcome' },
      { route: 'users',         name: 'users',         moduleId: 'users',         nav: true, title: 'Github Users' },
      { route: 'child-router',  name: 'child-router',  moduleId: 'child-router',  nav: true, title: 'Child Router' }
    ]);

    this.router = router;
  }
}*/


export class TypeRouter {
  //heading = 'MusicLibrary';

  /*.when('/overview',{templateUrl: '../templates/overview.html'})
    .when('/overview/:type',{templateUrl: '../templates/overviewType.html'})
    .when('/:type/:id',{templateUrl: '../templates/type.html'})
    .otherwise({redirectTo: '/overview'}); //Default

    <li><a href="/#!/overview/artist">Artists</a></li>
            <li><a href="/#!/overview/album">Albums</a></li>
            <li><a href="/#!/overview/track">Tracks</a></li>
            <li><a href="/#!/overview/playlist">Playlists</a></li>

            */
	configureRouter(config, router) {            
	    config.map([
	    	{ route: '', 	name: 'overview-type', 		moduleId: 'overview-type',nav: false},
	    	{ route: ':id', 	name: 'type', 		moduleId: 'type',nav: false}
	    ]);

    this.router = router;
  }
}
