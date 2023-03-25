const Authentication = {

    loginCredentialsValid: function(email: string | undefined, password: string | undefined){
        if(email != undefined && password != undefined)
            return true;
        else return false;
    }
   
};

export default Authentication;