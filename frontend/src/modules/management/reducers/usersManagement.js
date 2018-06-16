
import {
    REQUEST_BAN_USER,
    BAN_USER_SUCCESS,
    BAN_USER_FAILURE 
} from '../actions/types';



const initialState = {
    usersManagement: [],
    isLoading: false,
    error: null,
  };

export default function usersManagement(state=initialState,action){
    switch(action.type){

        case REQUEST_BAN_USER:
            return Object.assign({}, state, {
            isLoading: true
            });


        case BAN_USER_SUCCESS:
            return Object.assign({}, state, {
            isLoading: false
            });

        case BAN_USER_FAILURE:
            return Object.assign({}, state, {
            error: action.error
            });

         default: 
            return state;   
    }
}



