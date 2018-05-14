import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import { Meteor } from 'meteor/meteor';

import { Counts } from 'meteor/tmeasday:publish-counts';

import { Registers } from '../../../api/registers';

import template from './getstarted.html';
 
class Getstarted {
  constructor($scope, $reactive, $state) {
    //'ngInject';
 
    $reactive(this).attach($scope);

    this.startOne = true;
    this.startTwo = false;
    this.startThree = false;
    this.startFour = false;
    this.startFive = false;
    this.startSix = false;
    this.startSeven = false;
    this.startEight = false;
    $scope.startNine = false;
    this.matchPasswords = false;
    $scope.inProgress = false;
    $scope.emailExists = false;
    this.signup = {};

    this.countryLists = [
        {Code: "AF", Name: "Afghanistan"},
        {Code: "AX", Name: "\u00c5land Islands"},
        {Code: "AL", Name: "Albania"},
        {Code: "DZ", Name: "Algeria"},
        {Code: "AS", Name: "American Samoa"},
        {Code: "AD", Name: "Andorra"},
        {Code: "AO", Name: "Angola"},
        {Code: "AI", Name: "Anguilla"},
        {Code: "AQ", Name: "Antarctica"},
        {Code: "AG", Name: "Antigua and Barbuda"},
        {Code: "AR", Name: "Argentina"},
        {Code: "AM", Name: "Armenia"},
        {Code: "AW", Name: "Aruba"},
        {Code: "AU", Name: "Australia"},
        {Code: "AT", Name: "Austria"},
        {Code: "AZ", Name: "Azerbaijan"},
        {Code: "BS", Name: "Bahamas"},
        {Code: "BH", Name: "Bahrain"},
        {Code: "BD", Name: "Bangladesh"},
        {Code: "BB", Name: "Barbados"},
        {Code: "BY", Name: "Belarus"},
        {Code: "BE", Name: "Belgium"},
        {Code: "BZ", Name: "Belize"},
        {Code: "BJ", Name: "Benin"},
        {Code: "BM", Name: "Bermuda"},
        {Code: "BT", Name: "Bhutan"},
        {Code: "BO", Name: "Bolivia, Plurinational State of"},
        {Code: "BQ", Name: "Bonaire, Sint Eustatius and Saba"},
        {Code: "BA", Name: "Bosnia and Herzegovina"},
        {Code: "BW", Name: "Botswana"},
        {Code: "BV", Name: "Bouvet Island"},
        {Code: "BR", Name: "Brazil"},
        {Code: "IO", Name: "British Indian Ocean Territory"},
        {Code: "BN", Name: "Brunei Darussalam"},
        {Code: "BG", Name: "Bulgaria"},
        {Code: "BF", Name: "Burkina Faso"},
        {Code: "BI", Name: "Burundi"},
        {Code: "KH", Name: "Cambodia"},
        {Code: "CM", Name: "Cameroon"},
        {Code: "CA", Name: "Canada"},
        {Code: "CV", Name: "Cape Verde"},
        {Code: "KY", Name: "Cayman Islands"},
        {Code: "CF", Name: "Central African Republic"},
        {Code: "TD", Name: "Chad"},
        {Code: "CL", Name: "Chile"},
        {Code: "CN", Name: "China"},
        {Code: "CX", Name: "Christmas Island"},
        {Code: "CC", Name: "Cocos (Keeling) Islands"},
        {Code: "CO", Name: "Colombia"},
        {Code: "KM", Name: "Comoros"},
        {Code: "CG", Name: "Congo"},
        {Code: "CD", Name: "Congo, the Democratic Republic of the"},
        {Code: "CK", Name: "Cook Islands"},
        {Code: "CR", Name: "Costa Rica"},
        {Code: "CI", Name: "C\u00f4te d'Ivoire"},
        {Code: "HR", Name: "Croatia"},
        {Code: "CU", Name: "Cuba"},
        {Code: "CW", Name: "Cura\u00e7ao"},
        {Code: "CY", Name: "Cyprus"},
        {Code: "CZ", Name: "Czech Republic"},
        {Code: "DK", Name: "Denmark"},
        {Code: "DJ", Name: "Djibouti"},
        {Code: "DM", Name: "Dominica"},
        {Code: "DO", Name: "Dominican Republic"},
        {Code: "EC", Name: "Ecuador"},
        {Code: "EG", Name: "Egypt"},
        {Code: "SV", Name: "El Salvador"},
        {Code: "GQ", Name: "Equatorial Guinea"},
        {Code: "ER", Name: "Eritrea"},
        {Code: "EE", Name: "Estonia"},
        {Code: "ET", Name: "Ethiopia"},
        {Code: "FK", Name: "Falkland Islands (Malvinas)"},
        {Code: "FO", Name: "Faroe Islands"},
        {Code: "FJ", Name: "Fiji"},
        {Code: "FI", Name: "Finland"},
        {Code: "FR", Name: "France"},
        {Code: "GF", Name: "French Guiana"},
        {Code: "PF", Name: "French Polynesia"},
        {Code: "TF", Name: "French Southern Territories"},
        {Code: "GA", Name: "Gabon"},
        {Code: "GM", Name: "Gambia"},
        {Code: "GE", Name: "Georgia"},
        {Code: "DE", Name: "Germany"},
        {Code: "GH", Name: "Ghana"},
        {Code: "GI", Name: "Gibraltar"},
        {Code: "GR", Name: "Greece"},
        {Code: "GL", Name: "Greenland"},
        {Code: "GD", Name: "Grenada"},
        {Code: "GP", Name: "Guadeloupe"},
        {Code: "GU", Name: "Guam"},
        {Code: "GT", Name: "Guatemala"},
        {Code: "GG", Name: "Guernsey"},
        {Code: "GN", Name: "Guinea"},
        {Code: "GW", Name: "Guinea-Bissau"},
        {Code: "GY", Name: "Guyana"},
        {Code: "HT", Name: "Haiti"},
        {Code: "HM", Name: "Heard Island and McDonald Islands"},
        {Code: "VA", Name: "Holy See (Vatican City State)"},
        {Code: "HN", Name: "Honduras"},
        {Code: "HK", Name: "Hong Kong"},
        {Code: "HU", Name: "Hungary"},
        {Code: "IS", Name: "Iceland"},
        {Code: "IN", Name: "India"},
        {Code: "ID", Name: "Indonesia"},
        {Code: "IR", Name: "Iran, Islamic Republic of"},
        {Code: "IQ", Name: "Iraq"},
        {Code: "IE", Name: "Ireland"},
        {Code: "IM", Name: "Isle of Man"},
        {Code: "IL", Name: "Israel"},
        {Code: "IT", Name: "Italy"},
        {Code: "JM", Name: "Jamaica"},
        {Code: "JP", Name: "Japan"},
        {Code: "JE", Name: "Jersey"},
        {Code: "JO", Name: "Jordan"},
        {Code: "KZ", Name: "Kazakhstan"},
        {Code: "KE", Name: "Kenya"},
        {Code: "KI", Name: "Kiribati"},
        {Code: "KP", Name: "Korea, Democratic People's Republic of"},
        {Code: "KR", Name: "Korea, Republic of"},
        {Code: "KW", Name: "Kuwait"},
        {Code: "KG", Name: "Kyrgyzstan"},
        {Code: "LA", Name: "Lao People's Democratic Republic"},
        {Code: "LV", Name: "Latvia"},
        {Code: "LB", Name: "Lebanon"},
        {Code: "LS", Name: "Lesotho"},
        {Code: "LR", Name: "Liberia"},
        {Code: "LY", Name: "Libya"},
        {Code: "LI", Name: "Liechtenstein"},
        {Code: "LT", Name: "Lithuania"},
        {Code: "LU", Name: "Luxembourg"},
        {Code: "MO", Name: "Macao"},
        {Code: "MK", Name: "Macedonia, the Former Yugoslav Republic of"},
        {Code: "MG", Name: "Madagascar"},
        {Code: "MW", Name: "Malawi"},
        {Code: "MY", Name: "Malaysia"},
        {Code: "MV", Name: "Maldives"},
        {Code: "ML", Name: "Mali"},
        {Code: "MT", Name: "Malta"},
        {Code: "MH", Name: "Marshall Islands"},
        {Code: "MQ", Name: "Martinique"},
        {Code: "MR", Name: "Mauritania"},
        {Code: "MU", Name: "Mauritius"},
        {Code: "YT", Name: "Mayotte"},
        {Code: "MX", Name: "Mexico"},
        {Code: "FM", Name: "Micronesia, Federated States of"},
        {Code: "MD", Name: "Moldova, Republic of"},
        {Code: "MC", Name: "Monaco"},
        {Code: "MN", Name: "Mongolia"},
        {Code: "ME", Name: "Montenegro"},
        {Code: "MS", Name: "Montserrat"},
        {Code: "MA", Name: "Morocco"},
        {Code: "MZ", Name: "Mozambique"},
        {Code: "MM", Name: "Myanmar"},
        {Code: "NA", Name: "Namibia"},
        {Code: "NR", Name: "Nauru"},
        {Code: "NP", Name: "Nepal"},
        {Code: "NL", Name: "Netherlands"},
        {Code: "NC", Name: "New Caledonia"},
        {Code: "NZ", Name: "New Zealand"},
        {Code: "NI", Name: "Nicaragua"},
        {Code: "NE", Name: "Niger"},
        {Code: "NG", Name: "Nigeria"},
        {Code: "NU", Name: "Niue"},
        {Code: "NF", Name: "Norfolk Island"},
        {Code: "MP", Name: "Northern Mariana Islands"},
        {Code: "NO", Name: "Norway"},
        {Code: "OM", Name: "Oman"},
        {Code: "PK", Name: "Pakistan"},
        {Code: "PW", Name: "Palau"},
        {Code: "PS", Name: "Palestine, State of"},
        {Code: "PA", Name: "Panama"},
        {Code: "PG", Name: "Papua New Guinea"},
        {Code: "PY", Name: "Paraguay"},
        {Code: "PE", Name: "Peru"},
        {Code: "PH", Name: "Philippines"},
        {Code: "PN", Name: "Pitcairn"},
        {Code: "PL", Name: "Poland"},
        {Code: "PT", Name: "Portugal"},
        {Code: "PR", Name: "Puerto Rico"},
        {Code: "QA", Name: "Qatar"},
        {Code: "RE", Name: "R\u00e9union"},
        {Code: "RO", Name: "Romania"},
        {Code: "RU", Name: "Russian Federation"},
        {Code: "RW", Name: "Rwanda"},
        {Code: "BL", Name: "Saint Barth\u00e9lemy"},
        {Code: "SH", Name: "Saint Helena, Ascension and Tristan da Cunha"},
        {Code: "KN", Name: "Saint Kitts and Nevis"},
        {Code: "LC", Name: "Saint Lucia"},
        {Code: "MF", Name: "Saint Martin (French part)"},
        {Code: "PM", Name: "Saint Pierre and Miquelon"},
        {Code: "VC", Name: "Saint Vincent and the Grenadines"},
        {Code: "WS", Name: "Samoa"},
        {Code: "SM", Name: "San Marino"},
        {Code: "ST", Name: "Sao Tome and Principe"},
        {Code: "SA", Name: "Saudi Arabia"},
        {Code: "SN", Name: "Senegal"},
        {Code: "RS", Name: "Serbia"},
        {Code: "SC", Name: "Seychelles"},
        {Code: "SL", Name: "Sierra Leone"},
        {Code: "SG", Name: "Singapore"},
        {Code: "SX", Name: "Sint Maarten (Dutch part)"},
        {Code: "SK", Name: "Slovakia"},
        {Code: "SI", Name: "Slovenia"},
        {Code: "SB", Name: "Solomon Islands"},
        {Code: "SO", Name: "Somalia"},
        {Code: "ZA", Name: "South Africa"},
        {Code: "GS", Name: "South Georgia and the South Sandwich Islands"},
        {Code: "SS", Name: "South Sudan"},
        {Code: "ES", Name: "Spain"},
        {Code: "LK", Name: "Sri Lanka"},
        {Code: "SD", Name: "Sudan"},
        {Code: "SR", Name: "Suriname"},
        {Code: "SJ", Name: "Svalbard and Jan Mayen"},
        {Code: "SZ", Name: "Swaziland"},
        {Code: "SE", Name: "Sweden"},
        {Code: "CH", Name: "Switzerland"},
        {Code: "SY", Name: "Syrian Arab Republic"},
        {Code: "TW", Name: "Taiwan, Province of China"},
        {Code: "TJ", Name: "Tajikistan"},
        {Code: "TZ", Name: "Tanzania, United Republic of"},
        {Code: "TH", Name: "Thailand"},
        {Code: "TL", Name: "Timor-Leste"},
        {Code: "TG", Name: "Togo"},
        {Code: "TK", Name: "Tokelau"},
        {Code: "TO", Name: "Tonga"},
        {Code: "TT", Name: "Trinidad and Tobago"},
        {Code: "TN", Name: "Tunisia"},
        {Code: "TR", Name: "Turkey"},
        {Code: "TM", Name: "Turkmenistan"},
        {Code: "TC", Name: "Turks and Caicos Islands"},
        {Code: "TV", Name: "Tuvalu"},
        {Code: "UG", Name: "Uganda"},
        {Code: "UA", Name: "Ukraine"},
        {Code: "AE", Name: "United Arab Emirates"},
        {Code: "GB", Name: "United Kingdom"},
        {Code: "US", Name: "United States"},
        {Code: "UM", Name: "United States Minor Outlying Islands"},
        {Code: "UY", Name: "Uruguay"},
        {Code: "UZ", Name: "Uzbekistan"},
        {Code: "VU", Name: "Vanuatu"},
        {Code: "VE", Name: "Venezuela, Bolivarian Republic of"},
        {Code: "VN", Name: "Viet Nam"},
        {Code: "VG", Name: "Virgin Islands, British"},
        {Code: "VI", Name: "Virgin Islands, U.S."},
        {Code: "WF", Name: "Wallis and Futuna"},
        {Code: "EH", Name: "Western Sahara"},
        {Code: "YE", Name: "Yemen"},
        {Code: "ZM", Name: "Zambia"},
        {Code: "ZW", Name: "Zimbabwe"}];

    $scope.createProfile = function(details){
        console.info('employee details', $scope.profile)
        $scope.profile.userID = details
        $scope.profile.password = null;
        $scope.profile.password2 = null;
        var status = Registers.insert($scope.profile);
        console.info('status', status);
    }

    this.registerNow = function() {
        $scope.inProgress = true;
        this.startEight = false;
        this.signup.date = new Date();
        $scope.profile = this.signup;
        console.info('profile', this.signup);
        Meteor.call('createUsersFromRegister', this.signup.password, this.signup.email, function(err, detail) {
            console.info('detail', detail);
              if (err) {
                  console.info('err', err);
                  $scope.inProgress = false;
                  $scope.emailExists = true;
                  window.setTimeout(function(){
                    $scope.$apply();
                  },2000);
             } else {
               this.userID = detail;
               console.info('success', this.userID);
               this.cancreate = true;
               console.info('cancreate', this.cancreate);
               $scope.inProgress = false;
               $scope.startNine = true;
               window.setTimeout(function(){
                $scope.$apply();
              },2000);
               $scope.createProfile(detail);
             }
          });
      }

    this.stepOne = function(){
        this.startOne = true;
        this.startTwo = false;
        this.startThree = false;
        this.startFour = false;
        this.startFive = false;
        this.startSix = false;
        this.startSeven = false;
        this.startEight = false;
    }  

    this.stepTwo = function(){
        this.startOne = false;
        this.startTwo = true;
        this.startThree = false;
        this.startFour = false;
        this.startFive = false;
        this.startSix = false;
        this.startSeven = false;
        this.startEight = false;
    }

    this.stepThree = function(){
        if(this.signup.schoolName){
            this.startOne = false;
            this.startTwo = false;
            this.startThree = true;
            this.startFour = false;
            this.startFive = false;
            this.startSix = false;
            this.startSeven = false;
            this.startEight = false;
        }
    }

    this.stepFour = function(){
        if(this.signup.country){
            this.startOne = false;
            this.startTwo = false;
            this.startThree = false;
            this.startFour = true;
            this.startFive = false;
            this.startSix = false;
            this.startSeven = false;
            this.startEight = false;
            $scope.emailExists = false;
        }
        
    }

    this.stepFive = function(){
        if(this.signup.email){
            this.startOne = false;
            this.startTwo = false;
            this.startThree = false;
            this.startFour = false;
            this.startFive = true;
            this.startSix = false;
            this.startSeven = false;
            this.startEight = false;
        }
    }

    this.stepSix = function(){
        if(this.signup.firstname && this.signup.lastname){
            this.startOne = false;
            this.startTwo = false;
            this.startThree = false;
            this.startFour = false;
            this.startFive = false;
            this.startSix = true;
            this.startSeven = false;
            this.startEight = false;
        }
    }

    this.stepSeven = function(){
        if((this.signup.password == this.signup.password2) && (this.signup.password) && (this.signup.password2)){
            this.startOne = false;
            this.startTwo = false;
            this.startThree = false;
            this.startFour = false;
            this.startFive = false;
            this.startSix = false;
            this.startSeven = true;
            this.startEight = false;
            this.matchPasswords = false;
        }
        else {
            this.matchPasswords = true;
        }
    }

    this.stepEightOK = function(){
        this.startOne = false;
        this.startTwo = false;
        this.startThree = false;
        this.startFour = false;
        this.startFive = false;
        this.startSix = false;
        this.startSeven = false;
        this.startEight = true;
        
        this.sendEmail = true;
    }

    this.stepEightNO = function(){
        this.startOne = false;
        this.startTwo = false;
        this.startThree = false;
        this.startFour = false;
        this.startFive = false;
        this.startSix = false;
        this.startSeven = false;
        this.startEight = true;
        
        this.sendEmail = false;
    }

    this.stepNine = function(){
        this.startOne = false;
        this.startTwo = false;
        this.startThree = false;
        this.startFour = false;
        this.startFive = false;
        this.startSix = false;
        this.startSeven = false;
        this.startEight = false;
        $scope.startNine = true;
    }
  }

  isOwner(party) {
    return this.isLoggedIn && party.owner === this.currentUserId;
  }

  
}
 
const name = 'getstarted';

//Login.$inject = ['$scope', '$reactive', '$state'];
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  utilsPagination
]).component(name, {
  template,
  controllerAs: name,
  controller: ['$scope', '$reactive', '$state', Getstarted]
})
.config(['$stateProvider',
function($stateProvider) {
    //'ngInject';
    $stateProvider
      .state('getstarted', {
        url: '/getstarted',
        template: '<getstarted></getstarted>',
        resolve: {
            currentUser($q, $state) {
                if (!Meteor.userId()) {
                  return $q.resolve();
                } else {
                  return $q.reject('LOGGED_IN');
                };
            }
          }
      });
    }
]);

