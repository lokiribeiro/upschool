import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import { Meteor } from 'meteor/meteor';

import { Counts } from 'meteor/tmeasday:publish-counts';

import { Branches } from '../../../api/branches';

import template from './headmastercreateschool.html';
 
class Headmastercreateschool {
  constructor($scope, $reactive, $state, $stateParams, $timeout, $mdDialog) {
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

    $scope.createdNow = false;
    $scope.createdNows = false;
    $scope.done = false;
    $scope.existing = false;

    $scope.canCreateProfile = false;

    this.credentials = {
      schoolname: '',
      schooltype: '',
      address: '',
      city: '',
      schooladmin: '',
      schooladminname: ''
    };

    this.register = {
      schoolname: '',
      schooltype: '',
      address: '',
      city: '',
      schooladmin: '',
      schooladminname: ''
    }

    this.error = '';

    //var details = this.credentials;
    var details = this.register;

    console.info('details: ', details);

    $scope.createSchool = function(details) {
      var detail = details;

      console.info('detail', details);

      $scope.done = true;
      $scope.existing = false;
      $scope.createdNow = !$scope.createdNow;
      //var status = createUserFromAdmin(details);

      var branch = [];

      branch.branch_name = details.schoolname;
      branch.branches_address = details.address;
      branch.branches_city = details.city;
      branch.branches_schooladmin = details.schooladmin._id;
      branch.branches_schooladminname = details.schooladmin.name;
      branch.branches_type = details.schooltype;

      //branch.userpic = details.schooladmin.userpic;
      branch.userpic = '../../assets/img/profiles/user.png';

      var profilesID = details.schooladmin._id;

      console.info('profilesID', profilesID);

      var status = Branches.insert(branch);

      var profileID = profilesID;
      var branchID = status;
      var branchName = details.schoolname;
      var userType = 'Non-teaching staff';

      console.info('profileID', profileID);
      console.info('status', branchID);
      console.info('branchname', branchName);

      if(branch.branches_schooladminname && branch.branches_type){
        Meteor.call('upsertNewBranchFromAdmin', profileID, branchID, function(err, detailss) {
          if (err) {
              //do something with the id : for ex create profile
            console.log('error upserting branch to meteor.user()');
         }
        });

        Meteor.call('upsertProfileFromAdmin', profileID, branchID, branchName, userType, function(err, detail) {
        if (err) {
            //do something with the id : for ex create profile
            $scope.done = false;
            $scope.createdNow = !$scope.createdNow;
            $scope.existing = true;
            window.setTimeout(function(){
            $scope.$apply();
          },2000);
       } else {
         $scope.registered = details;
         $scope.createdNows = !$scope.createdNows;
         $scope.done = false;
         //simulation purposes
         window.setTimeout(function(){
         $scope.$apply();
       },2000);
       }
     });
      } else {
        $scope.loginerror = 'Fields cannot be empty';
            console.info('err: ' ,   $scope.loginerror );
      }



  }

    $scope.createAnother = function() {
       $scope.createdNows = !$scope.createdNows;
       $scope.createdNow = !$scope.createdNow;
       //$scope.createdNow = '1';
    }

    $scope.closeDialog = function() {
       $mdDialog.hide();
       //$scope.createdNow = '1';
     }

    
  }
  
}
 
const name = 'headmastercreateschool';

//Login.$inject = ['$scope', '$reactive', '$state'];
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  utilsPagination
]).component(name, {
  template,
  controllerAs: name,
  controller: ['$scope', '$reactive', '$state', '$stateParams', '$timeout', '$mdDialog', Headmastercreateschool]
});

