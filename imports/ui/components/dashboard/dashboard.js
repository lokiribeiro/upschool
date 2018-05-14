import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import { Meteor } from 'meteor/meteor';

import { Counts } from 'meteor/tmeasday:publish-counts';
import { Userapps } from '../../../api/userapps';

import template from './dashboard.html';
 
class Dashboard {
  constructor($scope, $reactive, $state, $rootScope, $stateParams) {
    //'ngInject';
 
    $reactive(this).attach($scope);

    this.state = $stateParams.stateHolder;
    console.info('state.this', this.state);

    this.job = {};
    this.dateFrom = '';
    this.dateTo = '';
    this.dateFrom2 = '';
    this.dateTo2 = '';

    this.perPage = 10;
    this.page = 1;
    this.sort = {
      name: 1
    };
    this.searchText = '';

    this.subscribe('users');

    this.subscribe('userapps');
 
    this.helpers({
      userapps() {
        var userID = Meteor.userId();
        var sort  = this.sort;
        var selector = {userID: userID};
        var modifier = {sort: {appName: sort}};
        var userapps = Userapps.find(selector,modifier);
        console.info('userapps', userapps);
        return userapps;
      },
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

    this.logout = function() {
      Accounts.logout();
      window.setTimeout(function(){
        $state.go('login', {}, {reload: 'login'});
      },2000);
    }

    this.redirect = function(appName) {
      $state.go(appName, { userID : Meteor.userId(), stateHolder : appName });
    }
    
  }

  isOwner(party) {
    return this.isLoggedIn && party.owner === this.currentUserId;
  }
   
  pageChanged(newPage) {
    this.page = newPage;
    console.info('new page', this.page);
  }

  sortChanged(sort) {
    this.sort = sort;
  }

  submit() {
    this.job.owner = Meteor.userId();
    this.job.date = new Date();
    this.job.dateTime = this.job.date.getTime();
    var status = Jobs.insert(this.job);
    this.job = {};
  }

  reset() {
    this.searchText = '';
    this.dateFrom2 = '';
    this.dateTo2 = '';
    
  }

  filterNow() {
    console.info('searchText', this.searchText);
    this.dateFrom2 = this.dateFrom.getTime();
    this.dateTo2 = this.dateTo.getTime();
  }
}
 
const name = 'dashboard';

//Dashboard.$inject = ['$scope', '$reactive'];
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  utilsPagination
]).component(name, {
  template,
  controllerAs: name,
  controller: ['$scope', '$reactive', '$state', '$rootScope', '$stateParams', Dashboard]
})
.config(['$stateProvider', 
function($stateProvider) {
  //'ngInject';
  $stateProvider
    .state('Dashboard', {
      url: '/ab/:stateHolder',
      template: '<dashboard></dashboard>',
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

