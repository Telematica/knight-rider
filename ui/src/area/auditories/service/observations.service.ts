import { axiosApi } from 'src/redux-utils/axios.helper';
import { getAppSettings } from 'src/shared/utils/app-settings.util';
import { Observation } from '../state/observations.reducer';

export function getObservations(): Promise<any> {
  return axiosApi(
    `${getAppSettings().baseUrl}/observations/?limit=100&order=desc`,
    {
      method: 'get',
      headers: { accept: 'application/json' },
    },
    false
  );
}

export function removeObservation(id: number | string): Promise<any> {
  return axiosApi(`${getAppSettings().baseUrl}/observations/${id}`, {
    method: 'delete',
  });
}

export function createObservation(fields: Observation): Promise<any> {
  return axiosApi(`${getAppSettings().baseUrl}/observations/`, {
    method: 'post',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: fields,
  });
}

export function readObservation(id: number | string): Promise<any> {
  return axiosApi(`${getAppSettings().baseUrl}/observations/${id}`, {
    method: 'get',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}

export function updateObservation(
  id: number | string,
  fields: Observation,
): Promise<any> {
  return axiosApi(`${getAppSettings().baseUrl}/observations/${id}`, {
    method: 'put',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: fields,
  });
}
