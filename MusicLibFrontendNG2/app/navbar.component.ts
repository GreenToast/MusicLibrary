import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'nav-bar',
  template:
  `
  <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
          <span class="sr-only">Toggle Navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" [routerLink]="['Dashboard']">
          <i class="fa fa-home"></i>
          <span>Dennis Music Library</span>
        </a>
      </div>

      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
              <li><a [routerLink]="['OverviewType',{ type:'artist'}]">Artists</a></li>
              <li><a [routerLink]="['OverviewType',{ type:'album'}]">Albums</a></li>
              <li><a [routerLink]="['OverviewType',{ type:'playlist'}]">Playlists</a></li>
              <li><a [routerLink]="['OverviewType',{ type:'track'}]">Tracks</a></li>
          </ul>

        <ul class="nav navbar-nav navbar-right">
          <li class="loader" if.bind="router.isNavigating">
            <i class="fa fa-spinner fa-spin fa-2x"></i>
          </li>
        </ul>
      </div>
    </nav>
  `,
  directives: [ROUTER_DIRECTIVES]

})
export class NavbarComponent { }