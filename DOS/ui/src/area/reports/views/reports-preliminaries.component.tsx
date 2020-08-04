/* eslint-disable no-alert */
import React, { useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

type Props = {
  loading: boolean,
  loadReportsAction: Function,
  report53: any,
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
    report53,
    // loading,
    loadReportsAction,
  } = props;
  useEffect(() => {
    loadReportsAction({ ejercicio_fin: "2020", ejercicio_ini: "2000"});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const classes = useStyles();
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

        {report53 && report53.data_rows && report53.data_rows.map((dep: any) =>
           <tr> 
             <td>{dep.dep}</td> 
             <td>{dep.ej}</td>
             <td>{dep.c_asf}</td>
             <td>{dep.m_asf%1===0 ? dep.m_asf : dep.m_asf.toFixed( 2 )}</td>
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
  );
};
