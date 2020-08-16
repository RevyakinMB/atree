const defaults = {
  statuses: [],
  options: [],
  hierarchy: [],
};

export const get = (storage) => (uri) => {
  if (!uri) {
    throw new Error('No URI specified.');
  }
  return JSON.parse(storage.getItem(uri)) || defaults[uri];
};

export const put = (storage) => (uri, data) => {
  if (!uri) {
    throw new Error('No URI specified.');
  }
  if (!data) {
    throw new Error('No data specified.');
  }
  storage.setItem(uri, JSON.stringify(data));
};

export const del = (storage) => (uri) => {
  if (!uri) {
    throw new Error('No URI specified.');
  }
  storage.removeItem(uri);
};

export default function LocalStorageAPI(storageInstance = localStorage) {
  return {
    get: get(storageInstance),
    put: put(storageInstance),
    delete: del(storageInstance),
  };
}

defaults.hierarchy = [{
  id: 1,
  name: 'Name1',
  status: {
    id: 1,
    name: 'Status #1',
  },
  dateFrom: '2020-08-16T10:08:17.207Z',
  dateTo: null,
  options: [],
}, {
  id: 2,
  name: 'Name2',
  status: null,
  dateFrom: null,
  dateTo: null,
  options: [{
    id: 1,
    name: 'Option 1',
  }, {
    id: 2,
    name: 'Option 2',
  }, {
    id: 3,
    name: 'Option 3',
  }],
}, {
  id: 3,
  name: 'Name3',
  status: {
    id: 2,
    name: 'Status #2',
  },
  dateFrom: '2019-12-31T21:00:00.000Z',
  dateTo: '2020-08-31T20:59:59.999Z',
  options: [],
}, {
  id: 4,
  parent: 1,
  name: 'Name4',
  status: null,
  dateFrom: '2020-08-16T10:08:17.208Z',
  dateTo: null,
  options: [],
}, {
  id: 5,
  parent: 4,
  name: 'Name5',
  status: null,
  dateFrom: '2020-08-16T10:08:17.208Z',
  dateTo: null,
  options: [],
}, {
  id: 6,
  parent: 3,
  name: 'Name6',
  status: null,
  dateFrom: '2020-08-16T10:08:17.208Z',
  dateTo: null,
  options: [],
}, {
  id: 7,
  parent: 6,
  name: 'Name7',
  status: null,
  dateFrom: '2020-08-16T10:08:17.208Z',
  dateTo: null,
  options: [],
}];

defaults.statuses = [{
  id: '1',
  name: 'Status #1',
}, {
  id: '2',
  name: 'Status #2',
}, {
  id: '3',
  name: 'Status #3',
}, {
  id: '4',
  name: 'Status #4',
}];

defaults.options = [{
  id: '1',
  name: 'Option 1',
}, {
  id: '2',
  name: 'Option 2',
}, {
  id: '3',
  name: 'Option 3',
}, {
  id: '4',
  name: 'Option 4',
}, {
  id: '5',
  name: 'Option 5',
}];
