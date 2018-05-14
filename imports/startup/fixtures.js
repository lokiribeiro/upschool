import { Meteor } from 'meteor/meteor';

import { Apps } from '../api/apps';

 
Meteor.startup(() => {
    if (Apps.find().count() === 0) {
        const apps = [{
            'name': 'Admissions',
            'desc': 'Manage and track enrollment.',
            'loc': '../../assets/img/admissions_icon.png',
            'bigPic': '../../assets/img/admissions2.png'
        }, {
            'name': 'Assessment',
            'desc': 'Manage your grading system',
            'loc': '../../assets/img/assessment_icon.png',
            'bigPic': '../../assets/img/assessment2.png'
        }, {
            'name': 'Classroom',
            'desc': 'Manage virtual classes',
            'loc': '../../assets/img/classroom_icon.png',
            'bigPic': '../../assets/img/classroom2.png'
        }, {
            'name': 'Collect',
            'desc': 'Manage fees collection and notification',
            'loc': '../../assets/img/collect_icon.png',
            'bigPic': '../../assets/img/collect2.png'
        }, {
            'name': 'Headmaster',
            'desc': 'Manage users, configure school admin settings',
            'loc': '../../assets/img/headmaster_icon.png',
            'bigPic': '../../assets/img/headmaster2.png'
  
        }, {
            'name': 'Rapido',
            'desc': 'Manage attendance and parent notification system',
            'loc': '../../assets/img/rapido_icon.png',
            'bigPic': '../../assets/img/rapido2.png'
        }, {
            'name': 'Scheduler',
            'desc': 'Manage faculty scheduling and room assignments',
            'loc': '../../assets/img/scheduler_icon.png',
            'bigPic': '../../assets/img/scheduler2.png'
        }];
     
        apps.forEach((app) => {
            Apps.insert(app)
        });
    }
  
});