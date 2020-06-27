<template>
  <div id="app">
    <tree
      :columns="treeColumns"
      :records="records"
    >
      <template #name="{ record }">
        <name-cell :value="record.name" />
      </template>
      <template #status="{ record }">
        <status-cell :value="record.status" />
      </template>
      <template #date-from="{ record }">
        <date-cell :value="record.dateFrom" />
      </template>
      <template #date-to="{ record }">
        <date-cell :value="record.dateTo" />
      </template>
      <template #options="{ record }">
        <options-cell
          :record="record"
          :value="record.options"
        />
      </template>
    </tree>
  </div>
</template>

<script>
import Tree from '@/components/tree/Tree.vue';
import NameCell from '@/components/tree-cells/NameCell.vue';
import StatusCell from '@/components/tree-cells/StatusCell.vue';
import DateCell from '@/components/tree-cells/DateCell.vue';
import OptionsCell from '@/components/tree-cells/OptionsCell.vue';
import moment from 'moment';

const FIELDS = [{
  name: 'name',
  width: 10,
}, {
  name: 'status',
}, {
  name: 'date-from',
  title: 'Active from',
}, {
  name: 'date-to',
  title: 'Active until',
}, {
  name: 'options',
  title: 'Options',
  width: 7,
}];

export default {
  name: 'App',
  components: {
    Tree,
    NameCell,
    StatusCell,
    DateCell,
    OptionsCell,
  },
  data() {
    return {
      treeColumns: FIELDS,
      records: [{
        id: 1,
        name: 'Name1',
        status: {
          id: 1,
          name: 'Status #1',
        },
        dateFrom: moment(),
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
        dateFrom: moment().startOf('year'),
        dateTo: moment().endOf('month'),
        options: [],
      }, {
        id: 4,
        parent: 1,
        name: 'Name4',
        status: null,
        dateFrom: moment(),
        dateTo: null,
        options: [],
      }, {
        id: 5,
        parent: 4,
        name: 'Name5',
        status: null,
        dateFrom: moment(),
        dateTo: null,
        options: [],
      }, {
        id: 6,
        parent: 3,
        name: 'Name6',
        status: null,
        dateFrom: moment(),
        dateTo: null,
        options: [],
      }, {
        id: 7,
        parent: 6,
        name: 'Name7',
        status: null,
        dateFrom: moment(),
        dateTo: null,
        options: [],
      }],
    };
  },
};
</script>

<style>
body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

@media screen and (min-width: 900px) {
  #app {
    width: 900px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
