import { connect } from 'react-redux';
import { ReportPreliminaries } from './reports-preliminaries.component';
import { loadReportsAction } from '../state/usecases/load-reports.usecase';
import {
  isLoadingSelector,
  report53Selector,
} from '../state/reports.selectors';

const mapDispatchToProps = {
  loadReportsAction,
};

function mapStateToProps(state: any) {
  return {
    report53: report53Selector(state),
    loading: isLoadingSelector(state),
  };
}

export const ReportsPreliminariesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportPreliminaries);
