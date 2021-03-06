import { connect } from 'react-redux';
import { ReportPreliminaries } from './reports-preliminaries.component';
import { loadReportsAction } from '../state/usecases/load-reports.usecase';
import { currentUserDivisionIdSelector } from 'src/area/auth/state/auth.selectors';
import {
  isLoadingSelector,
  reportSelector,
} from '../state/reports.selectors';

const mapDispatchToProps = {
  loadReportsAction,
};

function mapStateToProps(state: any) {
  return {
    report: reportSelector(state),
    loading: isLoadingSelector(state),
    divisionId: currentUserDivisionIdSelector(state),
  };
}

export const ReportsPreliminariesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportPreliminaries);
