import React, { useEffect } from 'react';
import { History } from 'history';
import { Router, Switch, Route } from 'react-router-dom';
import { AuditTableContainer } from '../../auditories/views/audit-table.container';
// import { TableContainer } from '../../auditories/views/table.container';
import { UsersTableContainer } from '../../users/views/users-table.container';
// import { FormContainer } from '../../auditories/views/form.container';
import { ObservationsSFPFormContainer } from '../../observations-sfp/views/observation-sfp-form.container';
import { ObservationsASFFormContainer } from '../../observations-asf/views/observation-asf-form.container';
import { LoginFormContainer } from '../../auth/views/login-form.container';
import { AuditContainer } from '../../auditories/views/audit-form.container';
import { UsersFormContainer } from '../../users/views/users-form.container';
import { ResultsReportFormContainer as RForm } from '../../auditories/views/results-report-form.container';
import { NotFound } from './not-found.component';
import { ObservationSFPTableContainer } from '../../observations-sfp/views/observation-sfp-table.container';
import { ObservationASENLTableContainer } from '../../observations-asenl/views/observation-asenl-table.container';
import { ObservationASENLFormContainer } from '../../observations-asenl/views/observation-asenl-form.container';
import { ObservationASFTableContainer } from '../../observations-asf/views/observation-asf-table.container';
import { ResultsReportTableContainer } from '../../results-report/views/results-report-table.container';
import { ResultsReportFormContainer } from '../../results-report/views/results-report-form.container';
import { ResultsReportASENLTableContainer } from '../../results-report-asenl/views/results-report-asenl-table.container';
import { ResultsReportASENLFormContainer } from '../../results-report-asenl/views/results-report-asenl-form.container';
import { ObservationCYTGTableContainer } from '../../observations-cytg/views/observation-cytg-table.container';
import { ObservationCYTGFormContainer } from '../../observations-cytg/views/observation-cytg-form.container';
import { ResultsReportCYTGTableContainer } from '../../results-report-cytg/views/results-report-cytg-table.container';
import { ResultsReportCYTGFormContainer } from '../../results-report-cytg/views/results-report-cytg-form.container';
import { ReportsPreliminariesContainer } from '../../reports/views/reports-preliminaries.container';

type Props = {
  history: History,
  loadCatalogAction: Function,
  loadCatalogObsSFPAction: Function,
  loadCatalogObsASFAction: Function,
  loadCatalogResultsReportAction: Function,
  loadAuditCatalogAction: Function,
  loadUsersCatalogAction: Function,
  loadCatalogObsASENLAction: Function,
  loadCatalogResultsReportASENLAction: Function,
  loadCatalogObsCYTGAction: Function,
  loadCatalogResultsReportCYTGAction: Function,
};

export const AppRoutes = (props: Props) => {
  useEffect(() => {
    props.loadCatalogObsSFPAction();
    props.loadCatalogObsASFAction();
    props.loadCatalogAction();
    props.loadAuditCatalogAction();
    props.loadUsersCatalogAction();
    props.loadCatalogResultsReportAction();
    props.loadCatalogObsASENLAction();
    props.loadCatalogResultsReportASENLAction();
    props.loadCatalogObsCYTGAction();
    props.loadCatalogResultsReportCYTGAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Router history={props.history}>
      <Switch>
        <Route exact path={['/sign-in']}>
          <LoginFormContainer />
        </Route>
        <Route exact path={['/audit/create', '/audit/:id/edit']}>
          <AuditContainer />
        </Route>
        <Route exact path={['/audit/list']}>
          <AuditTableContainer />
        </Route>
        <Route exact path={['/', '/observation/list']}>
          <AuditTableContainer />
        </Route>
        <Route exact path={['/observation/create', '/observation/:id/edit']}>
          <NotFound />
        </Route>
        <Route exact path={['/', '/observation-asf/list']}>
          <ObservationASFTableContainer />
        </Route>
        <Route
          exact
          path={['/observation-asf/create', '/observation-asf/:id/:action']}
        >
          <ObservationsASFFormContainer />
        </Route>
        <Route exact path={['/', '/observation-sfp/list']}>
          <ObservationSFPTableContainer />
        </Route>
        <Route
          exact
          path={['/observation-sfp/create', '/observation-sfp/:id/:action']}
        >
          <ObservationsSFPFormContainer />
        </Route>
        <Route exact path={['/', '/observation-asenl/list']}>
          <ObservationASENLTableContainer />
        </Route>
        <Route
          exact
          path={['/observation-asenl/create', '/observation-asenl/:id/:action']}
        >
          <ObservationASENLFormContainer />
        </Route>
        <Route
          exact
          path={['/results-report/create', '/results-report/:id/:action']}
        >
          <ResultsReportFormContainer />
        </Route>
        <Route exact path={['/', '/results-report/list']}>
          <ResultsReportTableContainer />
        </Route>
        <Route
          exact
          path={[
            '/results-report-asenl/create',
            '/results-report-asenl/:id/:action',
          ]}
        >
          <ResultsReportASENLFormContainer />
        </Route>
        <Route exact path={['/', '/results-report-asenl/list']}>
          <ResultsReportASENLTableContainer />
        </Route>
        <Route exact path={['/', '/observation-cytg/list']}>
          <ObservationCYTGTableContainer />
        </Route>
        <Route
          exact
          path={['/observation-cytg/create', '/observation-cytg/:id/:action']}
        >
          <ObservationCYTGFormContainer />
        </Route>
        <Route
          exact
          path={[
            '/results-report-cytg/create',
            '/results-report-cytg/:id/:action',
          ]}
        >
          <ResultsReportCYTGFormContainer />
        </Route>
        <Route exact path={['/', '/results-report-cytg/list']}>
          <ResultsReportCYTGTableContainer />
        </Route>
        <Route exact path={['/user/create', '/user/:id/edit']}>
          <UsersFormContainer />
        </Route>
        <Route exact path={['/', '/user/list']}>
          <UsersTableContainer />
        </Route>
        <Route exact path={['/results_report/create']}>
          <RForm />
        </Route>
        <Route exact path={['/reports-53']}>
          <ReportsPreliminariesContainer />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
