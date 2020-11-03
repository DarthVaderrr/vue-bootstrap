<template>
    <div>
      <BlockContainer>
        <ulab-form size='mini' :btnNames='["重置","查询"]' layout='inline' :items='items' @submit='search'></ulab-form>
      </BlockContainer>
      <br>
      <BlockContainer title="列表" color='light-blue'>
        <div class="wf align between">
          <el-button type="primary" @click="addNew">新建</el-button>
          <el-button @click="exportData">导出数据</el-button>
        </div>
        <el-table :data="list">
          <el-table-column
            v-for  ='column of columns'
            :key   ='column.prop'
            :label ='column.label'
            :prop  ='column.prop'>
            <template slot-scope="scope">
              <span v-if="column.prop === 'userStatus'"
                class="userStatus"
                :class="{ 'blue' : scope.row.userStatus === 0, 'yellow' : scope.row.userStatus === 1 }">
                {{ userStatus[scope.row.userStatus] }}
              </span>
              <span v-else-if="column.prop === 'sex'">{{ sex[scope.row.sex] }}</span>
              <span v-else>{{ scope.row[column.prop] }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="250px">
            <template slot-scope="scope">
              <el-button size="mini" @click="deleteItem(scope.row)">删除</el-button>
              <el-button size="mini" @click="editItem(scope.row)">编辑</el-button>
              <el-button size="mini" @click="checkDetail(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="end"
          :current-page="pageNo"
          :page-size="pageSize"
          @current-change="pageChange"
          :total="count"
        ></el-pagination>
      </BlockContainer>
      <el-dialog
        :visible='showAddNewDialog'
        center
        width="60%"
        title="新建"
        show-close
        close-on-press-escape
        close-on-click-modal
        :before-close="closeAddNewDialog">
        <ulab-form size='small' ref='addNewForm' :btnNames='["关闭","保存"]'
          layout='vertical' :items='addNewFormConfigs' @submit='postNew' />
      </el-dialog>
      <el-dialog
        :visible='showEditDialog'
        center
        width="60%"
        title="编辑"
        show-close
        close-on-press-escape
        close-on-click-modal
        :before-close="closeEditDialog">
        <ulab-form size='small' layout='vertical' :btnNames='["关闭","保存"]'
          :items='editFormConfigs' @submit='update' />
      </el-dialog>
    </div>
</template>

<script>
import {
  queryList,
  addItem,
  deleteItem,
  updateItem,
} from '@api/listTest';
import { sex, userStatus }                               from '@map';
import { initConditions, initEditFormItems, exportData } from '@utils/utils';
import { mobile }                                        from '@utils/validators';

export default {
  data() {
    return {
      sex,
      userStatus,
      showAddNewDialog: false,
      showEditDialog: false,
      list: [],
      pageSize: 10,
      pageNo: 1,
      count: 0,
      queryConditions: null,
      items: initFilterFormItems(),
      columns: initColumns(),
      addNewFormConfigs: initAddFormItems(),
      editFormConfigs: null,
      updateId: null,
      exportDataAction: 'xxxx/export',
    };
  },
  mounted() {
    this.queryConditions = initConditions(this.items);
    this.getData();
  },
  methods: {
    exportData() {
      exportData(this.queryConditions, this.exportDataAction);
    },
    checkDetail({ id }) {
      this.$router.push({
        path: 'detail',
        query: { id },
      });
    },
    async update(data) {
      const res = await updateItem({ userId: this.updateId, ...data });
      if (res) {
        this.refreshList();
        this.closeEditDialog();
        this.updateId = null;
      }
    },
    editItem(row) {
      const data           = { ...row };
      const formInit       = initEditFormItems(data, initAddFormItems());
      this.editFormConfigs = formInit;
      this.updateId        = row.userId;
      this.showEditDialog  = true;
    },
    deleteItem(row) {
      this.$confirm('确定删除?')
        .then(async () => {
          const res = await deleteItem({ userId: row.userId });
          if (res) this.refreshList();
        });
    },
    closeEditDialog() {
      this.showEditDialog = false;
    },
    closeAddNewDialog() {
      this.showAddNewDialog = false;
      this.$refs.addNewForm.reset();
    },
    addNew() {
      this.showAddNewDialog = true;
    },
    async postNew(data) {
      const res = await addItem(data);
      if (res) {
        this.closeAddNewDialog();
        this.refreshList();
      }
    },
    search(data) {
      this.queryConditions = data;
      this.refreshList();
    },
    async getData() {
      const {
        queryConditions,
        pageSize,
        pageNo,
      } = this;
      const conditions      = {
        ...queryConditions,
        pageSize,
        pageNo,
      };
      const { count, list } = await queryList(conditions, this.cancel);
      this.list             = list;
      this.count            = count;
    },
    pageChange(pageNo) {
      this.pageNo = pageNo;
      this.getData();
    },
    clearList() {
      this.count  = 0;
      this.pageNo = 1;
      this.list   = [];
    },
    refreshList() {
      this.clearList();
      this.getData();
    },
  },
};

function initColumns() {
  const columns = [
    { label: '用户名', prop: 'userName' },
    { label: '真实姓名', prop: 'realName' },
    { label: '性别', prop: 'sex' },
    { label: '状态', prop: 'userStatus' },
    { label: '手机', prop: 'mobile' },
  ];
  return Object.freeze(columns);
}

function initFilterFormItems() {
  const items =  [
    {
      key: 'userName',
      type: 'el-input',
      label: '用户名',
      value: '',
    },
    {
      key: 'mobile',
      type: 'el-input',
      label: '手机',
      value: '',
    },
    {
      key: 'realName',
      type: 'el-input',
      label: '真实姓名',
      value: '',
    },
    {
      key: 'sex',
      type: 'checkbox-group',
      label: '性别',
      value: Object.keys(sex).map((i) => i - 0),
      options: { ...sex },
    },
    {
      key: 'userStatus',
      type: 'checkbox-group',
      label: '状态',
      value: Object.keys(userStatus).map((i) => i - 0),
      options: { ...userStatus },
    },
  ];
  return items;
}

function initAddFormItems() {
  const items =  [
    {
      key: 'userName',
      type: 'el-input',
      label: '用户名',
      value: '',
      validator: [{ message: '请输入用户名', required: true }],
    },
    {
      key: 'realName',
      type: 'el-input',
      label: '真实姓名',
      value: '',
      validator: [{
        message: '请输入真实姓名',  required: false, min: 0, max: 50,
      }],
    },
    {
      key: 'mobile',
      type: 'el-input',
      label: '手机',
      value: '',
      validator: [mobile],
    },
    {
      key: 'sex',
      type: 'form-select',
      label: '性别',
      value: '',
      options: { ...sex },
      validator: [{ message: '请选择性别', required: true }],
    },
    {
      key: 'userStatus',
      type: 'form-select',
      label: '状态',
      value: '',
      options: { ...userStatus },
      validator: [{ message: '请选择状态', required: true }],
    },
  ];
  return items;
}
</script>

<style scoped>
.yellow{
  color: var(--yellow);
}
.blue{
  color: var(--blue);
}
</style>
