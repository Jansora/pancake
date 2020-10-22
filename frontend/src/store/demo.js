import React, {createContext, useReducer} from 'react';

export const defaultValue = {};

export const GlobalStore = createContext(defaultValue);

const reducer = (state, action) => {
    return {...state, ...action};
}


const StoreProvider = props => {
    const [store, dispatch] = useReducer(reducer, defaultValue);
    return (
        <GlobalStore.Provider value={{...store, dispatch}}>
            {props.children}
        </GlobalStore.Provider>
    );
};
export default StoreProvider;
