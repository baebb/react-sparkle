export const actionTypes = {
    FAILURE: 'FAILURE',
    ADD_CORRECT_QUESTION: 'ADD_CORRECT_QUESTION',
    RESET_CORRECT_QUESTIONS: 'RESET_CORRECT_QUESTIONS'
};

export function addCorrectQuestion(data) {
    return {
        type: actionTypes.ADD_CORRECT_QUESTION,
        data,
    }
}

export function resetCorrectQuestions() {
    return { type: actionTypes.RESET_CORRECT_QUESTIONS }
}

export function failure(error) {
    return {
        type: actionTypes.FAILURE,
        error,
    }
}
