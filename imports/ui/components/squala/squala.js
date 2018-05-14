import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import ngAnimate from 'angular-animate';
import ngMessages from 'angular-messages';
import ngFileUpload from 'ng-file-upload';
import vcRecaptcha from 'angular-recaptcha';
import mdExpansionPanel from 'angular-material-expansion-panel';
//import 'angularjs-datepicker';

//import '../../../startup/accounts-config.js';
import '../../../startup/datepicker.js';
 
import template from './squala.html';
import Navigation from '../navigation/navigation';
import Dashboard from '../dashboard/dashboard';
import Login from '../login/login';
import Getstarted from '../getstarted/getstarted';
import Setuplogin from '../setuplogin/setuplogin';
import Setup from '../setup/setup';
import Headmaster from '../headmaster/headmaster';
import Navbar from '../navbar/navbar';
import Parentschool from '../parentschool/parentschool';
import Headmastercreateschool from '../headmastercreateschool/headmastercreateschool';


 
class Squala {}
 
const name = 'squala';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  ngMaterial,
  ngMessages,
  ngAnimate,
  uiRouter,
  Navigation.name,
  Dashboard.name,
  Login.name,
  Getstarted.name,
  Setuplogin.name,
  Setup.name,
  Headmaster.name,
  Navbar.name,
  Parentschool.name,
  Headmastercreateschool.name,
  'accounts.ui',
  'date-picker',
  ngFileUpload,
  vcRecaptcha,
  'material.components.expansionPanels'
//  '720kb.datepicker'
]).component(name, {
  template,
  controllerAs: name,
  controller: Squala
})
.config(['$locationProvider', '$urlRouterProvider', '$qProvider', '$stateProvider', '$mdThemingProvider', '$provide',
function config($locationProvider, $urlRouterProvider, $qProvider, $stateProvider, $mdThemingProvider, $provide) {
  //'ngInject';
  
  $locationProvider.html5Mode(true);
  
  $urlRouterProvider.otherwise('/not-found');
  
  $qProvider.errorOnUnhandledRejections(false);

  $mdThemingProvider.definePalette('squalaPalette', {
    '50': 'E3F2FD',
  '100': 'BBDEFB',
  '200': '90CAF9',
  '300': '64B5F6',
  '400': '42A5F5',
  '500': '2196F3',
  '600': '1E88E5',
  '700': '1976D2',
  '800': '1565C0',
  '900': '0D47A1',
  'A100': '82B1FF',
  'A200': '448AFF',
  'A400': '2979FF',
  'A700': '2962FF',
  'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                      // on this palette should be dark or light

  'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
   '200', '300', '400', 'A100'],
  'contrastLightColors': undefined    // could also specify this if default was 'dark'
  });

  //disable theme generation
  //$mdThemingProvider.generateThemesOnDemand(true);

  $mdThemingProvider.theme('default')
  .primaryPalette('squalaPalette')
  .accentPalette('light-blue');

  $mdThemingProvider.theme('Headmaster')
  .primaryPalette('indigo')
  .accentPalette('blue');

  $mdThemingProvider.theme('Admissions')
  .primaryPalette('amber')
  .accentPalette('orange');

  $mdThemingProvider.theme('Assessment')
  .primaryPalette('light-green')
  .accentPalette('lime');

  $mdThemingProvider.theme('Classroom')
  .primaryPalette('light-blue')
  .accentPalette('indigo');

  $mdThemingProvider.theme('Collect')
  .primaryPalette('red')
  .accentPalette('pink');

  $mdThemingProvider.theme('Rapido')
  .primaryPalette('orange')
  .accentPalette('amber');

  $mdThemingProvider.theme('Scheduler')
  .primaryPalette('yellow')
  .accentPalette('orange');

  $mdThemingProvider.theme('Dashboard')
  .primaryPalette('squalaPalette')
  .accentPalette('deep-purple');

  $mdThemingProvider.alwaysWatchTheme(true);

  $provide.value('themeProvider', $mdThemingProvider);
  
  }
])
.run(['$rootScope', '$state', '$stateParams',
function run($rootScope, $state, $stateParams) {
  //'ngInject';
  console.log('daan ditolabas');
  console.info('rootscope', $rootScope);
  console.info('rootscopeobn', $rootScope.$on.$stateChangeError);

  $state.defaultErrorHandler(function(error) {

    console.info('pasok', error);
    console.info('pasok', error.detail);
    // This is a naive example of how to silence the default error handler.
    if(error.detail == 'AUTH_REQUIRED'){
      $state.go('login', {});
    }
    if(error.detail == 'LOGGED_IN'){
      $state.go('Dashboard', {stateHolder : 'Dashboard'});
    }
  });
}
]);


 
