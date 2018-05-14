import _ from 'underscore';
import '../imports/api/users';

import { Meteor } from 'meteor/meteor';


   
   export function createUsers(password, email) {
    
     if (!this.userId) {
       throw new Meteor.Error(400, 'You have to be logged in!');
     }

     if (Meteor.isServer) {
        username = Accounts.createUser({email:email, password:password});
     }
     return username;
   }

   export function createUsersFromRegister(password, email) {

     if (Meteor.isServer) {
        username = Accounts.createUser({email:email, password:password});
     }
     return username;
   }

   export function upsertNewRoleFromAdmin(userID, userRole, roleID){
    var selector = {_id: userID};
    var modifier = {$set: {
      role: userRole,
      roleID: roleID
    }};
    var roleUpsert = Meteor.users.upsert(selector, modifier);
    return roleUpsert;
  }

  export function  upsertUser(profileID, downloadUrl, firstname, lastname, branchID){
    var selector = {_id: profileID};
    var modifier = {$set: {
        profilePhoto: downloadUrl,
        firstname: firstname,
        lastname: lastname,
        branchID: branchID
      }};
      if (Meteor.isServer) {
    var fileUpsert = Meteor.users.upsert(selector, modifier);
      }
    return fileUpsert;
  }




   Meteor.methods({
       createUsers,
       createUsersFromRegister,
       upsertNewRoleFromAdmin,
       upsertUser
   });