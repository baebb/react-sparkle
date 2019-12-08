// Local Dependencies
import { actionTypes } from './actions'

export const exampleInitialState = {
    error: false,
    correctQuestions: []
};

function reducer(state = exampleInitialState, action) {
    switch (action.type) {

        case actionTypes.ADD_CORRECT_QUESTION:
            return {
                ...state,
                ...{ correctQuestions: [ ...state.correctQuestions, action.data] }
            };

        case actionTypes.RESET_CORRECT_QUESTIONS:
            return {
                ...state,
                ...{ correctQuestions: [] }
            };

        default:
            return state
    }
}

export default reducer
