import { AggresiveEvent, AssignedSkill, Schedule, SkateExperience, SkatePracticeStyles, SkateProfile, User } from "../types";
import {apiUrl} from '../assets/apiUrl'

const commentOn = true;


const Fetch = {

    delete: async function(JWTToken: string, url: string, callBackFunction: Function, errorCallBackFunction: Function) {
      if(commentOn)
      {
        console.log("DELETE; endpoint => " + url + "\n");
      }
      try 
      {
        const response = await fetch(url, {
            headers: {
              "Authorization": `Bearer ${JWTToken}`,
              "Content-Type": "application/json"
            },
            method: "DELETE",
          });
      
        if (!response.ok) {
          errorCallBackFunction();
          throw new Error(`get: HTTP error! Status: ${response.status}`);
          
        }
        else {
          //const data = await response.json();
          if(commentOn)
          {
            console.log("DELETE; made successful\n\n\n");
          }
          callBackFunction();
        }
    
      } 
      catch (error) {
        console.error(`Error: ${error.message}`);
        if (error.message === 'Network request failed') {
          errorCallBackFunction();
          console.log('Network error occurred!');
        } else {
          errorCallBackFunction();
          console.error(`Error: ${error.message}`);
        }
      }
    },
    deleteSchedule: async function(jwtToken: string, scheduleId: string, callBackFunction: Function, errorCallBackFunction: Function){
      this.delete(jwtToken, `${apiUrl}/schedule/delete/schedule/${scheduleId}`, callBackFunction, errorCallBackFunction);
    },
    put: async function(JWTToken: string, url: string, updatedObject: any, callBackFunction: Function, errorCallBackFunction: Function) {
      if(commentOn)
      {
        console.log("PUT; endpoint => " + url + "\nbody:\n" + JSON.stringify(updatedObject) + "\n");
      }
      try 
      {
        const response = await fetch(url, {
            headers: {
              "Authorization": `Bearer ${JWTToken}`,
              "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify(updatedObject)
          });
      
        if (!response.ok) {
          errorCallBackFunction();
          throw new Error(`get: HTTP error! Status: ${response.status}`);
          
        }
        else {
          const data = await response.json();
          if(commentOn)
          {
            console.log("PUT; data returned:\n" + JSON.stringify(updatedObject) + "\n\n\n");
          }
          callBackFunction(data);
        }
    
      } 
      catch (error) {
        console.error(`Error: ${error.message}`);
        if (error.message === 'Network request failed') {
          errorCallBackFunction();
          console.log('Network error occurred!');
        } else {
          errorCallBackFunction();
          console.error(`Error: ${error.message}`);
        }
      }
    },

    joinSkateProfileToEvent: async function(jwtToken: string, currentSkateProfileId: string, eventId: string, callBackFunction: Function, errorCallBackFunction: Function)
    {
      this.get(jwtToken, apiUrl + `/event/get/joinSkateProfile/${eventId}/${currentSkateProfileId}`, callBackFunction, errorCallBackFunction, true)
    },
    leaveSkateProfileFromEvent: async function(jwtToken: string, currentSkateProfileId: string, eventId: string, callBackFunction: Function, errorCallBackFunction: Function)
    {
      this.get(jwtToken, apiUrl + `/event/get/leaveSkateProfile/${eventId}/${currentSkateProfileId}`, callBackFunction, errorCallBackFunction, true)
    },
    

    putSchedule: async function(jwtToken: string, scheduleIdToUpdate: string, updatedSchedule: Schedule, callBackFunction: Function, errorCallBackFunction: Function){
      this.put(jwtToken, apiUrl + "/schedule/put/schedule/" + scheduleIdToUpdate, updatedSchedule, callBackFunction, errorCallBackFunction)
    },

    putUser: async function(jwtToken: string, userIdToUpdate: string, updatedUser: User, callBackFunction: Function, errorCallBackFunction: Function){
      this.put(jwtToken, apiUrl + "/user/put/" + userIdToUpdate, updatedUser, callBackFunction, errorCallBackFunction)
    },

    putAssignedSkill: async function(jwtToken: string, assignedSkill: AssignedSkill, callBackFunction: Function, errorCallBackFunction: Function){
      this.put(jwtToken, `${apiUrl}/skill/put/assignedSkill`, assignedSkill, callBackFunction, errorCallBackFunction);
    },

    postUser: async function(jwtToken: string, user: User, callBackFunction: Function, errorCallBackFunction: Function){
      this.post(jwtToken, apiUrl + "/user/post", user, callBackFunction, errorCallBackFunction)
    },

    postSkateProfile: async function(jwtToken: string, skateProfile: SkateProfile, callBackFunction: Function, errorCallBackFunction: Function){
      this.post(jwtToken, apiUrl + "/skateProfile/post", skateProfile, callBackFunction, errorCallBackFunction);
    },

    postAssignedSkill: async function(jwtToken: string, assignedSkill: AssignedSkill, callBackFunction: Function, errorCallBackFunction: Function){
      this.post(jwtToken, `${apiUrl}/skill/post/assignedSkill`, assignedSkill, callBackFunction, errorCallBackFunction);
    },

    postAggresiveSkatingEvent: async function(jwtToken: string, aggresiveSkatingEvent: AggresiveEvent, callBackFunction: Function, errorCallBackFunction: Function){
      this.post(jwtToken, `${apiUrl}/event/postWithModifications`, aggresiveSkatingEvent, callBackFunction, errorCallBackFunction);
    },

    postSchedule: async function(jwtToken: string, schedule: Schedule, callBackFunction: Function, errorCallBackFunction: Function){
      this.post(jwtToken, `${apiUrl}/schedule/post/schedule`, schedule, callBackFunction, errorCallBackFunction);
    },

    post: async function(jwtToken: string, url: string, objectToPost: any, callBackFunction: Function, errorCallBackFunction: Function){
      if(commentOn)
      {
        console.log("POST; endpoint => " + url + "\nbody:\n" + JSON.stringify(objectToPost) + "\n");
      }
      try {
        const response = await fetch(url, 
        { method: 'POST',
          headers: {
            "Authorization": `Bearer ${jwtToken}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(objectToPost)
        })
      
        if (!response.ok) {
          errorCallBackFunction();
          throw new Error(`getSkills: HTTP error! Status: ${response.status}`);
        }
        else{
          const data = await response.json();
          if(commentOn)
          {
            console.log("POST; data returned:\n" + JSON.stringify(data) + "\n\n\n");
          }
          callBackFunction(data);
        }
      } catch (error) {
        if (error.message === 'Network request failed') {
          errorCallBackFunction();
          console.log('Network error occurred!');
        } else {
          errorCallBackFunction();
          console.error(`Error: ${error.message}`);
        }
      }
    },

    get: async function(JWTToken: string, url: string, callBackFunction: Function, errorCallBackFunction: Function, noDataExpected?: boolean) {
      console.log("\n\n\nUSING TOKEN: " + JWTToken + "\n\n\n")
      if(commentOn)
      {
        console.log("GET; endpoint => " + url + "\n");
      }
      try 
      {
        const response = await fetch(url, {
            headers: {
              "Authorization": `Bearer ${JWTToken}`,
              "Content-Type": "application/json"
            },
            method: "GET"
          });
      
        if (!response.ok) {
          errorCallBackFunction();
          throw new Error(`get: HTTP error! Status: ${response.status}`);   
        }
      
        if(noDataExpected === true)
        {
          callBackFunction(); 
        }
        else
        {
          const data = await response.json();
          if(commentOn)
          {
            console.log("GET; data returned:\n" + JSON.stringify(data) + "\n\n\n");
          }
          callBackFunction(data);
        }
      } 
      catch (error) {
        console.error(`Error: ${error.message}`);
        if (error.message === 'Network request failed') {
          errorCallBackFunction();
          console.log('Network error occurred!');
        } else {
          errorCallBackFunction();
          console.error(`Error: ${error.message}`);
        }
      }
    },

    getSuggestedSkateProfilesForEvent: async function(jwtToken: string, eventId: string, callBackFunction: Function, errorCallBackFunction: Function){
      this.get(jwtToken, `${apiUrl}/event/getSuggestedParticipants/${eventId}`, callBackFunction, errorCallBackFunction);
    },

    getSkateProfilesForEvent: async function(jwtToken: string, eventId: string, callBackFunction: Function, errorCallBackFunction: Function){
      this.get(jwtToken, `${apiUrl}/event/getParticipants/${eventId}`, callBackFunction, errorCallBackFunction);
    },

    getUser: async function(jwtToken: string, userId: string, callBackFunction: Function, errorCallBackFunction: Function){
      this.get(jwtToken, apiUrl + "/user/get/" + userId, callBackFunction, errorCallBackFunction);
    },

    getUserBasicInfo: async function(jwtToken: string, userId: string, callBackFunction: Function, errorCallBackFunction: Function){
      this.get(jwtToken, apiUrl + "/user/getBasicInfo/" + userId, callBackFunction, errorCallBackFunction);
    },

    getAllSkateProfiles: async function(jwtToken: string, callBackFunction: Function, errorCallBackFunction: Function){
      this.get(jwtToken, apiUrl + "/skateProfile/getAll", callBackFunction, errorCallBackFunction);
    },

    getAllParkTrails: async function(jwtToken: string, callBackFunction: Function, errorCallBackFunction: Function){
      this.get(jwtToken, apiUrl + "/trail/allParkTrails", callBackFunction, errorCallBackFunction);
    },

    getAllUsers: async function(jwtToken: string, callBackFunction: Function, errorCallBackFunction: Function){
      this.get(jwtToken, apiUrl + "/user/getAll", callBackFunction, errorCallBackFunction);
    },

    getSkills: async function(jwtToken: string, callBackFunction: Function, errorCallBackFunction: Function) {   
        this.get(jwtToken, apiUrl + "/skill/allSkills", callBackFunction, errorCallBackFunction);
    },

    getSkillRecommendations: async function(jwtToken: string, practiceStyle: SkatePracticeStyles, experience: SkateExperience, callBackFunction: Function, errorCallBackFunction: Function) {   
      const encodedPracticeStyle = encodeURIComponent(practiceStyle);
      const encodedExperience = encodeURIComponent(experience);
      this.get(jwtToken, `${apiUrl}/skill/skillRecomdations/${encodedPracticeStyle}/${encodedExperience}`, callBackFunction, errorCallBackFunction);
    },
    
    getRecommendedEventsForSkateProfile: async function(jwtToken: string, skateProfileId: string, callBackFunction: Function, errorCallBackFunction: Function){
      this.get(jwtToken, apiUrl + "/event/getRecommendedEvents/skateProfile/" + skateProfileId, callBackFunction, errorCallBackFunction);
    },

    getEventsForSkateProfile: async function(jwtToken: string, skateProfileId: string, callBackFunction: Function, errorCallBackFunction: Function){
      this.get(jwtToken, apiUrl + "/event/getEvents/skateProfile/" + skateProfileId, callBackFunction, errorCallBackFunction);
    },

    getLocation: async function(jwtToken: string, nameOfLocation: string, callBackFunction: Function, errorCallBackFunction: Function){
      this.get(jwtToken, apiUrl + "/location/" + nameOfLocation, callBackFunction, errorCallBackFunction);  
    },
};

export default Fetch;