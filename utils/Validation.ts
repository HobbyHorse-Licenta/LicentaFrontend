import { CreateScheduleState } from "../redux/createScheduleState";
import uiUtils from "./UI";
class Validation {

    // areAllFieldsDefinedAndNotNull(object: CreateScheduleState) : boolean {
    //     return Object.values(object).every(value => value !== undefined && value !== null);
    // }

    isDefined(variable: any): boolean {
        if(Array.isArray(variable))
        {
            if(variable.length == 0)
                return false;
        }
        if(variable == undefined)
            return false
        if(variable == null)
            return false;
        return true;
    }

    validateEmail(email: string | undefined): boolean {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(email !== undefined)
            return emailPattern.test(email);
        else return false;
    }

    validatePassword(password: string | null | undefined): boolean {
        if(password === null || password === undefined)
            return false;
        if (password.length >= 6) {
            return true;
        } else {
            return false;
        }
    };

    validateEmailAndPassword = (email: string | undefined, password: string | undefined, isForSignUp: boolean ) : boolean => {     
        if(!validation.validateEmail(email))
        {
           uiUtils.showPopUp("Error", "Invalid Email 😀");
           uiUtils.showPopUp("Error", "Invalid Email 😀");
            return false
        }
        if(!validation.validatePassword(password))
        {
            if(isForSignUp)
                uiUtils.showPopUp("Error", "Invalid Password. Password should be at least 6 characters long 😀");
            else uiUtils.showPopUp("Error", "Your password is at least 6 characters long😀");
            return false
        }
        return true;
    };
    validateName = (typedName) : boolean => {
        const only30LettersRegex = /^[A-Za-z ]{1,25}$/;
        return only30LettersRegex.test(typedName)
    };
    validateShortDescription = (shortDescription) : boolean => {
        const descriptionTextRegex = /^[A-Za-z0-9 .,:;'""!?-]{1,200}$/;
        return descriptionTextRegex.test(shortDescription);
    };
 

}
    const validation = new Validation();
    export default validation;
  
  
  
  
  