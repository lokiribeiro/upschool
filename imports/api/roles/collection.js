import { Mongo } from 'meteor/mongo';

export const Roles = new Mongo.Collection('roles');

Roles.allow({
 insert(userId, role) {
   return userId;
 },
 update(userId, role, fields, modifier) {
   return true;
 },
 remove(userId, role) {
   return true;
 }
});