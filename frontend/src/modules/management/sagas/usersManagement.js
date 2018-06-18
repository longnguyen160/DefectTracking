import { all, call, put, takeLatest } from 'redux-saga/effects';
import { BAN_USER } from '../actions/types';
import {
    // banUser,
    requestBanUser,
    banUserSuccess,
    banUserFailure
}from '../actions/usersManagement';
import API from '../../../utils/api';
import { getError } from '../../../utils/ultis';
import { showSuccessNotification } from '../../../components/notification/Notifications';


//ban user feaTURE
function* banUser({userId}){
    try {
        yield put(requestBanUser());
        const { data } = yield call(API.banUser, userId);
        //tra ve message
        yield put(banUserSuccess());
        showSuccessNotification(data.message);
    
    } catch (error){
        yield put(banUserFailure(getError((error))));
    }
}
function* watchBanUser(){
    yield takeLatest(BAN_USER, banUser);
}




export default function* UsersManagementFlow(){
    yield all ([
        watchBanUser()
    ]);
}
    
