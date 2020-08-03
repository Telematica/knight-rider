import { connect } from 'react-redux';
import { ReportPreliminaries } from './reports-preliminaries.component';
//import { loadAuditsAction } from '../state/usecases/load-audits.usecase';
//import { removeAuditAction } from '../state/usecases/remove-audit.usecase';

//import {
//  auditsCatalogSelector,
//  isLoadingSelector,
//  pagingSelector,
//} from '../state/audits.selectors';

//const mapDispatchToProps = {
//  loadAuditsAction,
//  removeAuditAction,
//};

function mapStateToProps(state: any) {
  return {
    audits: auditsCatalogSelector(state),
    loading: isLoadingSelector(state),
    paging: pagingSelector(state),
  };
}

export const ReportsPreliminariesContainer = connect(
  //mapStateToProps,
  //mapDispatchToProps
)(ReportPreliminaries);
