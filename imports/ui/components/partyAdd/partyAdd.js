import angular from 'angular';
import angularMeteor from 'angular-meteor';


import { Meteor } from 'meteor/meteor';
 
import template from './partyAdd.html';
import { Parties } from '../../../api/parties';
import PartyUpload from '../partyUpload/partyUpload';
 
class PartyAdd {
    constructor() {
      this.party = {};
    }
   
    submit() {
        this.party.owner = Meteor.userId();
        Parties.insert(this.party);
        this.reset();
      }
     
    reset() {
        this.party = {};
    }
  }
   
 
const name = 'partyAdd';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  PartyUpload.name
]).component(name, {
  template,
  controllerAs: name,
  controller: PartyAdd
});