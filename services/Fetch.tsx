import https from 'https';
import { Event, Location, Schedule, SkateExperience, SkatePracticeStyles, SkateProfile, SkatesType, SportName, User } from "../types";
import {basketUrl, tennisUrl} from '../assets/imageUrls'
import {apiUrl} from '../assets/apiUrl'
import { useSelector } from 'react-redux';

const Fetch = {
    
    put: async function(JWTToken: string, updatedObject: any, url: string, callBackFunction: Function, errorCallBackFunction: Function) {
      console.log("TRying the endpoint: " + JSON.stringify(url));
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

    putUser: function(userIdToUpdate: string, updatedUser: User, callBackFunction: Function, errorCallBackFunction: Function){
      const jwtToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImM4MjNkMWE0MTg5ZjI3NThjYWI4NDQ4ZmQ0MTIwN2ViZGZhMjVlMzkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaG9iYnlob3JzZS0xNjQ1OCIsImF1ZCI6ImhvYmJ5aG9yc2UtMTY0NTgiLCJhdXRoX3RpbWUiOjE2ODExMzQxNzMsInVzZXJfaWQiOiIyNlNYYTR6bXV0TlR3bzN0MXBRR3Y1TVlqWkoyIiwic3ViIjoiMjZTWGE0em11dE5Ud28zdDFwUUd2NU1ZalpKMiIsImlhdCI6MTY4MTEzNDE3MywiZXhwIjoxNjgxMTM3NzczLCJlbWFpbCI6InZwb3BAeWFob28uY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInZwb3BAeWFob28uY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.Jv4K-ZDOS5jGxjl5nBqs1CUJhJFUZo9qWLcMPQM3vQy3mTIEx9mVLkAS0ENp84R4Ymdhsp74ufkNpTFQ2BoG-lWs5a4YZiHqCS84dsG760DnAq6u5R9gm2PQNCbenF2Zge-oWqZvZQ4ImMGMvAVGpS-983zeCDgMCsdwYPivSM3JVovZ6u5O2O9Makl1bSH-Brzvxoc5jXyGsaVING7E1puq7EY6FgMxE6D2nTDjM9W3fxi47qFA8uovtlSaxCPF8wsU6TYA3ykaTDLo3SGEpI2qHA6o-pUyWoLEAYM8Xuk7RfqveixXkXiih9lhHxRH9zaTcXi8gnxA_pB9ufKO0Q";
      this.put(jwtToken, updatedUser, apiUrl + "/user/put/" + userIdToUpdate, callBackFunction, errorCallBackFunction)
    },

    postUser: async function(user: User, callBackFunction: Function){
      const jwtToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImM4MjNkMWE0MTg5ZjI3NThjYWI4NDQ4ZmQ0MTIwN2ViZGZhMjVlMzkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaG9iYnlob3JzZS0xNjQ1OCIsImF1ZCI6ImhvYmJ5aG9yc2UtMTY0NTgiLCJhdXRoX3RpbWUiOjE2ODExMzQxNzMsInVzZXJfaWQiOiIyNlNYYTR6bXV0TlR3bzN0MXBRR3Y1TVlqWkoyIiwic3ViIjoiMjZTWGE0em11dE5Ud28zdDFwUUd2NU1ZalpKMiIsImlhdCI6MTY4MTEzNDE3MywiZXhwIjoxNjgxMTM3NzczLCJlbWFpbCI6InZwb3BAeWFob28uY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInZwb3BAeWFob28uY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.Jv4K-ZDOS5jGxjl5nBqs1CUJhJFUZo9qWLcMPQM3vQy3mTIEx9mVLkAS0ENp84R4Ymdhsp74ufkNpTFQ2BoG-lWs5a4YZiHqCS84dsG760DnAq6u5R9gm2PQNCbenF2Zge-oWqZvZQ4ImMGMvAVGpS-983zeCDgMCsdwYPivSM3JVovZ6u5O2O9Makl1bSH-Brzvxoc5jXyGsaVING7E1puq7EY6FgMxE6D2nTDjM9W3fxi47qFA8uovtlSaxCPF8wsU6TYA3ykaTDLo3SGEpI2qHA6o-pUyWoLEAYM8Xuk7RfqveixXkXiih9lhHxRH9zaTcXi8gnxA_pB9ufKO0Q";
      this.post(jwtToken, apiUrl + "/user/post", user, callBackFunction, () => console.log("[postuser]: No error callback provided"))
    },

    post: async function(jwtToken: string, url: string, objectToPost: any, callBackFunction: Function, errorCallBackFunction: Function){
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
      
        const data = await response.json();
        callBackFunction(data);

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

    get: async function(JWTToken: string, url: string, callBackFunction: Function, errorCallBackFunction: Function) {
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
      
        const data = await response.json();
        callBackFunction(data);
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

    getUser: async function(userId: string, callBackFunction: Function, errorCallBackFunction: Function){
      const jwtToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImM4MjNkMWE0MTg5ZjI3NThjYWI4NDQ4ZmQ0MTIwN2ViZGZhMjVlMzkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaG9iYnlob3JzZS0xNjQ1OCIsImF1ZCI6ImhvYmJ5aG9yc2UtMTY0NTgiLCJhdXRoX3RpbWUiOjE2ODExMzQxNzMsInVzZXJfaWQiOiIyNlNYYTR6bXV0TlR3bzN0MXBRR3Y1TVlqWkoyIiwic3ViIjoiMjZTWGE0em11dE5Ud28zdDFwUUd2NU1ZalpKMiIsImlhdCI6MTY4MTEzNDE3MywiZXhwIjoxNjgxMTM3NzczLCJlbWFpbCI6InZwb3BAeWFob28uY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInZwb3BAeWFob28uY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.Jv4K-ZDOS5jGxjl5nBqs1CUJhJFUZo9qWLcMPQM3vQy3mTIEx9mVLkAS0ENp84R4Ymdhsp74ufkNpTFQ2BoG-lWs5a4YZiHqCS84dsG760DnAq6u5R9gm2PQNCbenF2Zge-oWqZvZQ4ImMGMvAVGpS-983zeCDgMCsdwYPivSM3JVovZ6u5O2O9Makl1bSH-Brzvxoc5jXyGsaVING7E1puq7EY6FgMxE6D2nTDjM9W3fxi47qFA8uovtlSaxCPF8wsU6TYA3ykaTDLo3SGEpI2qHA6o-pUyWoLEAYM8Xuk7RfqveixXkXiih9lhHxRH9zaTcXi8gnxA_pB9ufKO0Q";  
      this.get(jwtToken, apiUrl + "/user/get/" + userId, callBackFunction, errorCallBackFunction);
    },

    getSkills: async function(callBackFunction: Function, errorCallBackFunction: Function) {   
        const jwtToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImM4MjNkMWE0MTg5ZjI3NThjYWI4NDQ4ZmQ0MTIwN2ViZGZhMjVlMzkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaG9iYnlob3JzZS0xNjQ1OCIsImF1ZCI6ImhvYmJ5aG9yc2UtMTY0NTgiLCJhdXRoX3RpbWUiOjE2ODExMzQxNzMsInVzZXJfaWQiOiIyNlNYYTR6bXV0TlR3bzN0MXBRR3Y1TVlqWkoyIiwic3ViIjoiMjZTWGE0em11dE5Ud28zdDFwUUd2NU1ZalpKMiIsImlhdCI6MTY4MTEzNDE3MywiZXhwIjoxNjgxMTM3NzczLCJlbWFpbCI6InZwb3BAeWFob28uY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInZwb3BAeWFob28uY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.Jv4K-ZDOS5jGxjl5nBqs1CUJhJFUZo9qWLcMPQM3vQy3mTIEx9mVLkAS0ENp84R4Ymdhsp74ufkNpTFQ2BoG-lWs5a4YZiHqCS84dsG760DnAq6u5R9gm2PQNCbenF2Zge-oWqZvZQ4ImMGMvAVGpS-983zeCDgMCsdwYPivSM3JVovZ6u5O2O9Makl1bSH-Brzvxoc5jXyGsaVING7E1puq7EY6FgMxE6D2nTDjM9W3fxi47qFA8uovtlSaxCPF8wsU6TYA3ykaTDLo3SGEpI2qHA6o-pUyWoLEAYM8Xuk7RfqveixXkXiih9lhHxRH9zaTcXi8gnxA_pB9ufKO0Q";
        this.get(jwtToken, apiUrl + "/skill/allSkills", callBackFunction, errorCallBackFunction);
    },
    
    getRecommendedEvents: function(){
       
    },

    getLocation: function(nameOfLocation: string, callBackFunction: Function, errorCallBackFunction: Function){
      const jwtToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImM4MjNkMWE0MTg5ZjI3NThjYWI4NDQ4ZmQ0MTIwN2ViZGZhMjVlMzkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaG9iYnlob3JzZS0xNjQ1OCIsImF1ZCI6ImhvYmJ5aG9yc2UtMTY0NTgiLCJhdXRoX3RpbWUiOjE2ODExMzQxNzMsInVzZXJfaWQiOiIyNlNYYTR6bXV0TlR3bzN0MXBRR3Y1TVlqWkoyIiwic3ViIjoiMjZTWGE0em11dE5Ud28zdDFwUUd2NU1ZalpKMiIsImlhdCI6MTY4MTEzNDE3MywiZXhwIjoxNjgxMTM3NzczLCJlbWFpbCI6InZwb3BAeWFob28uY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInZwb3BAeWFob28uY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.Jv4K-ZDOS5jGxjl5nBqs1CUJhJFUZo9qWLcMPQM3vQy3mTIEx9mVLkAS0ENp84R4Ymdhsp74ufkNpTFQ2BoG-lWs5a4YZiHqCS84dsG760DnAq6u5R9gm2PQNCbenF2Zge-oWqZvZQ4ImMGMvAVGpS-983zeCDgMCsdwYPivSM3JVovZ6u5O2O9Makl1bSH-Brzvxoc5jXyGsaVING7E1puq7EY6FgMxE6D2nTDjM9W3fxi47qFA8uovtlSaxCPF8wsU6TYA3ykaTDLo3SGEpI2qHA6o-pUyWoLEAYM8Xuk7RfqveixXkXiih9lhHxRH9zaTcXi8gnxA_pB9ufKO0Q";  
      this.get(jwtToken, apiUrl + "/location/" + nameOfLocation, callBackFunction, errorCallBackFunction);  
    },
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

};

export default Fetch;