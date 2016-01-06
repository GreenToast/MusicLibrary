
import {Component, ElementRef} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {NavbarComponent} from './navbar.component';
import {OverviewTypeComponent} from './overview-type.component';
import {TypeComponent} from './type.component';
import {DashboardComponent} from './dashboard.component';


@Component({
	selector: 'app',
	template: `
	<nav-bar></nav-bar>
    <router-outlet></router-outlet>
  `,
	directives: [NavbarComponent,ROUTER_DIRECTIVES]
})
@RouteConfig([
	{ path: '/overview', name: 'Dashboard', component: DashboardComponent, useAsDefault: true },
	{ path:'/overview/:type', name: 'OverviewType', component: OverviewTypeComponent },
	{ path: '/:type/:id', name: 'Type', component: TypeComponent }
])
export class AppComponent { }