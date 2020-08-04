import { createSelector } from 'reselect';
import { results53Reducer } from './reports.reducer';

const sliceSelector = (state: any) => state[results53Reducer.sliceName];

export const report53Selector = createSelector(
  sliceSelector,
  (slice: any) => slice.report53
);

export const isLoadingSelector = createSelector(
  sliceSelector,
  (slice: any) => slice.loading
);