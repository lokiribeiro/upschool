import { Mongo } from 'meteor/mongo';

export const Apps = new Mongo.Collection('apps');

Apps.allow({
 insert(userId, app) {
   return userId;
 },
 update(userId, app, fields, modifier) {
   return true;
 },
 remove(userId, app) {
   return true;
 }
});