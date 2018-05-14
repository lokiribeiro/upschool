import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import { Userapps } from '../../../api/userapps';
import { Profiles } from '../../../api/profiles';
 
import template from './navbar.html';

class Navbar {

  constructor($scope, $reactive, $timeout, $mdSidenav, $log, $mdDialog, $state, $mdComponentRegistry, $rootScope, $stateParams) {
  //'ngInject';

    $reactive(this).attach($scope);
    this.stateHolder = $stateParams.stateHolder;
    this.userID = $stateParams.userID;
    console.info('state', $stateParams.stateHolder);


    this.sort = 1;

    this.subscribe('users');
    
    this.subscribe('userapps');
  
    this.subscribe('profiles2', () => [{},  
      this.getReactively('userID')
    ]);
  
    this.helpers({
      isLoggedIn() {
        return !!Meteor.userId();
      },
      currentUserId() {
        return Meteor.userId();
      },
      currentUser() {
        return Meteor.user();
      },
      profiles() {
        var profileID = $stateParams.userID;
        var selector = {userID : profileID};
        var profiles = Profiles.find(selector);
        console.info('profiles', profiles);
        var count = profiles.count();
        console.log(count);
        return profiles;
      },
      userappsMenu() {
        var userID = Meteor.userId();
        var sort  = this.sort;
        var selector = {userID: userID};
        var modifier = {sort: {appName: sort}};
        var userapps = Userapps.find(selector,modifier);
        console.info('userapps', userapps);
        return userapps;
      },
      totalApps() {
        return Counts.get('numberOfUserApps');
      }
    });

    this.logout = function() {
      //Accounts.logout();
      Accounts.logout();
      window.setTimeout(function(){
        $state.go('login');
      },2000);    
    }

    this.totalAppCount = function(){
      var userID = Meteor.userId();
      var query = {userID: userID};
      console.log(query);
      var listahan = Userapps.find().count();
      console.log(listahan);
      return Userapps.find(query).count();
    }

    this.redirect = function (appName) {
      $state.go(appName, { stateHolder : appName, userID : $stateParams.userID });
    }

    this.redirectProfile = function () {
      $state.go('Profile', {stateHolder : 'Dashboard', userID : $stateParams.userID});
    }

    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.isOpenLeft = function(){
      return $mdSidenav('left').isOpen();
    }

    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('left').close()
        .then(function () {
          //$log.debug("close LEFT is done");
        });
    }

    function totalAppCount() {
      var userID = $scope.userId;
      var query = {userID: userID};
      console.log(query);
      var listahan = Userapps.find().count();
      console.log(listahan);

      return Userapps.find(query).count();
    }

    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
      var timer;

      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            //$log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }

    function buildToggler(navID) {
      return function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            //$log.debug("toggle " + navID + " is done");
          });
      }
    }

    var originatorEv;

    this.menuHref = "http://www.google.com/design/spec/components/menus.html#menus-specs";

    this.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    this.announceClick = function(index) {
      $mdDialog.show(
        $mdDialog.alert()
          .title('You clicked!')
          .textContent('You clicked the menu item at index ' + index)
          .ok('Nice')
          .targetEvent(originatorEv)
      );
      originatorEv = null;
    };

    //This sets up a trigger event when the sidenav closes
   $scope.sideNavIsOpen = function() {
       return false;
   };

   $mdComponentRegistry.when('left').then(function(sideNav) {
       $scope.sideNavIsOpen = angular.bind(sideNav, sideNav.isOpen);
   });

   $scope.$watch('sideNavIsOpen()', function() {
       if(!$scope.sideNavIsOpen()) {
           $('body').removeClass('not-scrollable');
       }
       else {
           $('body').addClass('not-scrollable');
       }
   });

  }
  
}
 
const name = 'navbar';

//Navigation.$inject = ['$scope', '$reactive', '$stateParams', '$state'];
 
// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  controllerAs: name,
  controller: ['$scope', '$reactive', '$timeout', '$mdSidenav', '$log', '$mdDialog', '$state', '$mdComponentRegistry', '$rootScope', '$stateParams', Navbar]
});