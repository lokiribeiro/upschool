import { Mongo } from 'meteor/mongo';

export const Navigations = new Mongo.Collection('navigations');

Navigations.allow({
 insert(userId, navigation) {
   return userId;
 },
 update(userId, navigation, fields, modifier) {
   return true;
 },
 remove(userId, navigation) {
   return true;
 }
});