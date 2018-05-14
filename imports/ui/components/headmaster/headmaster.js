import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import { Meteor } from 'meteor/meteor';

import { Counts } from 'meteor/tmeasday:publish-counts';

import { Branches } from '../../../api/branches';

import template from './headmaster.html';
 
class Headmaster {
  constructor($scope, $reactive, $state, $stateParams, themeProvider, $mdTheming, $rootScope, $timeout, $mdDialog) {
    //'ngInject';
 
    $reactive(this).attach($scope);

    console.info('rootscope', $rootScope.stateHolder);

    this.userID = $stateParams.userID;
    this.state = $stateParams.stateHolder;
    themeProvider.setDefaultTheme(this.state);

    this.hidden = false;
    this.isOpen = false;
    this.hover = false;

    this.items = [
      { name: "Add school", icon: "../../assets/img/white_schooladd24.svg", direction: "left" },
      { name: "Add user roles", icon: "../../assets/img/white_roleadd24.svg", direction: "left" },
      { name: "Add responsibilities", icon: "../../assets/img/white_respadd24.svg", direction: "left" }
    ];

    this.subscribe('users');
 
    this.helpers({
      isLoggedIn() {
        return !!Meteor.userId();
      },
      currentUserId() {
        return Meteor.userId();
      },
      currentUser() {
        return Meteor.user();
      }
    });

    // On opening, add a delayed property which shows tooltips after the speed dial has opened
    // so that they have the proper position; if closing, immediately hide the tooltips
    $scope.$watch('demo.isOpen', function(isOpen) {
      if (isOpen) {
        $timeout(function() {
          $scope.tooltipVisible = $scope.isOpen;
        }, 600);
      } else {
        $scope.tooltipVisible = $scope.isOpen;
      }
    });

    this.openDialog = function($event, item) {
      // Show the dialog
      if(item.name == 'Add school'){
      $mdDialog.show({
        clickOutsideToClose: false,
        escapeToClose: true,
        controller: function($mdDialog) {
          // Save the clicked item
          $scope.FABitem = item;
          // Setup some handlers
          $scope.close = function() {
            $mdDialog.cancel();
          };
        },
        controllerAs: 'headmastercreateschool',
        controller: ['$scope', '$reactive', '$state', '$stateParams', 'themeProvider', '$mdTheming', '$rootScope', '$timeout', '$mdDialog', Headmaster],
        template: '<headmastercreateschool></headmastercreateschool>',
        targetEvent: $event
      });
    } else if(item.name == 'Add responsibilities'){
      $mdDialog.show({
        clickOutsideToClose: false,
        escapeToClose: true,
        controller: function($mdDialog) {
          // Save the clicked item
          $scope.FABitem = item;
          // Setup some handlers
          $scope.close = function() {
            $mdDialog.cancel();
          };
        },
        controllerAs: 'headmastercreateresp',
        controller: Headmaster,
        template: '<headmastercreateresp></headmastercreateresp>',
        targetEvent: $event
      });
    } else if(item.name == 'Add user roles'){
      $mdDialog.show({
        clickOutsideToClose: false,
        escapeToClose: true,
        controller: function($mdDialog) {
          // Save the clicked item
          $scope.FABitem = item;
          // Setup some handlers
          $scope.close = function() {
            $mdDialog.cancel();
          };
        },
        controllerAs: 'headmastercreaterole',
        controller: Headmaster,
        template: '<headmastercreaterole></headmastercreaterole>',
        targetEvent: $event
      });
    }
  }

    

    this.openSchool = function (selected) {
      console.info('selected:', selected[0]._id);
      var branchID = selected[0]._id;
      $state.go('Headmasterschool', {stateHolder : 'Headmaster', userID : Meteor.userId(), branchID : branchID});
    }

    this.openRole = function () {
      $state.go('Headmasterrole', {stateHolder : 'Headmaster', userID : Meteor.userId()});
    }

    this.openResp = function () {
      $state.go('Headmasterresp', {stateHolder : 'Headmaster', userID : Meteor.userId()});
    }
  }
  
}
 
const name = 'headmaster';

//Login.$inject = ['$scope', '$reactive', '$state'];
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  utilsPagination
]).component(name, {
  template,
  controllerAs: name,
  controller: ['$scope', '$reactive', '$state', '$stateParams', 'themeProvider', '$mdTheming', '$rootScope', '$timeout', '$mdDialog', Headmaster]
})
.config(['$stateProvider',
function($stateProvider) {
    //'ngInject';
    $stateProvider
      .state('Headmaster', {
        url: '/:stateHolder/HUSr/:userID',
        template: '<headmaster></headmaster>',
        resolve: {
            currentUser($q, $state) {
                if (!Meteor.userId()) {
                    return $q.reject('AUTH_REQUIRED');
                } else {
                    return $q.resolve();
                };
            }
          },
          onEnter: ['$rootScope', '$stateParams', '$state', function ($rootScope, $stateParams, $state) {
            $rootScope.stateHolder = $stateParams.stateHolder;
        }]
      });
    }
]);

