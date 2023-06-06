import { API_URL } from './api_url';
import { Buffer } from 'buffer'

// ------------------------------------------------------------------------------------------------
    // SIGN UP
// ------------------------------------------------------------------------------------------------

export const createNewUser = async (newUser) => {
    const url = API_URL + '/signup'
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({ "user": newUser})
    };
    
    let response = await fetch(url, fetchOptions)
   
    if (!response.ok) {
        const error = await response.json()
        return {error: true, code: error.status.code, message: error.status.message}

    } else {
        const auth = response.headers.get('Authorization').split(' ')[1]
        localStorage.setItem("petsJWT", JSON.stringify({token: auth, user: newUser.email}))
        return response.json()
    }
}

// ------------------------------------------------------------------------------------------------
    // LOG IN
// ------------------------------------------------------------------------------------------------

export const logUserIn = async (loginDetails) => {
    const url = API_URL + "/login"
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({"user": loginDetails})
    };

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        const error = await response.json()
        return error

    } else {
        const auth = response.headers.get('Authorization').split(' ')[1]
        localStorage.setItem("petsJWT", JSON.stringify({token: auth, user: loginDetails.email}))
        return response.json()
    }
}

// ------------------------------------------------------------------------------------------------
    //LOG OUT
// ------------------------------------------------------------------------------------------------

export const logUserOut = async () => {
    const url = API_URL + "/logout"
    const token = JSON.parse(localStorage.getItem('petsJWT'))

    const fetchOptions = {
        method: "DELETE",
        headers: {
                   'Content-Type': 'application/json',
                   'Authorization': 'Bearer ' + token.token
                  }}

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        const error = await response.json()
        return {error: true, code: error.status.code, message: error.status.message}

    } else {
        return response.json()
    }
}

// ------------------------------------------------------------------------------------------------
    //DELETE USER
// ------------------------------------------------------------------------------------------------

export const deleteAccount = async (user_id) => {
    const url = API_URL + `/users/${user_id}`
    const token = JSON.parse(localStorage.getItem('petsJWT'))
  
    const fetchOptions = {
        method: "DELETE",
        headers: {
                   'Content-Type': 'application/json',
                   'Authorization': 'Bearer ' + token.token
                  }}

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        const error = await response.json()
        return {error: true, code: error.status.code, message: error.status.message}

    } else {
        return response.json()
    }
}




// ------------------------------------------------------------------------------------------------
    // GET CURRENT USER DATA
// ------------------------------------------------------------------------------------------------

export const getCurrentUser = async () => {
    const url = API_URL + "/current_user"
    const token = JSON.parse(localStorage.getItem('petsJWT'))

    const fetchOptions = {
        method: "GET",
        headers: {
                   'Content-Type': 'application/json',
                   'Authorization': 'Bearer ' + token.token
                  }}

    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
        const error = await response.json()
        return {error: true, code: error.status.code, message: error.status.message}

    } else {
        return response.json()
    }
    
}

// ------------------------------------------------------------------------------------------------
    // AUTHENTICATION: CHECK IF TOKEN IS EXPIRED
// ------------------------------------------------------------------------------------------------

const decodeToken = (token) => {

    const base64String = token.split('.')[1];
    const decodedValue = JSON.parse(Buffer.from(base64String, 'base64').toString('ascii'));
    return decodedValue;

}

const checkTokenExp = (token_exp) => {
  const currentTime = Math.round(Date.now()/1000)
  return (currentTime < token_exp)

}

export const authenticateUser = () => {
const token = JSON.parse(localStorage.getItem('petsJWT'))

 if ((token !== null && token !== undefined)) {
   const payload = decodeToken(token.token)

   if (payload !== null && payload !== undefined) {
     const userIsAuthenticated = checkTokenExp(payload.exp)
     return userIsAuthenticated
   }
 }
}












    // -----------------------------------------------------------
        //With Devise
    // -----------------------------------------------------------

        // async function retrieveCurrentUserFromAPI() {

    //     if (token) {
    //         const url = 'http://localhost:4000/current_user/info'
        
    //         const fetchOptions = {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': 'Bearer ' + token
    //         }}

    //         const newUser = await fetch(url, fetchOptions).then(res => res.json())
    //         return newUser

    //     } else {
    //         console.log('no token')
    //         return null
    //     }

    // }




    // ------------------------------------------------------------------------------------------
        ///backend api without devise: project4-rails-api
        //API_URL = "http://project4-rails-api.herokuapp.com"
    // -------------------------------------------------------------------------------------------

    // const createNewUser = async (newUser) => {
    //     const url = API_URL + "/users"
    //     const fetchOptions = {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Accept": "application/json"
    //         },
    //         body: JSON.stringify(newUser)
    //     };

    //     const response = await fetch(url, fetchOptions);
        
    //     if (!response.ok) {
    //         const errorMessage = await response.text();
    //         throw new Error(errorMessage);
    //     }
    //     return response.json();
    // }