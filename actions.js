export const actionTypes = {
    FAILURE: 'FAILURE',
    ADD_CORRECT_QUESTION: 'ADD_CORRECT_QUESTION',
    RESET_CORRECT_QUESTIONS: 'RESET_CORRECT_QUESTIONS',
    CREATE_INVOICE: 'CREATE_INVOICE',
    REPLACE_INVOICE_STATUS: 'REPLACE_INVOICE_STATUS',
    START_RT_CHECK_INVOICE_STATUS: 'START_RT_CHECK_INVOICE_STATUS',
    STOP_RT_CHECK_INVOICE_STATUS: 'STOP_RT_CHECK_INVOICE_STATUS'
};

export function startRealtimeInvoiceStatus(data) {
    return {
        type: actionTypes.START_RT_CHECK_INVOICE_STATUS,
        payload: data
    };
}

export function stopRealtimeInvoiceStatus() {
    return {
        type: actionTypes.STOP_RT_CHECK_INVOICE_STATUS
    };
}

export function createInvoice(data) {
    return {
        type: actionTypes.CREATE_INVOICE,
        payload: data
    };
}

export function replaceInvoiceStatus(data) {
    return {
        type: actionTypes.REPLACE_INVOICE_STATUS,
        data
    };
}

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
