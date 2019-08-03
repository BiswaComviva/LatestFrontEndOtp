import axios from 'axios';
 
export const getUser = userid => {
        const body = {
            "userid" : userid
        } 
        return   axios.post( 'http://localhost:4000/otps', body , {
            headers: {
              'content-type': 'application/json',
            },
          })
            .then(response =>  {
                if(response.data){
                    
                    return response.data;
                }
                })
            .catch(error => {
              console.log(error);
            })
    }

    export const validateOtp = (userid , otp) => {
        const body = {
            "userid" : userid
        } 
        return   axios.post( 'http://localhost:4000/otps/'+otp, body , {
            headers: {
              'content-type': 'application/json',
            },
          })
            .then(response =>  {
                if(response.data){
                    return response.data;
                } else {
                        return null;
                    }
                })
            .catch(error => {
              console.log(error);
            })
    }

    export const logOut = (userid) => {
        return   axios.get( 'http://localhost:4000/otps/logout/'+userid ,{
            headers: {
              'content-type': 'application/json',
            },
          }).then(response =>  {
            if(response.data){
                return response.data;
            } else {
                    return null;
                }
            })
        .catch(error => {
          console.log(error);
        })
    }

export default {getUser , validateOtp , logOut};