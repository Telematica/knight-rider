import { Action, createAction, ActionFunctionAny } from 'redux-actions';
import { call, put, /*select, */ takeLatest } from 'redux-saga/effects';
import { mergeSaga } from 'src/redux-utils/merge-saga';
import { getReports } from '../../service/reports.service';
import { results53Reducer } from '../reports.reducer';
// import { pagingSelector } from '../results-report.selectors';

const postfix = '/app';
const LOAD_REPORTS = `LOAD_REPORTS${postfix}`;
const LOAD_REPORTS_SUCCESS = `LOAD_REPORTS_SUCCESS${postfix}`;
const LOAD_REPORTS_ERROR = `LOAD_REPORTS_ERROR${postfix}`;

export const loadReportsAction: ActionFunctionAny<
  Action<any>
> = createAction(LOAD_REPORTS);
export const loadReportsSuccessAction: ActionFunctionAny<
  Action<any>
> = createAction(LOAD_REPORTS_SUCCESS);
export const loadReportsActionErrorAction: ActionFunctionAny<
  Action<any>
> = createAction(LOAD_REPORTS_ERROR);

function* loadResultsReportWorker(action?: any): Generator<any, any, any> {
  try {
    // const { per_page, page, order, order_by } = action.payload || {};
    // const paging = yield select(pagingSelector);
    /*
    const options = {
      ...action.payload,
      per_page: per_page || paging.per_page,
      page: page || paging.page,
      pages: paging.pages,
      order: order || paging.order,
    };
    */
    const result = yield call(getReports, {});
    console.log(result.data);
    yield put(loadReportsSuccessAction(result.data));
  } catch (e) {
    yield put(loadReportsActionErrorAction());
  }
}

function* loadResultsReportWatcher(): Generator<any, any, any> {
  yield takeLatest(LOAD_REPORTS, loadResultsReportWorker);
}

const resultsReportReducerHandlers = {
  [LOAD_REPORTS]: (state: any) => {
    return {
      ...state,
      loading: true,
    };
  },
  [LOAD_REPORTS_SUCCESS]: (state: any, action: any) => {
    return {
      ...state,
      loading: false,
      report53: action.payload,
    };
  },
  [LOAD_REPORTS_ERROR]: (state: any) => {
    return {
      ...state,
      loading: false,
      error: true,
    };
  },
};

mergeSaga(loadResultsReportWatcher);
results53Reducer.addHandlers(resultsReportReducerHandlers);
