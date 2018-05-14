import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import { Navigations } from '../../../api/navigations';
 
import template from './navigation.html';

class Navigation {

  constructor($scope, $reactive, $stateParams, $state, $rootScope, $timeout, $mdSidenav, $log, $mdDialog, $mdComponentRegistry, themeProvider, $mdTheming) {
  //'ngInject';

    $reactive(this).attach($scope);
    $scope.stateHolder = $stateParams.stateHolder;
    console.info('state', $scope.stateHolder);

    $scope.sort = 1;

    this.subscribe('users');
  
    this.subscribe('navigations', () => [{},  
      $scope.getReactively('stateHolder')
    ]);
  
    this.helpers({
      isLoggedIn() {
        return !!Meteor.userId();
      },
      currentUserId() {
        return Meteor.userId();
      },
      navigations(){
        var sort = $scope.sort;
        var statehold = $scope.getReactively('stateHolder');
        var selector = {appMenu: statehold};
        var navigations =  Navigations.find();
        console.log(navigations);
        themeProvider.setDefaultTheme(statehold);
        console.log('theme: ' + statehold);
        return navigations;
      }
    });

    this.logout = function() {
      //Accounts.logout();
      Accounts.logout();
      window.setTimeout(function(){
        $state.go('login', {}, {reload: 'login'});
      },2000);
      
      //var _logout = Meteor.logout;
      //    console.log('user loggin out');
      //    _logout.apply(Meteor, arguments);
      //    $state.go('login', {}, {reload: 'login'});
          
      
    }
    this.gotoDashboard = function() {
      $state.go('dashboard', {}, {reload: 'dashboard'});
    }
    this.gotoInventory = function() {
      $state.go('inventory', {}, {reload: 'inventory'});
    }
    this.gotoLogbook = function() {
      $state.go('logbook', {}, {reload: 'logbook'});
    }
    this.gotoEmployees = function() {
      $state.go('employees', {}, {reload: 'employees'});
    }
    this.gotoSettings = function() {
      $state.go('settings', {}, {reload: 'settings'});
    }

    this.totalAppCount = function(){
      var userID = Meteor.userId();
      var query = {userID: userID};
      console.log(query);
      var listahan = Userapps.find().count();
      console.log(listahan);

      return Userapps.find(query).count();
    }

    }
  
}
 
const name = 'navigation';

//Navigation.$inject = ['$scope', '$reactive', '$stateParams', '$state'];
 
// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  controllerAs: name,
  controller: ['$scope', '$reactive', '$stateParams', '$state', '$rootScope', '$timeout', '$mdSidenav', '$log', '$mdDialog', '$mdComponentRegistry', 'themeProvider', '$mdTheming', Navigation]
});