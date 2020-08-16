import moment from 'moment';
import LocalStorageAPI from './localStorage';

const API = LocalStorageAPI();

export const getHierarchy = () => {
  const data = API.get('hierarchy');
  return data.map((record) => ({
    ...record,
    dateFrom: record.dateFrom && moment(record.dateFrom),
    dateTo: record.dateTo && moment(record.dateTo),
  }));
};

export const saveHierarchy = (data) => API.put('hierarchy', data);
