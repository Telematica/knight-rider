import { Action, createAction, ActionFunctionAny } from 'redux-actions';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { mergeSaga } from 'src/redux-utils/merge-saga';
import { getObservations } from 'src/area/observations-asf/service/observations-asf.service';
import { resultsReportReducer } from '../results-report.reducer';
import {
  pagingPreObsSelector,
  observationPreAuditIdSelector,
} from '../results-report.selectors';

const postfix = '/app';
const LOAD_PRE_OBSERVATIONS = `LOAD_PRE_OBSERVATIONS${postfix}`;
const LOAD_PRE_OBSERVATIONS_SUCCESS = `LOAD_PRE_OBSERVATIONS_SUCCESS${postfix}`;
const LOAD_PRE_OBSERVATIONS_ERROR = `LOAD_PRE_OBSERVATIONS_ERROR${postfix}`;
// const LOAD_PRE_OBSERVATIONS_RESET = `LOAD_PRE_OBSERVATIONS_RESET${postfix}`;

export const loadPreObservationsAction: ActionFunctionAny<
  Action<any>
> = createAction(LOAD_PRE_OBSERVATIONS);
export const loadPreObservationsSuccessAction: ActionFunctionAny<
  Action<any>
> = createAction(LOAD_PRE_OBSERVATIONS_SUCCESS);
export const loadPreObservationsErrorAction: ActionFunctionAny<
  Action<any>
> = createAction(LOAD_PRE_OBSERVATIONS_ERROR);
/*
export const loadPreObservationsResetAction: ActionFunctionAny<
  Action<any>
> = createAction(LOAD_PRE_OBSERVATIONS_RESET);
*/

function* loadPreObservationsWorker(action?: any): Generator<any, any, any> {
  try {
    const {
      per_page,
      page,
      order,
      order_by,
      auditoria_id,
      id,
      loadMore,
      observacion_pre_id,
    } = action.payload || {};
    const paging = yield select(pagingPreObsSelector);
    const audit_id = yield select(observationPreAuditIdSelector);
    const options = {
      ...action.payload,
      per_page: per_page || paging.per_page,
      page:
        auditoria_id === audit_id
          ? (page || paging.page) + (loadMore ? 1 : 0)
          : 1,
      pages: paging.pages,
      order: order || paging.order,
      ...(auditoria_id ? { auditoria_id } : {}),
      ...(id ? { id } : {}),
    };
    const result = yield call(getObservations, options);
    yield put(
      loadPreObservationsSuccessAction({
        observacion_pre_id,
        observations: result.data,
        paging: {
          count: parseInt(result.headers['x-soa-total-items'], 10) || 0,
          pages: parseInt(result.headers['x-soa-total-pages'], 10) || 0,
          page:
            auditoria_id === audit_id
              ? (page || paging.page) + (loadMore ? 1 : 0)
              : 1,
          per_page: per_page || paging.per_page,
          order: order || paging.order,
          order_by: order_by || paging.order_by,
        },
        ...(auditoria_id ? { auditoria_id } : {}),
        ...(id ? { id } : {}),
        newSearch: auditoria_id !== audit_id,
      })
    );
  } catch (e) {
    console.log(e);
    yield put(loadPreObservationsErrorAction(e));
  }
}

function* loadResultsReportWatcher(): Generator<any, any, any> {
  yield takeLatest(LOAD_PRE_OBSERVATIONS, loadPreObservationsWorker);
}

const resultsReportReducerHandlers = {
  /*
  [LOAD_PRE_OBSERVATIONS_RESET]: (state: any, action: any) => {
    const { observacion_pre_id } = action.payload;
    return {
      ...state,
      observacion_pre: {
        paging: {
          count: 0,
          pages: 0,
          page: 1,
          per_page: 5,
          order: 'asc',
          order_by: 'id',
        },
        auditoria_id: 0,
        error: null,
        loading: false,
        observations: state.observacion_pre.observations.find(
          (item: any) => item.id === observacion_pre_id
        )
          ? [
              state.observacion_pre.observations.find(
                (item: any) => item.id === observacion_pre_id
              ),
            ]
          : [],
      },
    };
  },
  */
  [LOAD_PRE_OBSERVATIONS]: (state: any) => {
    return {
      ...state,
      observacion_pre: {
        ...state.observacion_pre,
        loading: true,
      },
    };
  },
  [LOAD_PRE_OBSERVATIONS_SUCCESS]: (state: any, action: any) => {
    const {
      observations,
      paging,
      auditoria_id,
      newSearch,
      observacion_pre_id,
    } = action.payload;
    // Current Observation selected on dropdown
    const currentObservation = state.observacion_pre.observations.length
      ? [
          state.observacion_pre.observations.find(
            (item: any) =>
              parseInt(item.id, 10) === parseInt(observacion_pre_id, 10)
          ),
        ]
      : [];
    // Current Observation selected on dropdown (same to avoid ternary operator nesting)
    const selectedOption =
      state.observacion_pre.observations.length && observacion_pre_id
        ? currentObservation
        : [];
    return {
      ...state,
      observacion_pre: {
        ...state.observacion_pre,
        auditoria_id,
        error: false,
        loading: false,
        observations: [
          ...(newSearch ? selectedOption : state.observacion_pre.observations),
          ...observations,
        ],
        paging: {
          ...paging,
        },
      },
    };
  },
  [LOAD_PRE_OBSERVATIONS_ERROR]: (state: any, action: any) => {
    return {
      ...state,
      observacion_pre: {
        ...state.observacion_pre,
        loading: false,
        error: action.payload,
      },
    };
  },
};

mergeSaga(loadResultsReportWatcher);
resultsReportReducer.addHandlers(resultsReportReducerHandlers);
