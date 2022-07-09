import AsyncStorage from '@react-native-async-storage/async-storage';
import { date } from 'yup';
import * as ActionTypes from '../actionTypes';

export const getFood = (date) => async (dispatch) => {

    if(!date) {
        return;
    }

    console.log(await AsyncStorage.getItem('user_token'));
    fetch(`${process.env.BASE_URL}consumption/list/${date.toISOString()}`, {
        method: 'GET',
        headers: {
            //Header Defination
            'x-auth-token': await AsyncStorage.getItem('user_token')
        },
    }).then((response) => response.json())
        .then(async (responseJson) => {
            dispatch(addFoodToState(responseJson));
        })
        .catch((error) => {
            return { error: true };
        });
    
}

export const addFoodToState = (food) => {
    console.log("\n\n\n\n\n\n\n\n\n\n\n\n");
    console.log(food);
    return {
        type: ActionTypes.ADD_FOOD,
        payload: food
    }
}

export const addFood = async (food) => {
    let consumptionList = [];
    let breakfast = [];
    food.breakfast.forEach(element => {
        element.part = "breakfast";
        breakfast.push({ food: element });
    });

    let morning_snacks = []
    food.morning_snacks.forEach(element => {
        element.part = "morningSnacks";
        morning_snacks.push({ food: element });
    });

    let lunch = []
    food.lunch.forEach(element => {
        element.part = "lunch";
        lunch.push({ food: element });
    });

    let evening_snacks = []
    food.evening_snacks.forEach(element => {
        element.part = "eveningSnacks";
        evening_snacks.push({ food: element });
    });

    let dinner = []
    food.dinner.forEach(element => {
        element.part = "dinner";
        dinner.push({ food: element });
    });

    consumptionList.push({ breakfast: breakfast, morningSnacks: morning_snacks, lunch: lunch, eveningSnacks: evening_snacks, dinner: dinner })
    let date = food.date;
    fetch(`${process.env.BASE_URL}consumption/list`, {
        method: 'PUT',
        body: JSON.stringify({ date: date, consumptionList: consumptionList }),
        headers: {
            //Header Defination
            "Content-Type": "application/json",
            'x-auth-token': await AsyncStorage.getItem('user_token')
        },
    }).then((response) => response.json())
        .then(async (responseJson) => {
            console.log(responseJson);
            if (responseJson.status === 'success') {
                console.log(responseJson.msg);
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

export const addBreakfast = (food) => {

    console.log("\n\n\n\n\n\n\n\n\n\n");
    console.log(food);

    return {
        type: ActionTypes.ADD_FOOD_BREAKFAST,
        payload: food
    }
}

export const addMorningSnacks = (food) => {
    return {
        type: ActionTypes.ADD_FOOD_MORNING_SNACKS,
        payload: food
    }
}

export const addLunch = (food) => {
    return {
        type: ActionTypes.ADD_FOOD_LUNCH,
        payload: food
    }
}

export const addDinner = (food) => {
    return {
        type: ActionTypes.ADD_FOOD_DINNER,
        payload: food
    }
}

export const addEveningSnacks = (food) => {
    return {
        type: ActionTypes.ADD_FOOD_EVENING_SNACKS,
        payload: food
    }
}

export const addFoodItem = (food) => async (dispatch) => {
    dispatch(addFood(food));
}

export const addBreakfastItem = (food) => async (dispatch) => {
    dispatch(addBreakfast(food));
}

export const addMorningSnacksItem = (food) => async (dispatch) => {
    dispatch(addMorningSnacks(food));
}

export const addLunchItem = (food) => async (dispatch) => {
    dispatch(addLunch(food));
}

export const addEveningSnacksItem = (food) => async (dispatch) => {
    dispatch(addEveningSnacks(food));
}

export const addDinnerItem = (food) => async (dispatch) => {
    dispatch(addDinner(food));
}