import * as ActionTypes from './actionTypes';

export const Food = (state = {
    breakfast: [],
    morning_snacks: [],
    lunch: [],
    evening_snacks: [],
    dinner: [],
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_FOOD:
            return {
                ...state,
                breakfast: action.payload.breakfast,
                morning_snacks: action.payload.morning_snacks,
                lunch: action.payload.lunch,
                evening_snacks: action.payload.evening_snacks,
                dinner: action.payload.dinner,
            };
        case ActionTypes.ADD_FOOD_BREAKFAST:
            return {
                ...state,
                breakfast: state.breakfast.concat(action.payload),
            };
        case ActionTypes.ADD_FOOD_MORNING_SNACKS:
            return {
                ...state,
                morning_snacks: state.morning_snacks.concat(action.payload),
            };
        case ActionTypes.ADD_FOOD_LUNCH:
            return {
                ...state,
                lunch: state.lunch.concat(action.payload),
            };
        case ActionTypes.ADD_FOOD_EVENING_SNACKS:
            return {
                ...state,
                evening_snacks: state.evening_snacks.concat(action.payload),
            };
        case ActionTypes.ADD_FOOD_DINNER:
            return {
                ...state,
                dinner: state.dinner.concat(action.payload),
            };
        default:
            return state
    }
}