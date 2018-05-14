import { Mongo } from 'meteor/mongo';

export const Userapps = new Mongo.Collection('userapps');

Userapps.allow({
 insert(userId, userapp) {
   return userId;
 },
 update(userId, userapp, fields, modifier) {
   return true;
 },
 remove(userId, userapp) {
   return true;
 }
});