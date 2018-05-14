import { Mongo } from 'meteor/mongo';

export const Registers = new Mongo.Collection('registers');

Registers.allow({
 insert() {
   return true;
 },
 update(userId, register, fields, modifier) {
   return true;
 },
 remove(userId, register) {
   return true;
 }
});