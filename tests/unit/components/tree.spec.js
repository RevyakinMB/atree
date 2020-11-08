import Vue from 'vue';
import VueScreen from 'vue-screen';

import '../matchMedia.mock';

import Tree from '@/components/tree/Tree.vue';
import NameCell from '@/components/tree-cells/NameCell.vue';

Vue.use(VueScreen, {
  wide: 580,
});

const { mount, Wrapper } = require('@vue/test-utils');

describe('Tree component', () => {
  // const columns = [{ name: 'name' }, { name: 'status' }];
  it('should create Tree component without a hitch', (done) => {
    const treeWrapper = mount(Tree, {
      propsData: {
        columns: [],
      },
    });
    expect(treeWrapper).toBeInstanceOf(Wrapper);
    done();
  });

  it('should display a message in case of empty tree', (done) => {
    const treeWrapper = mount(Tree, {
      propsData: {
        columns: [],
      },
    });
    const emptyMessageSpan = treeWrapper.find('[data-test-id="is-empty-msg"]');
    expect(emptyMessageSpan.exists()).toBe(true);
    done();
  });

  it('should display a row for each data record', async (done) => {
    const treeWrapper = mount(Tree, {
      propsData: {
        columns: [{ name: 'name' }],
        records: [{ id: 1, name: 'name1' }, { id: 2, name: 'name2' }],
      },
      scopedSlots: {
        name({ edited, record }) {
          return this.$createElement(NameCell, {
            props: {
              value: record.name,
              record,
              edited,
            },
          });
        },
      },
    });
    await Vue.nextTick();

    const emptyMessageSpan = treeWrapper.find('[data-test-id="is-empty-msg"]');
    expect(emptyMessageSpan.exists()).toBe(false);

    const records = treeWrapper.findAll('.tree__line');
    expect(records.length).toBe(2);
    done();
  });

  it('should add a new row on button click', async (done) => {
    const treeWrapper = mount(Tree, {
      propsData: {
        columns: [{ name: 'name' }],
        records: [{ id: 1, name: 'name1' }, { id: 2, name: 'name2' }],
      },
      scopedSlots: {
        name({ edited, record }) {
          return this.$createElement(NameCell, {
            props: {
              value: record.name,
              record,
              edited,
            },
          });
        },
      },
    });
    await Vue.nextTick();

    const addBtn = treeWrapper.find('[data-test-id="add-btn"');
    addBtn.trigger('click');
    await Vue.nextTick();

    let records = treeWrapper.findAll('.tree__line');
    expect(records.length).toBe(3);

    const cancelBtn = treeWrapper.find('[data-test-id="cancel-editing-btn"');
    cancelBtn.trigger('click');
    await Vue.nextTick();

    records = treeWrapper.findAll('.tree__line');
    expect(records.length).toBe(2);
    done();
  });

  it('should hide "add" and "save" buttons while in the editing mode', async (done) => {
    const treeWrapper = mount(Tree, {
      propsData: {
        columns: [{ name: 'name' }],
        records: [],
      },
      scopedSlots: {
        name({ edited, record }) {
          return this.$createElement(NameCell, {
            props: {
              value: record.name,
              record,
              edited,
            },
          });
        },
      },
    });
    await Vue.nextTick();

    const addBtn = treeWrapper.find('[data-test-id="add-btn"');
    addBtn.trigger('click');
    await Vue.nextTick();

    const records = treeWrapper.findAll('.tree__action-btn');
    expect(records.length).toBe(0);
    done();
  });

  it('should cancel or save changes on click on the corresponding buttons', async (done) => {
    const treeWrapper = mount(Tree, {
      propsData: {
        columns: [{ name: 'name' }],
        records: [{ id: 1, name: 'original record name' }],
      },
      scopedSlots: {
        name({ edited, record }) {
          return this.$createElement(NameCell, {
            props: {
              value: record.name,
              record,
              edited,
            },
          });
        },
      },
    });
    await Vue.nextTick();

    const editBtn = treeWrapper.find('[data-test-id="edit-btn"');
    editBtn.trigger('click');
    await Vue.nextTick();

    const input = treeWrapper.find('[data-test-id="name-cell-input"');
    input.setValue('updated name');
    await Vue.nextTick();

    const saveBtn = treeWrapper.find('[data-test-id="finish-editing-btn"');
    saveBtn.trigger('click');
    await Vue.nextTick();

    expect(treeWrapper.html()).not.toContain('original record name');
    expect(treeWrapper.html()).toContain('updated name');

    editBtn.trigger('click');
    await Vue.nextTick();

    input.setValue('twice updated name');
    await Vue.nextTick();

    const cancelBtn = treeWrapper.find('[data-test-id="cancel-editing-btn"');
    cancelBtn.trigger('click');
    await Vue.nextTick();

    expect(treeWrapper.html()).not.toContain('twice updated name');
    expect(treeWrapper.html()).toContain('updated name');

    done();
  });
});
