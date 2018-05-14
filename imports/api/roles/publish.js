import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Roles } from './collection';

if (Meteor.isServer) {
   Meteor.publish('roles', function(options, searchString) {
   const selector = {};

   if (typeof searchString === 'string' && searchString.length) {
    selector.role = {
      $regex: `.*${searchString}.*`,
      $options : 'i'
    };
  }

   Counts.publish(this, 'numberOfRoles', Roles.find(selector), {
    noReady: true
  });

   return Roles.find(selector, options);
 });
}