import React, {createContext, useReducer} from 'react';

const defaultValue = {
    message: {open: false, variant: 'success', content: ``, direction: 1000},
    breadcrumb: [],
};

export const Store = createContext(defaultValue);

const reducer = (state, action) => {
    switch(action.type) {
        case 'message':
            return {...state, message: action.payload};
        case 'breadcrumb':
            return {...state, breadcrumb: action.payload};
        case 'responsive':
            return {...state, responsive: action.payload};
        default:
            return state
    }
}


const StoreProvider = props => {
    const [store, dispatch] = useReducer(reducer, defaultValue);
    return (
        <Store.Provider value={{...store, dispatch}}>
            {props.children}
        </Store.Provider>
    );
};
export default StoreProvider;