/* eslint-disable no-alert */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MaterialTable, { MTableToolbar } from 'material-table';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';
import Button from '@material-ui/core/Button';
import PostAddIcon from '@material-ui/icons/PostAdd';
import { Audit } from '../state/audits.reducer';

type Props = {
  audits: Array<Audit>,
  loadAuditsAction: Function,
  removeAuditAction: Function,
  loading: boolean,
  paging: any,
};

const useStyles = makeStyles(() =>
  createStyles({
    tableReports: {
      border: 'solid 1px #ccc',
      '& th': {
        border: 'solid 1px #ccc',
        padding: '3px 10px',
      },
      '& td': {
        border: 'solid 1px #ccc',
        padding: '3px 10px',
      },
      '& tr:nth-child(odd)': {
        border: 'solid 1px #ccc',
        background: '#eee',
      },
    },
    tableWhole: {
      borderSpacing: '0px !important',
      border: 'solid 1px #ccc',
      width: '100%',
    },
    titrow: {
      background: '#fff !important',
    },
  })
);

export const ReportPreliminaries = (props: Props) => {
  const {
    audits,
    loadAuditsAction,
    removeAuditAction,
    loading,
    paging,
  } = props;
  //const { count, page, per_page, order } = paging;
  //const history = useHistory();
  //const customSort = () => 0;
  //const draggable: boolean = false;
  //const sorting: boolean = false;
  //useEffect(() => {
  //  loadAuditsAction({ per_page: paging.per_page, order });
  //  // eslint-disable-next-line react-hooks/exhaustive-deps
  //}, []);
  const classes = useStyles();
  const dep = [
    { "dep": "AET", "ej": 2016, "c_asf": 1, "m_asf": 0.0, "c_sfp": 0, "m_sfp": 0.0, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 1, "m_cytg": 0.0 },
    { "dep": "AET", "ej": 2018, "c_asf": 0, "m_asf": 0.0, "c_sfp": 0, "m_sfp": 0.0, "c_asenl": 15, "m_asenl": 67000425.0, "c_cytg": 0, "m_cytg": 0.0 },
    { "dep": "CDANL", "ej": 2016, "c_asf": 0, "m_asf": 0.0, "c_sfp": 0, "m_sfp": 0.0, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 1, "m_cytg": 0.0 },
    { "dep": "CECYTE", "ej": 2016, "c_asf": 0, "m_asf": 0.0, "c_sfp": 2, "m_sfp": 94934830.53, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 0, "m_cytg": 0.0 },
    { "dep": "CECYTE", "ej": 2017, "c_asf": 0, "m_asf": 0.0, "c_sfp": 9, "m_sfp": 76522515.07, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 0, "m_cytg": 0.0 },
    { "dep": "CECYTE", "ej": 2018, "c_asf": 0, "m_asf": 0.0, "c_sfp": 6, "m_sfp": 72858367.7, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 0, "m_cytg": 0.0 },
    { "dep": "CETyV", "ej": 2018, "c_asf": 0, "m_asf": 0.0, "c_sfp": 0, "m_sfp": 0.0, "c_asenl": 22, "m_asenl": 779959.0, "c_cytg": 0, "m_cytg": 0.0 },
    { "dep": "CODETUR", "ej": 2016, "c_asf": 0, "m_asf": 0.0, "c_sfp": 0, "m_sfp": 0.0, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 3, "m_cytg": 0.0 },
    { "dep": "CODETUR", "ej": 2018, "c_asf": 0, "m_asf": 0.0, "c_sfp": 5, "m_sfp": 0.0, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 0, "m_cytg": 0.0 },
    { "dep": "CONARTE", "ej": 2015, "c_asf": 2, "m_asf": 484.9, "c_sfp": 0, "m_sfp": 0.0, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 0, "m_cytg": 0.0 },
    { "dep": "CONARTE", "ej": 2018, "c_asf": 1, "m_asf": 3726.97932, "c_sfp": 0, "m_sfp": 0.0, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 0, "m_cytg": 0.0 },
    { "dep": "DA", "ej": 2018, "c_asf": 0, "m_asf": 0.0, "c_sfp": 8, "m_sfp": 123109.29, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 0, "m_cytg": 0.0 },
    { "dep": "DIF", "ej": 2015, "c_asf": 0, "m_asf": 0.0, "c_sfp": 0, "m_sfp": 0.0, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 8, "m_cytg": 105023291.07 },
    { "dep": "IANL", "ej": 2016, "c_asf": 0, "m_asf": 0.0, "c_sfp": 0, "m_sfp": 0.0, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 6, "m_cytg": 2692549.0 },
    { "dep": "ICIFED", "ej": 2016, "c_asf": 2, "m_asf": 214233.8967, "c_sfp": 0, "m_sfp": 0.0, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 0, "m_cytg": 0.0 },
    { "dep": "ICVNL", "ej": 2016, "c_asf": 0, "m_asf": 0.0, "c_sfp": 0, "m_sfp": 0.0, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 7, "m_cytg": 0.0 },
    { "dep": "ISSSTELEON", "ej": 2015, "c_asf": 0, "m_asf": 0.0, "c_sfp": 0, "m_sfp": 0.0, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 9, "m_cytg": 202500.0 },
    { "dep": "METRORREY", "ej": 2016, "c_asf": 0, "m_asf": 0.0, "c_sfp": 0, "m_sfp": 0.0, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 6, "m_cytg": 0.0 },
    { "dep": "PF", "ej": 2016, "c_asf": 0, "m_asf": 0.0, "c_sfp": 0, "m_sfp": 0.0, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 3, "m_cytg": 2063960.0 },
    { "dep": "PF", "ej": 2017, "c_asf": 0, "m_asf": 0.0, "c_sfp": 2, "m_sfp": 7500000.0, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 0, "m_cytg": 0.0 },
    { "dep": "REPSS", "ej": 2016, "c_asf": 0, "m_asf": 0.0, "c_sfp": 2, "m_sfp": 0.0, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 2, "m_cytg": 820598.91 },
    { "dep": "REPSS", "ej": 2018, "c_asf": 1, "m_asf": 2208.42, "c_sfp": 0, "m_sfp": 0.0, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 0, "m_cytg": 0.0 },
    { "dep": "SADM", "ej": 2015, "c_asf": 0, "m_asf": 0.0, "c_sfp": 0, "m_sfp": 0.0, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 8, "m_cytg": 6643443.05 },
    { "dep": "SADM", "ej": 2016, "c_asf": 0, "m_asf": 0.0, "c_sfp": 0, "m_sfp": 0.0, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 10, "m_cytg": 249858661.76 },
    { "dep": "SADM", "ej": 2017, "c_asf": 0, "m_asf": 0.0, "c_sfp": 0, "m_sfp": 0.0, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 38, "m_cytg": 3151175.8 },
    { "dep": "SCNL", "ej": 2015, "c_asf": 0, "m_asf": 0.0, "c_sfp": 0, "m_sfp": 0.0, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 2, "m_cytg": 0.0 },
    { "dep": "SCNL", "ej": 2018, "c_asf": 2, "m_asf": 0.0, "c_sfp": 0, "m_sfp": 0.0, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 0, "m_cytg": 0.0 },
    { "dep": "SE", "ej": 2016, "c_asf": 12, "m_asf": 625512.17119, "c_sfp": 3, "m_sfp": 65701816.27, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 0, "m_cytg": 0.0 },
    { "dep": "SE", "ej": 2018, "c_asf": 0, "m_asf": 0.0, "c_sfp": 0, "m_sfp": 0.0, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 4, "m_cytg": 79344.0 },
    { "dep": "SEDA", "ej": 2018, "c_asf": 0, "m_asf": 0.0, "c_sfp": 3, "m_sfp": 362920.0, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 0, "m_cytg": 0.0 },
    { "dep": "SEDESOL", "ej": 2016, "c_asf": 0, "m_asf": 0.0, "c_sfp": 0, "m_sfp": 0.0, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 2, "m_cytg": 0.0 },
    { "dep": "SFYTG", "ej": 2012, "c_asf": 1, "m_asf": 16361.4, "c_sfp": 0, "m_sfp": 0.0, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 0, "m_cytg": 0.0 },
    { "dep": "SFYTG", "ej": 2014, "c_asf": 8, "m_asf": 132090.7, "c_sfp": 0, "m_sfp": 0.0, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 0, "m_cytg": 0.0 },
    { "dep": "SFYTG", "ej": 2015, "c_asf": 3, "m_asf": 16754.9, "c_sfp": 4, "m_sfp": 285.0, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 0, "m_cytg": 0.0 },
    { "dep": "SFYTG", "ej": 2016, "c_asf": 19, "m_asf": 1375756.7432, "c_sfp": 6, "m_sfp": 380.0, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 0, "m_cytg": 0.0 },
    { "dep": "SFYTG", "ej": 2017, "c_asf": 0, "m_asf": 0.0, "c_sfp": 2, "m_sfp": 232498.44, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 0, "m_cytg": 0.0 },
    { "dep": "SFYTG", "ej": 2018, "c_asf": 0, "m_asf": 0.0, "c_sfp": 1, "m_sfp": 0.0, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 0, "m_cytg": 0.0 },
    { "dep": "SFYTG", "ej": 2019, "c_asf": 0, "m_asf": 0.0, "c_sfp": 0, "m_sfp": 0.0, "c_asenl": 49, "m_asenl": 6817313.21, "c_cytg": 0, "m_cytg": 0.0 },
    { "dep": "SI", "ej": 2018, "c_asf": 26, "m_asf": 643399673.26, "c_sfp": 9, "m_sfp": 0.0, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 0, "m_cytg": 0.0 },
    { "dep": "SI", "ej": 2019, "c_asf": 0, "m_asf": 0.0, "c_sfp": 4, "m_sfp": 71924.57, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 0, "m_cytg": 0.0 },
    { "dep": "SS", "ej": 2012, "c_asf": 1, "m_asf": 30320.6, "c_sfp": 0, "m_sfp": 0.0, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 0, "m_cytg": 0.0 },
    { "dep": "SS", "ej": 2013, "c_asf": 3, "m_asf": 21361.3, "c_sfp": 0, "m_sfp": 0.0, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 0, "m_cytg": 0.0 },
    { "dep": "SS", "ej": 2014, "c_asf": 4, "m_asf": 31875.3, "c_sfp": 0, "m_sfp": 0.0, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 0, "m_cytg": 0.0 },
    { "dep": "SS", "ej": 2015, "c_asf": 8, "m_asf": 57663.1, "c_sfp": 11, "m_sfp": 266418.0, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 0, "m_cytg": 0.0 },
    { "dep": "SS", "ej": 2016, "c_asf": 4, "m_asf": 298451.93813, "c_sfp": 13, "m_sfp": 86169.0, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 0, "m_cytg": 0.0 },
    { "dep": "SS", "ej": 2017, "c_asf": 0, "m_asf": 0.0, "c_sfp": 7, "m_sfp": 3161.0, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 0, "m_cytg": 0.0 },
    { "dep": "SS", "ej": 2018, "c_asf": 0, "m_asf": 0.0, "c_sfp": 6, "m_sfp": 25963.0, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 0, "m_cytg": 0.0 },
    { "dep": "SS", "ej": 2019, "c_asf": 0, "m_asf": 0.0, "c_sfp": 4, "m_sfp": 913.0, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 0, "m_cytg": 0.0 },
    { "dep": "SSNL", "ej": 2015, "c_asf": 0, "m_asf": 0.0, "c_sfp": 0, "m_sfp": 0.0, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 7, "m_cytg": 1450295.42 },
    { "dep": "SSNL", "ej": 2016, "c_asf": 0, "m_asf": 0.0, "c_sfp": 0, "m_sfp": 0.0, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 2, "m_cytg": 4864657.0 },
    { "dep": "UCS", "ej": 2016, "c_asf": 0, "m_asf": 0.0, "c_sfp": 0, "m_sfp": 0.0, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 5, "m_cytg": 12179833.1 },
    { "dep": "UTSC", "ej": 2018, "c_asf": 0, "m_asf": 0.0, "c_sfp": 0, "m_sfp": 0.0, "c_asenl": 0, "m_asenl": 0.0, "c_cytg": 23, "m_cytg": 126485299.0 }
  ]
  return (

    <table className={classes.tableWhole}> 
      <tbody className={classes.tableReports} >
        <tr className={classes.titrow}>    
          <th rowSpan={2}>Secreataría/Entidad/Municipio</th> 
          <th rowSpan={2}>Ejercicio</th> 
          <th colSpan={2}>ASF</th> 
          <th colSpan={2}>SFP</th> 
          <th colSpan={2}>ASENL</th> 
          <th colSpan={2}>CyTG</th> 
          <th colSpan={2}>Total</th> 
        </tr> 
        <tr> 
          <td>Cant. Obs.</td> 
          <td>Monto</td> 
          <td>Cant. Obs.</td> 
          <td>Monto</td> 
          <td>Cant. Obs.</td> 
          <td>Monto</td> 
          <td>Cant. Obs.</td> 
          <td>Monto</td> 
          <td>Cant. Obs.</td> 
          <td>Monto</td> 
        </tr> 

        {dep.map((dep) =>
           <tr> 
             <td>{dep.dep}</td> 
             <td>{dep.ej}</td>
             <td>{dep.c_asf}</td>
             <td>{dep.m_asf%1==0 ? dep.m_asf : dep.m_asf.toFixed( 2 )}</td>
             <td>{dep.c_sfp}</td>
             <td>{dep.m_sfp.toFixed( 2 )}</td>
             <td>{dep.c_asenl}</td>
             <td>{dep.m_asenl.toFixed( 2 )}</td>
             <td>{dep.c_cytg}</td>
             <td>{dep.m_cytg.toFixed( 2 )}</td>
             <td></td>
             <td></td>
           </tr>
        )
        }

       
      </tbody>
    </table>


  /*
    <MaterialTable
      title="Auditorías"
      onOrderChange={(orderBy: number, orderDirection: 'asc' | 'desc') => {
        loadAuditsAction({
          ...paging,
          order: orderDirection,
          order_by: 'id',
        });
      }}
      columns={[
        {
          title: 'ID',
          field: 'id',
          defaultSort: order,
          customSort,
          sorting: !sorting,
        },
        {
          title: 'Clave de Auditoría',
          field: 'title',
          sorting,
        },
        {
          title: 'Dependencia(s)',
          field: 'dependencies',
          sorting,
          customSort,
        },
        {
          title: 'Año(s)',
          field: 'years',
          sorting,
        },
      ]}
      data={audits || []}
      console.log(data);
      options={{
        draggable,
        initialPage: 1, // @todo include this settings value in a CONSTANTS file
        paging: true,
        pageSize: per_page,
        thirdSortClick: false,
        actionsColumnIndex: 5, // @todo this shouldn't be hardcoded, calculate using columns.lenght
      }}
      components={{
        Pagination: (componentProps) => {
          return (
            <TablePagination
              {...componentProps}
              count={count}
              page={page - 1 || 0}
              rowsPerPage={per_page}
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              onChangePage={(event, currentPage: number) => {
                loadAuditsAction({
                  per_page,
                  page: currentPage + 1,
                  order,
                  // offset: nextPage * 1,
                });
              }}
              onChangeRowsPerPage={(event: any) => {
                componentProps.onChangeRowsPerPage(event);
                loadAuditsAction({
                  per_page: event.target.value,
                });
              }}
            />
          );
        },
        Toolbar: (componentProps) => {
          return (
            <div>
              <MTableToolbar {...componentProps} />
              <div style={{ padding: '0px 10px', textAlign: 'right' }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<PostAddIcon />}
                  size="medium"
                  onClick={() => history.push('/audit/create')}
                >
                  Agregar Auditoría
                </Button>
              </div>
            </div>
          );
        },
      }}
      actions={[
        {
          icon: 'edit',
          tooltip: 'Editar Auditoría',
          onClick: (event, rowData: any) =>
            history.push(`/audit/${rowData.id}/edit`),
        },
        {
          icon: 'delete',
          tooltip: 'Eliminar Auditoría',
          onClick: (event, rowData: any) => {
            if (
              // eslint-disable-next-line no-restricted-globals
              confirm(
                `¿Realmente quieres eliminar la Auditoría ${rowData.id}?\n Esta acción es irreversible`,
              )
            ) {
              removeAuditAction(rowData.id);
            }
          },
        },
      ]}
      isLoading={loading}
    />
    */
  );
};
