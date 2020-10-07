import { connect } from 'react-redux';
import { Report58 } from './reports58.component';
import { loadReport56Action } from '../state/usecases/load-reports56.usecase';
import { currentUserDivisionIdSelector } from 'src/area/auth/state/auth.selectors';
import {
  isLoadingSelector,
  report56Selector,
} from '../state/reports56.selectors';

const mapDispatchToProps = {
  loadReport56Action,
};

function mapStateToProps(state: any) {
  return {
    report: report56Selector(state),
    loading: isLoadingSelector(state),
    divisionId: currentUserDivisionIdSelector(state),
  };
}

export const Reports58Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Report58);
