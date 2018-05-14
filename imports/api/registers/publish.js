import { Meteor } from 'meteor/meteor';

import { Registers } from './collection';

if (Meteor.isServer) {
   Meteor.publish('registers', function() {
   var selector = {};

   return Registers.find(selector);
 });
}