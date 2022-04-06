import { call, put, takeLatest, all } from 'redux-saga/effects';
import snackbarActions from '/containers/shared/SnackbarContainer/actions';
import { push } from 'connected-next-router';
import requestHelper from '/helpers/requestHelper';

import tgpApi from '/api/tgpApi';
import types from './constants';
import actions from './actions';
import { getCookie } from '/helpers/cookieHelper';


export default function* saga() {

}
