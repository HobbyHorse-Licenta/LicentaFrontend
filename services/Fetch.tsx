import { Event } from "../types";
import {basketUrl, tennisUrl} from '../assets/imageUrls'
const Fetch = {

    
    getEvents: function(){
        const events: Array<Event> = [
            {
                id: 1,
                imageUrl: basketUrl,
                level: 'Healthy beginner',
                location: 'Gheorgheni Baza'
            },
            {
                id: 2,
                imageUrl: tennisUrl,
                level: 'Elite athlete',
                description: 'This would be a game to train with someone who might be the best in the city',
                location: 'Stadion'
            },
        ];
        
        return events;
    }
   
};

export default Fetch;