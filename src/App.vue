<template>
  <div id="app">
    <tree
      :columns="treeColumns"
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
import NameCell from '@/components/tree/NameCell.vue';
import StatusCell from '@/components/tree/StatusCell.vue';
import DateCell from '@/components/tree/DateCell.vue';
import OptionsCell from '@/components/tree/OptionsCell.vue';

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
