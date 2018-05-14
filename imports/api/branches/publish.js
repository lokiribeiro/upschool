import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Branches } from './collection';

if (Meteor.isServer) {
   Meteor.publish('branches', function(options, searchString) {
   const selector = {};

   if (typeof searchString === 'string' && searchString.length) {
    selector.name = {
      $regex: `.*${searchString}.*`,
      $options : 'i'
    };
  }

   Counts.publish(this, 'numberOfBranches', Branches.find(selector), {
    noReady: true
  });

   return Branches.find(selector, options);
 });
}