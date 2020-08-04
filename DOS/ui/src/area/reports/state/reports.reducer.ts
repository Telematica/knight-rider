import { createAndMergeSliceReducer } from 'src/redux-utils/create-and-merge-slice-reducer';

// Base Reporte 53 Interface
export interface Reporte53 {
  data_rows: Array<DataRow>;
  ignored_audit_ids: Array<number>;
}

type DataRow = {
  dep: string; //Secretaría / Entidad / Municipio
  ej: number; // Ejercicio
  c_asf: number; // Cant. Obs. (ASF)
  m_asf: number; // Monto (ASF)
  c_sfp: number; // Cant. Obs. (SFP)
  m_sfp: number; // Monto (SFP)
  c_asenl: number; // Cant. Obs. (ASENL)
  m_asenl: number; // Monto (ASENL)
  c_cytg: number; // Cant. Obs. (CyTG)
  m_cytg: number; // Monto (CyTG)
};

interface Reporte53Slice {
  report53: Reporte53 | null;
  loading: boolean;
}

const initialState: Reporte53Slice = {
  report53: null,
  loading: false,
};

export const sliceName = 'results53Slice';
export const results53Reducer = createAndMergeSliceReducer(
  sliceName,
  initialState,
  null
);
