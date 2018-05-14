import { Mongo } from 'meteor/mongo';

export const Branches = new Mongo.Collection('branches');

Branches.allow({
 insert(userId, branch) {
   return userId;
 },
 update(userId, branch, fields, modifier) {
   return true;
 },
 remove(userId, branch) {
   return true;
 }
});