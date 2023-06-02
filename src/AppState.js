// import React from "react";
// import { createContext, useContext, useReducer } from "react";



// export const initialState = {
//     url: "http://project4-rails-api.herokuapp.com",
//     token: null,
//     username: null,
//     user_id: null
// }


// const reducer = (state, action) => {
//     switch (action.type) {              //action = {type: "", payload: ""}
//           case "signup":
//             fetch(state.url + "/users", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(action.payload)
//                 .then(response => response.json())
//                 .then(user => {
//                     return {
//                         ...state,
//                         token: user.token,
//                         username: user.username,
//                         user_id: user.id
//                     }
//                 })
//             })
//             break;
//             case "login":
//                 fetch(state.url + "/users/login/", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json"
//                     },
//                     body: JSON.stringify(action.payload)
//                     .then(response => response.json())
//                     .then(user => {
                        
//                         return {
//                             ...state,
//                             token: user.token,
//                             username: user.username,
//                             user_id: user.id
//                         }
//                     })
//                 })
//             break;
//             default:
//                 return state;
//         }
// }

// const AppContext = createContext(null);

// export const AppState = (props) => {
//     const [state, dispatch] = useReducer(reducer, initialState);
//         return (
//            <AppContext.Provider value={[state, dispatch]}>
//                 {props.children}
//            </AppContext.Provider>
//         )
// }

// export const useAppState = () => {
//     return useContext(AppContext)
// }

