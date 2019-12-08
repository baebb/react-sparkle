// Local Dependencies
import { actionTypes } from './actions'

export const exampleInitialState = {
    error: false,
    correctQuestions: [],
    invoiceStatus: {},
    fundedQuiz: {}
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

        case actionTypes.REPLACE_INVOICE_STATUS:
            return {
                ...state,
                invoiceStatus: { ...state.invoiceStatus, ...action.data }
            };

        case actionTypes.REPLACE_FUNDED_QUIZ:
            return {
                ...state,
                fundedQuiz: action.data
            };

        default:
            return state
    }
}

export default reducer
