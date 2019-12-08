// NPM Dependencies
import { all, call, delay, put, take, takeLatest, fork, select, race } from 'redux-saga/effects';
import es6promise from 'es6-promise';
import 'isomorphic-unfetch';
import axios from 'axios';

es6promise.polyfill();

import {
    actionTypes,
    failure,
    replaceInvoiceStatus,
    startRealtimeInvoiceStatus,
    stopRealtimeInvoiceStatus,
    createFundedQuiz,
    replaceFundedQuiz
} from './actions'

function* createInvoiceSaga({ payload }) {
    try {
        const { amount, senderName, quizId } = payload;

        const response = yield call(
            axios.post,
            'https://api.lightning.gifts/create',
            { amount, senderName }
        );

        const data = response.data;

        yield put(replaceInvoiceStatus({ ...data, quizId }));

        yield put(startRealtimeInvoiceStatus({ chargeId: data.chargeId }));
        // yield put(startRealtimeInvoiceStatus({ orderId: data.orderId }));
    } catch (err) {
        console.log('err', err);
        yield put(failure(err))
    }
}

export function* startRealTimeCheckInvoiceStatusOnRequest({ payload }) {
    while (true) {
        try {
            const { chargeId } = payload;

            const response = yield call(axios.get, `https://api.lightning.gifts/status/${chargeId}`);

            const data = response.data;

            yield put(replaceInvoiceStatus(data));

            if (data.status === 'paid') {
                yield put(createFundedQuiz(data));
                yield put(stopRealtimeInvoiceStatus());
            }

            yield delay(5000);
        } catch (err) {
            console.log('err', err);
            yield put(failure(err));

            yield delay(15000);
        }
    }
}

function* startRealtimeInvoiceStatusSaga() {
    while (true) {
        const req = yield take(actionTypes.START_RT_CHECK_INVOICE_STATUS);

        yield race([
            call(startRealTimeCheckInvoiceStatusOnRequest, req),
            take(actionTypes.STOP_RT_CHECK_INVOICE_STATUS)
        ]);
    }
}

function* createNewFundedQuizSaga() {
    try {
        const invoiceStatus = yield select(state => state.invoiceStatus);
        console.log('invoiceStatus', invoiceStatus);
        const { quizId, orderId, amount } = invoiceStatus;

        const response = yield call(
            axios,
            {
                method: 'post',
                url: `http://138.68.239.62/fundedquiz/`,
                data: {
                    quiz: quizId,
                    complete: false,
                    percent_correct: "0",
                    amount,
                    lightning_gift_order_id: orderId,
                    redeemed: false
                },
                auth: {
                    username: 'guest',
                    password: 'boltathon'
                }
            });

        const data = response.data;

        console.log('rewe', data);
        yield put(replaceFundedQuiz(data));
    } catch (err) {
        console.log('err', err);
        yield put(failure(err));
    }
}

// function*

function* rootSaga() {
    yield all([
        takeLatest(actionTypes.CREATE_FUNDED_QUIZ, createNewFundedQuizSaga),
        takeLatest(actionTypes.CREATE_INVOICE, createInvoiceSaga),
        fork(startRealtimeInvoiceStatusSaga),
    ])
}

export default rootSaga
