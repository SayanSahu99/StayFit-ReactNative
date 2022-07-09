import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import * as ActionTypes from '../actionTypes';


export const addHealth = (health) => {
    return {
        type: ActionTypes.ADD_HEALTH_DETAILS,
        payload: health
    }
}

export const addHealthDatabase = (health, uid) => async (dispatch) => {

    const obj = {
        activity: health.activity,
        age: parseInt(health.age),
        current_weight: parseFloat(health.weight),
        current_height: parseFloat(health.height),
        gender: health.gender,
        medical: health.medical,
    }

    fetch(`${process.env.BASE_URL}profile`, {
        method: 'POST',
        body: JSON.stringify(health),
        headers: {
            //Header Defination
            "Content-Type": "application/json",
            'x-auth-token': await AsyncStorage.getItem('user_token')
        },
    }).then((response) => response.json())
        .then(async (responseJson) => {
            console.log(responseJson);
            // If Profile Data added
            if (responseJson.status === 'success') {
                console.log("Health Added");
                dispatch(addHealth(obj));
            }
            else {
                var errmess = new Error(responseJson.msg);
                throw errmess;
            }
        })
        .catch((error) => {
            return { error: true };
        });
}