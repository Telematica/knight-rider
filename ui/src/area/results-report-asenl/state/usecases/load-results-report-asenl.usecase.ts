import { Action, createAction, ActionFunctionAny } from 'redux-actions';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { mergeSaga } from 'src/redux-utils/merge-saga';
import { getResultReportsASENL } from '../../service/results-report-asenl.service';
import { resultsReportASENLReducer } from '../results-report-asenl.reducer';
import { pagingSelector } from '../results-report-asenl.selectors';

const postfix = '/app';
const LOAD_RESULTS_REPORT_ASENL = `LOAD_RESULTS_REPORT_ASENL${postfix}`;
const LOAD_RESULTS_REPORT_ASENL_SUCCESS = `LOAD_RESULTS_REPORT_ASENL_SUCCESS${postfix}`;
const LOAD_RESULTS_REPORT_ASENL_ERROR = `LOAD_RESULTS_REPORT_ASENL_ERROR${postfix}`;

export const loadResultsReportASENLAction: ActionFunctionAny<
  Action<any>
> = createAction(LOAD_RESULTS_REPORT_ASENL);
export const loadResultsReportASENLSuccessAction: ActionFunctionAny<
  Action<any>
> = createAction(LOAD_RESULTS_REPORT_ASENL_SUCCESS);
export const loadResultsReportASENLErrorAction: ActionFunctionAny<
  Action<any>
> = createAction(LOAD_RESULTS_REPORT_ASENL_ERROR);

function* loadResultsReportASENLWorker(action?: any): Generator<any, any, any> {
  try {
    const { per_page, page, order, order_by } = action.payload || {};
    const paging = yield select(pagingSelector);
    const options = {
      ...action.payload,
      per_page: per_page || paging.per_page,
      page: page || paging.page,
      pages: paging.pages,
      order: order || paging.order,
    };
    const result = yield call(getResultReportsASENL, options);
    yield put(
      loadResultsReportASENLSuccessAction({
        reports: result.data,
        paging: {
          count: parseInt(result.headers['x-soa-total-items'], 10) || 0,
          pages: parseInt(result.headers['x-soa-total-pages'], 10) || 0,
          page: page || paging.page,
          per_page: per_page || paging.per_page,
          order: order || paging.order,
          order_by: order_by || paging.order_by,
        },
      })
    );
  } catch (e) {
    yield put(loadResultsReportASENLErrorAction());
  }
}

function* loadResultsReportASENLWatcher(): Generator<any, any, any> {
  yield takeLatest(LOAD_RESULTS_REPORT_ASENL, loadResultsReportASENLWorker);
}

const resultsReportASENLReducerHandlers = {
  [LOAD_RESULTS_REPORT_ASENL]: (state: any) => {
    return {
      ...state,
      loading: true,
    };
  },
  [LOAD_RESULTS_REPORT_ASENL_SUCCESS]: (state: any, action: any) => {
    const { reports, paging } = action.payload;
    return {
      ...state,
      loading: false,
      reports,
      paging: {
        ...paging,
      },
    };
  },
  [LOAD_RESULTS_REPORT_ASENL_ERROR]: (state: any) => {
    return {
      ...state,
      loading: false,
      error: true,
    };
  },
};

mergeSaga(loadResultsReportASENLWatcher);
resultsReportASENLReducer.addHandlers(resultsReportASENLReducerHandlers);
