import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Jobs } from './collection';

if (Meteor.isServer) {
   Meteor.publish('jobs', function(options, searchString, dateFrom, dateTo) {
   var selector = {};

   if (typeof searchString === 'string' && searchString.length) {
     var search = {$regex: `.*${searchString}.*`, $options: 'i'};
     selector = {$or: [
       {title: search},
       {group: search}
     ],
    $and: [
      {dateTime: {
        $gte: dateFrom,
        $lte: dateTo
      }}
    ]};
    /*selector = {dateTime: {
      $gte: dateFrom,
      $lte: dateTo
    }};*/
    /*selector.title = {
      $regex: `.*${searchString}.*`,
      $options : 'i'
    };*/
  }

   Counts.publish(this, 'numberOfJobs', Jobs.find(selector), {
    noReady: true
  });

   return Jobs.find(selector, options);
 });
}