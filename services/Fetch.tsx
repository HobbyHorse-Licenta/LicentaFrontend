import https from 'https';
import { Event, Location, Schedule, SkateExperience, SkatePracticeStyles, SkateProfile, SkatesType, SportName, User } from "../types";
import {basketUrl, tennisUrl} from '../assets/imageUrls'
import {apiUrl} from '../assets/apiUrl'

const Fetch = {

    getLocations: function(){
        const events: Array<Location> = [
            {
                id:  '321312',
                name: 'Gheorgheni Baza',
                gpsPoint: {
                    lat: 46.77159014009401, 
                    long: 23.635888336315503,
                }
            },
            {
                id:  '3342434',
                name: 'Parcul Rozelor',
                gpsPoint: {
                    lat: 46.7649101022356, 
                    long: 23.552784857259145,
                }
            }
        ]
    },
    postSkill: async function(callBackFunction: Function){
        console.log("INTRU AICI");
        await fetch("http://192.168.1.50:5085/skill/skill", 
        { method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userEmail: 'userEmail',
            description: 'description',
            address: 'address',
            maxConsumption: 'maxConsumption'
        })
        })
        .then(response => response.json())
        .then(data => {
          console.log(data)
        })
    },
    
    getSkills: async function(callBackFunction: Function) {
        fetch(apiUrl + "/skill/allSkills", {
            "method": "GET"
        }).then(response => response.json())
        .then(info => callBackFunction(info))
        .catch(err => console.error(err.message));      
    },

    getSkateProfiles: function(){
        // const skateProfiles: Array<SkateProfile> = [
        //     {
        //         skateType: SkatesType.SpeedSkates,
        //         skatePracticeStyle: SkatePracticeStyles.CasualSkating,
        //         skateExperience: SkateExperience.Intermediate
        //     },
        //     {
        //         skateType: SkatesType.SpeedSkates,
        //         skatePracticeStyle: SkatePracticeStyles.SpeedSkating,
        //         skateExperience: SkateExperience.Advanced
        //     },
        //     {
        //         skateType: SkatesType.AggressiveSkates,
        //         skatePracticeStyle: SkatePracticeStyles.AggresiveSkating,
        //         skateExperience: SkateExperience.Begginer
        //     }
        // ];
        return null;
    },
    
    getEvents: function(){
        const events: Array<Event> = [
            // {
            //     id: 1,
            //     name: "Basket Practice",
            //     imageUrl: basketUrl,
            //     description: {
            //         sport: SportName.Basketball,
            //         sportLevel: 'Healthy beginner',
            //         location: {
            //             id: '342jkg',
            //             name: 'Gheorgheni Baza',
            //             gpsPoint: {
            //                 lat: 46.77159014009401, 
            //                 long: 23.635888336315503,
            //             }
            //         }
            //     }
                
            // },
            // {
            //     id: 2,
            //     name: "Tennis Game",
            //     imageUrl: tennisUrl,
            //     description: {
            //         sport: SportName.Tennis,
            //         sportLevel: 'Elite athlete',
            //         location: {
            //             id: '342jkg',
            //             name: 'Gheorgheni Baza',
            //             gpsPoint: {
            //                 lat: 46.77159014009401, 
            //                 long: 23.635888336315503,
            //             }
            //         },
            //         note: 'This would be a game to train with someone who might be the best in the city'
            //     }
            //},
        ];
        
        return events;
    },

    // getSchedules: function(){
    //     const schedules: Array<Schedule> =[
    //         {
    //             id: 1
    //         },
    //         {
    //             id: 2
    //         }
    //     ];

    //     return schedules;
    // },

    getLocation: function(nameOfLocation: string) : Location | null{
        if(nameOfLocation === 'Cluj-Napoca')
        {
            return {
                id: '321fdh',
                name: 'Cluj-Napoca',
                gpsPoint: {
                    lat:  46.771069, 
                    long: 23.596883,
                }
            }

        }
        return null;
    }
    // getSchedules: function(){
    //     const schedules: Array<Schedule> =[
    //         {
    //             id: 1
    //         },
    //         {
    //             id: 2
    //         }
    //     ];

    //     return schedules;
    // },

    // getUsers: function(){
    //     const events: Array<User> = [
    //         {
    //             profileImageUrl: 
    //             id: 1,
    //             name: "Basket Practice",
    //             imageUrl: basketUrl,
    //             level: 'Healthy beginner',
    //             location: 'Gheorgheni Baza'
    //         },
    //         {
    //             id: 2,
    //             name: "Tennis Game",
    //             imageUrl: tennisUrl,
    //             level: 'Elite athlete',
    //             description: 'This would be a game to train with someone who might be the best in the city',
    //             location: 'Stadion'
    //         },
    //     ];
        
    //     return events;
    // }

   
};

export default Fetch;