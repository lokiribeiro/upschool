import { Meteor } from 'meteor/meteor';

import { Apps } from './collection';

if (Meteor.isServer) {
   Meteor.publish('apps', function() {
   var selector = {};

   return Apps.find(selector);
 });
}