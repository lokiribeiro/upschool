import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Userapps } from './collection';

if (Meteor.isServer) {
   Meteor.publish('userapps', function() {
   var selector = {};

   Counts.publish(this, 'numberOfUserApps', Userapps.find(selector), {
    noReady: true
  });

   return Userapps.find(selector);
 });
}