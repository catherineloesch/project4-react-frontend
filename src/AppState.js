import React from "react";

const initialState = {
    url: "http://project4-rails-api.herokuapp.com/",
}

const reducer = (state, action) => {
    switch (action.type) {
          
            default:
                return state;
        }
}

const AppContext = React.createContext(null);

export const AppState = (props) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
        return (
           <AppContext.Provider value={[state, dispatch]}>
           {props.children}
           </AppContext.Provider>
        )
}

export const useAppState = () => {
    return React.useContext(AppContext);
}

