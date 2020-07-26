import * as ACTIONS from '../actionTypes';

import {
  getHierarchy,
  saveHierarchy,
} from '../../api';

const hierarchyModule = {
  namespaced: true,

  state: {
    hierarchy: null,
    fetching: false,
  },

  mutations: {
    [ACTIONS.HIERARCHY_FETCH_START](state) {
      state.fetching = true;
    },
    [ACTIONS.HIERARCHY_FETCH_DONE](state, payload) {
      state.fetching = false;
      state.hierarchy = payload;
    },
    [ACTIONS.HIERARCHY_FETCH_ERROR](state) {
      state.fetching = false;
    },

    [ACTIONS.HIERARCHY_SAVE_START](state) {
      state.fetching = true;
    },
    [ACTIONS.HIERARCHY_SAVE_DONE](state) {
      state.fetching = false;
    },
    [ACTIONS.HIERARCHY_SAVE_ERROR](state) {
      state.fetching = false;
    },
  },

  actions: {
    async getHierarchy({ commit }, params) {
      commit(ACTIONS.HIERARCHY_FETCH_START);
      try {
        const data = await getHierarchy(params);
        commit(ACTIONS.HIERARCHY_FETCH_DONE, data);
      } catch (err) {
        commit(ACTIONS.HIERARCHY_FETCH_ERROR, err);
      }
    },

    async saveHierarchy({ commit }, data) {
      commit(ACTIONS.HIERARCHY_SAVE_START);
      try {
        await saveHierarchy(data);
        commit(ACTIONS.HIERARCHY_SAVE_DONE);
      } catch (err) {
        commit(ACTIONS.HIERARCHY_SAVE_ERROR, err);
      }
    },
  },
};

export default hierarchyModule;
