import LocalStorageAPI from './localStorage';

const API = LocalStorageAPI();

export const getHierarchy = () => API.get('hierarchy');

export const saveHierarchy = () => {};
