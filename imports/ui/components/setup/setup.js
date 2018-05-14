import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import { Meteor } from 'meteor/meteor';

import { Counts } from 'meteor/tmeasday:publish-counts';

import { Registers } from '../../../api/registers';
import { Profiles } from '../../../api/profiles';
import { Apps } from '../../../api/apps';
import { Userapps } from '../../../api/userapps';
import { Roles } from '../../../api/roles';
import { Branches } from '../../../api/branches';

import template from './setup.html';
 
class Setup {
  constructor($scope, $reactive, $state) {
    //'ngInject';
 
    $reactive(this).attach($scope);

    this.subscribe('apps');

    this.subscribe('registers');

    this.subscribe('profiles');

    this.subscribe('roles');

    this.subscribe('users');

    this.subscribe('userapps');
    
    this.helpers({
      isLoggedIn() {
        return !!Meteor.userId();
      },
      currentUserId() {
        return Meteor.userId();
      }, 
      apps() {
        var sort = 1;
        var selector = {};
        var apps = Apps.find(selector, {sort: {name: sort}});
        return apps;
      },
      registers () {
        return Registers.find({});
      },
      userapps () {
        return Userapps.find({});
      }
    });

    this.startOne = true;
    this.startTwo = false;
    this.startThree = false;
    this.startFour = false;
    this.startFive = false;
    this.startSix = false;
    this.startSeven = false;
    this.startEight = false;
    $scope.startNine = false;
    this.matchPasswords = false;
    $scope.inProgress = false;
    $scope.emailExists = false;
    this.signup = {};
    this.firstTick = true;
    this.roles = {};
    this.userappInsert = {};
    $scope.installed = [];
    $scope.profile = {};
    $scope.branch = {};

    this.defaultApp = 'Headmaster';
    this.defaultVal = true;
    $scope.roleID = '';

    $scope.userID = Meteor.userId();

    this.switchApp = function(app, installed){
      console.info('appID', app);
      console.info('installed', installed);
      var appID = app._id;
      var sort = 1;
      var appInstalled = null;
      var found = null;
      var userAppsHolder = {
        userID: '',
        appId: '',
        appName: '',
        appLoc: '',
        desc: ''
      };

      var selector = {_id: appID};
      var fromApps = Apps.findOne(selector);

      if(this.firstTick){
        var rolesId = Meteor.user();
        var rolesID = rolesId.roleID;
        if(rolesID){
          console.info('rolesID', rolesID);
          var userID = Meteor.userId();
          this.firstTick = false;
          $scope.roleID = rolesID;
        } else {
          var userID = Meteor.userId();
          this.firstTick = false;
          this.roles.name = 'admin';
          this.roles.userID = userID;
          $scope.roleID = Roles.insert(this.roles);
          console.info('roleID', $scope.roleID);
          var roleName = 'admin';
          var roleIDs = $scope.roleID;
  
          var selector = {name: 'Headmaster'};
          var headmasters = Apps.find(selector);
          console.info('headmaster', headmasters);
          headmasters.forEach(function(headmaster){
            console.info('foreach', headmaster.name);
            if(headmaster.name == 'Headmaster'){
              var insertApp = {};
              var headID = headmaster._id;
              insertApp.appName = headmaster.name;
              insertApp.appLoc = headmaster.loc;
              insertApp.desc = headmaster.desc;
              insertApp.bigPic = headmaster.bigPic;
              insertApp.userID = userID;
              Userapps.insert(insertApp);
  
              var selector = {_id: roleIDs};
              var modifier = {$push: {apps: {appId: headID}}};
              Roles.update(selector,modifier);
            }
          });
  
          Meteor.call('upsertNewRoleFromAdmin', userID, roleName, $scope.roleID, function(err, detail) {
            console.info('detail', detail);
              if (err) {
                  console.info('err', err);
             } else {
               console.info('success', detail);
             }
          });

        }
        
      }

      if(installed){
        var userDetails = Meteor.user();
        var roleID = $scope.roleID;
        console.info('roleID', userDetails);
        var selector = {_id: roleID};
        var modifier = {$push: {apps: {appId: appID}}};
        Roles.update(selector,modifier);
        var toasted = 'App added';
        var userId = Meteor.userId();
        selector = {userID: userId};
        modifier = {sort: {appName: sort}}; 
        var userApps = Userapps.find(selector, modifier);
        var userAppsNum = userApps.count();
        console.info('userAppsNum', userAppsNum);
        
        if(userAppsNum > 0){
          userApps.forEach(function(userapp){
            if((userapp.appName == appID) || (found == true)){
              console.info('appname', userapp.appName );
              appInstalled = true;
              found = true;
            }
            else if((userapp.appName == appID) && (found == false)){
              appInstalled = true;
              found = true;
            }
            else {
              appInstalled = false;
            }
          });
        } else {
          appInstalled = false;
        }

        if(appInstalled == false){
          console.info('fromApps', fromApps);
          userAppsHolder.userID = Meteor.userId();
          userAppsHolder.appId = appID;
          userAppsHolder.appName = fromApps.name;
          userAppsHolder.appLoc = fromApps.loc;
          userAppsHolder.desc = fromApps.desc;
          userAppsHolder.bigPic = fromApps.bigPic;
          var status = Userapps.insert(userAppsHolder);
          if (status) {
            console.log('inserted user to userapps');

          } else {
            console.log('error inserting');
          }
        }
      } else {
        var userDetails = Meteor.user();
        var userID = Meteor.userId();
        console.info('remove userID', userID);
        var roleID = userDetails.roleID;
        var selector = {_id: roleID};
        var modifier = {$pull: {apps: {appId: appID}}};
        Roles.update(selector,modifier);
        var toasted = 'App removed';
        console.info('enter else', appID);
        selector = {
          $and: [
            {userID: userID},
            {appId: appID}
          ]
        };
        var toRemove = Userapps.find(selector);
        console.info('toRemove', toRemove);
        toRemove.forEach(function(toRem){
          var removeID = toRem._id;
          selector = {_id: removeID};
          console.info('toremid', removeID);
          var status = Userapps.remove(selector);
          if (status) {
            console.log('inserted user to userapps');

          } else {
            console.log('error inserting', status);
          }
        });

      }
    }

    //create profiles
    this.finalStep = function (){
      var userID = $scope.userID;
      console.info('userID', userID);
      var selector = {userID : userID};
      var profiles = Registers.find(selector);
      console.info('profile', profiles);
      profiles.forEach(function(profile){
        if(profile.userID == userID){
          $scope.profile = profile;
          console.info('pasok dito', profile);
        }
      });
      console.info('profile after loop', $scope.profile);
      $scope.profile.branchID = userID;
      $scope.profile.profilePhoto = '../assets/img/profiles/user.png';
      $scope.profile.date = new Date();
      var status = Profiles.insert($scope.profile, 
        (error) => {
          if (error) {
            console.info('Oops, unable to insert...', error);
          } else {
            console.info('Done!', error);
          }
      });

      //$scope.branch.branchID = userID;
      $scope.branch.schoolName = $scope.profile.schoolName;
      $scope.branch.schoolAdmin = $scope.profile.firstname + ' ' + $scope.profile.lastname;
      $scope.branch.country = $scope.profile.country;
      $scope.branch.adminPic = $scope.profile.profilePhoto;
      $scope.branch.type = 'parent';
      $scope.branch.status = true;

      var branchID = Branches.insert($scope.branch, 
        (error) => {
          if (error) {
            console.info('Oops, unable to insert branch...', error);
          } else {
            console.info('Done!', error);
          }
      });

      Meteor.call('upsertUser', userID, $scope.profile.profilePhoto, $scope.profile.firstname, $scope.profile.lastname, branchID, function(err, result) {
        if (err) {
          console.info('err', err);
        } else {
          console.info('uploaded', err);
       }
      });
      console.info('status', status);
      $state.go('Headmaster', {userID: $scope.userID, stateHolder: 'Headmaster'});
    }



    
  }

  isOwner(party) {
    return this.isLoggedIn && party.owner === this.currentUserId;
  }

  
}
 
const name = 'setup';

//Login.$inject = ['$scope', '$reactive', '$state'];
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  utilsPagination
]).component(name, {
  template,
  controllerAs: name,
  controller: ['$scope', '$reactive', '$state', Setup]
})
.config(['$stateProvider',
function($stateProvider) {
    //'ngInject';
    $stateProvider
      .state('setup', {
        url: '/setup',
        template: '<setup></setup>',
        resolve: {
            currentUser($q, $state) {
                if (!Meteor.userId()) {
                    return $q.reject('AUTH_REQUIRED');
                } else {
                  return $q.resolve();
                };
            }
        }
      });
    }
]);

