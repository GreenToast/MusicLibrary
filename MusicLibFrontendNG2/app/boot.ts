require('reflect-metadata');
import 'zone.js/lib/browser/zone-microtask';
// in Production you may want to remove this
import 'zone.js/lib/browser/long-stack-trace-zone';
import {bootstrap}    from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {AppComponent} from './app.component';
import {HTTP_PROVIDERS} from 'angular2/http';
import {MusicService} from './services/music.service';
import 'jquery';
import 'jquery-ui';
import 'bootstrap';
import './../node_modules/bootstrap/dist/css/bootstrap';
import './../node_modules/bootstrap/dist/css/bootstrap-theme';
import './../css/app';
bootstrap(AppComponent, [ROUTER_PROVIDERS, HTTP_PROVIDERS, MusicService]);
