<template>
  <div id="app">
    <tree
      :columns="treeColumns"
      :records="records"
      :readonly="false"
      @save="onSaveClick"
    >
      <template #name="{ record, edited }">
        <name-cell
          :value="record.name"
          :edited="edited"
          :record="record"
          :is-valid="value => !!value"
        />
      </template>
      <template #status="{ record, edited }">
        <status-cell
          :value="record.status"
          :edited="edited"
          :options="statuses"
        />
      </template>
      <template #date-from="{ record, edited }">
        <date-cell
          :value="record.dateFrom"
          :edited="edited"
          :record="record"
          :is-valid="dateFromIsValid"
          prop-name="dateFrom"
        />
      </template>
      <template #date-to="{ record, edited }">
        <date-cell
          :value="record.dateTo"
          :edited="edited"
          :record="record"
          :is-valid="dateToIsValid"
          prop-name="dateTo"
        />
      </template>
      <template #options="{ record, edited }">
        <options-cell
          :record="record"
          :value="record.options"
          :edited="edited"
          :options="options"
        />
      </template>
    </tree>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import Tree from '@/components/tree/Tree.vue';
import NameCell from '@/components/tree-cells/NameCell.vue';
import StatusCell from '@/components/tree-cells/StatusCell.vue';
import DateCell from '@/components/tree-cells/DateCell.vue';
import OptionsCell from '@/components/tree-cells/OptionsCell.vue';

const getFields = ($t) => [{
  name: 'name',
  title: $t('Name'),
  width: 10,
}, {
  name: 'status',
  title: $t('Status'),
}, {
  name: 'date-from',
  title: $t('Active from'),
  width: 7,
}, {
  name: 'date-to',
  title: $t('Active until'),
  width: 7,
}, {
  name: 'options',
  title: $t('Options'),
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
    const $t = this.$t.bind(this);
    return {
      treeColumns: getFields($t),

      statuses: [{
        id: '1',
        name: $t('Status #{0}', ['1']),
      }, {
        id: '2',
        name: $t('Status #{0}', ['2']),
      }, {
        id: '3',
        name: $t('Status #{0}', ['3']),
      }, {
        id: '4',
        name: $t('Status #{0}', ['4']),
      }],

      options: [{
        id: '1',
        name: $t('Option {0}', ['1']),
      }, {
        id: '2',
        name: $t('Option {0}', ['2']),
      }, {
        id: '3',
        name: $t('Option {0}', ['3']),
      }, {
        id: '4',
        name: $t('Option {0}', ['4']),
      }, {
        id: '5',
        name: $t('Option {0}', ['5']),
      }],
    };
  },

  computed: {
    ...mapState('hierarchy', {
      records: 'hierarchy',
    }),
  },

  mounted() {
    if (!this.records) {
      this.fetchHierarchy();
    }
  },

  methods: {
    dateFromIsValid(value, record) {
      if (!value) {
        return !record.status;
      }
      if (!record.dateTo) {
        return true;
      }
      return value < record.dateTo;
    },

    dateToIsValid(value, record) {
      if (!value) {
        return !record.status;
      }
      if (!record.dateFrom) {
        return true;
      }
      return value > record.dateFrom;
    },

    ...mapActions('hierarchy', {
      fetchHierarchy: 'getHierarchy',
      saveHierarchy: 'saveHierarchy',
    }),

    onSaveClick(data) {
      this.saveHierarchy(data);
    },
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

html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
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
