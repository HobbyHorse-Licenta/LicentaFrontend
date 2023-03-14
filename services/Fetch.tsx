import { Event, Schedule, User } from "../types";
import {basketUrl, tennisUrl} from '../assets/imageUrls'
const Fetch = {

    
    getEvents: function(){
        const events: Array<Event> = [
            {
                id: 1,
                name: "Basket Practice",
                imageUrl: basketUrl,
                level: 'Healthy beginner',
                location: 'Gheorgheni Baza'
            },
            {
                id: 2,
                name: "Tennis Game",
                imageUrl: tennisUrl,
                level: 'Elite athlete',
                description: 'This would be a game to train with someone who might be the best in the city',
                location: 'Stadion'
            },
        ];
        
        return events;
    },

    getSchedules: function(){
        const schedules: Array<Schedule> =[
            {
                id: 1
            },
            {
                id: 2
            }
        ];

        return schedules;
    },

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