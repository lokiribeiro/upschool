import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Navigations } from './collection';

if (Meteor.isServer) {
    Meteor.publish('navigations', function(options, searchString) {
    var selector = {};
 
    if (typeof searchString === 'string' && searchString.length) {
     var search = {$regex: `.*${searchString}.*`, $options: 'i'};
     selector = {
         menuItem : search
     };
   }
  
    return Navigations.find(selector, options);
  });
 }