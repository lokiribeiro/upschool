import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import { Meteor } from 'meteor/meteor';

import { Counts } from 'meteor/tmeasday:publish-counts';

import { Branches } from '../../../api/branches';

import template from './parentschool.html';
 
class Parentschool {
  constructor($scope, $reactive, $state, $stateParams, $timeout) {
    //'ngInject';
 
    $reactive(this).attach($scope);

    this.userID = $stateParams.userID;
    this.state = $stateParams.stateHolder;
    //themeProvider.setDefaultTheme(this.state);


    this.subscribe('users');

    this.subscribe('branches');
 
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
        branches() {
            var sort  = -1;
            var branch = 'parent';
            var selector = {type: branch};
            var branches = Branches.find(
                selector, { sort: {branch_name: sort} }
            );
            console.info('branches', branches);
            return branches;
        },
        totalBranches() {
            var count = Counts.get('numberOfBranches');
            console.info('count', count);
            return count;
          }
    });

    
  }
  
}
 
const name = 'parentschool';

//Login.$inject = ['$scope', '$reactive', '$state'];
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  utilsPagination
]).component(name, {
  template,
  controllerAs: name,
  controller: ['$scope', '$reactive', '$state', '$stateParams', '$timeout', Parentschool]
});

