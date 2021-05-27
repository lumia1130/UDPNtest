<template>
  <div class="dashboard-container container">
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="6" class="text-left"><b class="title-sub">{{$t('node.nodeList.nodeNetwork')}}</b></el-col>
      <el-col :span="6" class="text-right">
        <!-- <el-button type="primary"  icon="el-icon-plus">{{$t('新增入网信息')}}</el-button> -->
      </el-col>
    </el-row>
    <el-row class="mt">
      <el-col :span="24">
        <el-card class="box-card" shadow="never">
          <div class="text-right table-sub">
             <el-button type="text" icon="el-icon-plus" @click="add" >{{$t('node.nodeList.add')}}</el-button>
             <el-button type="primary" plain size="mini" icon="el-icon-refresh-right" @click="restSearch">{{$t('node.nodeList.rest')}}</el-button>
          </div>
          <el-table :data="tableData"
            :header-cell-style="{background: '#F8F8F9',color: '#606266'}"
            style="width: 100%"
            border
            v-loading="loading"
            :row-key='getRowKeys'
            :expand-row-keys="expands"
            @expand-change="expandSelect"

            >
            <!-- <el-table-column prop="objectId" label="ID"> </el-table-column> -->
            <el-table-column  type="expand">
              <template slot-scope="props">
                <el-form label-position="left"  class="demo-table-expand">
                  <el-form-item :label="$t('node.nodeList.name')">
                    <span>{{ props.row.field101 }}</span>
                  </el-form-item>
                  <el-form-item label="节点编号:">
                    <span>{{ props.row.field102 }}</span>
                  </el-form-item>
                  <el-form-item label="节点类型:">
                    <span>{{ props.row.field104 }}</span>
                  </el-form-item>
                  <el-form-item label="币 种:">
                    <span>{{ props.row.field105 }}</span>
                  </el-form-item>
                  <el-form-item label="费 率:">
                    <span>{{ props.row.field106 }}</span>
                  </el-form-item>
                  <el-form-item label="资金池地址:">
                    <span>{{ props.row.field107 }}</span>
                  </el-form-item>
                  <el-form-item label="描述:">
                    <span>{{ props.row.field108 }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column prop="field101"  :label="$t('node.nodeList.name')" :show-overflow-tooltip="true" >
              <template slot="header" slot-scope="scope">
                <b>{{$t('node.nodeList.name')}}</b>
                <el-input
                  v-model="formDataSearch.field101"
                  :index="scope.$index"
                  size="mini"
                  :placeholder="$t('node.nodeList.namePlaceholder')"/>
              </template>
            </el-table-column>
            <el-table-column prop="field102"  :label="$t('node.nodeList.number')" :show-overflow-tooltip="true">
              <template slot="header" slot-scope="scope">
                <b>{{$t('node.nodeList.number')}}</b>
                <el-input
                  v-model="formDataSearch.field102"
                  :index="scope.$index"
                  size="mini"
                  :placeholder="$t('node.nodeList.numberPlaceholder')"/>
              </template>
            </el-table-column>
            <el-table-column prop="field104" :label="$t('node.nodeList.type')" :show-overflow-tooltip="true">
              <template slot="header" slot-scope="scope">
                 <b>{{$t('node.nodeList.type')}}</b>
                  <el-select  :index="scope.$index"    size="mini"   v-model="formDataSearch.field104" :placeholder="$t('node.nodeList.typePlaceholder')" clearable>
                    <el-option v-for="(item, index) in field104Options" :key="index" :label="item.label" :value="item.value"
                      :disabled="item.disabled"></el-option>
                  </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="field105" :label="$t('node.nodeList.currency')" :show-overflow-tooltip="true">
              <template slot="header" slot-scope="scope">
                  <b>{{$t('node.nodeList.currency')}}</b>
                  <el-select  :index="scope.$index"    size="mini"   v-model="formDataSearch.field105" :placeholder="$t('node.nodeList.currencyPlaceholder')" clearable>
                    <el-option v-for="(item, index) in field105Options" :key="index" :label="item.label" :value="item.value"
                      :disabled="item.disabled"></el-option>
                  </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="field106" :label="$t('node.nodeList.rate')"  :show-overflow-tooltip="true">
              <template slot="header" slot-scope="scope">
                  <b>{{$t('node.nodeList.rate')}}</b>
                  <el-select  :index="scope.$index"    size="mini"   v-model="formDataSearch.field106" :placeholder="$t('node.nodeList.ratePlaceholder')"  clearable>
                    <el-option v-for="(item, index) in field106Options" :key="index" :label="item.label" :value="item.value"
                      :disabled="item.disabled"></el-option>
                  </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="field107" :label="$t('node.nodeList.address')"  :show-overflow-tooltip="true">
               <template slot="header" slot-scope="scope">
                <b>{{$t('node.nodeList.address')}}</b>
                <el-input
                  v-model="formDataSearch.field107"
                  :index="scope.$index"
                  size="mini"
                 :placeholder="$t('node.nodeList.addressPlaceholder')"/>
              </template>
            </el-table-column>
            <el-table-column prop="field108" :label="$t('node.nodeList.status')" >
              <template slot="header" slot-scope="scope">
                  <b>{{$t('node.nodeList.status')}}</b>
                  <el-select  :index="scope.$index"    size="mini"   v-model="formDataSearch.fieldStatus" :placeholder="$t('node.nodeList.statusPlaceholder')" clearable>
                    <el-option v-for="(item, index) in fieldStatus" :key="index" :label="item.label" :value="item.value"
                      :disabled="item.disabled"></el-option>
                  </el-select>
              </template>
               <template slot-scope="scope">
                  <el-tag
                    :index="scope.$index"
                    effect="plain">
                   初始化
                  </el-tag>
              </template>
            </el-table-column>
            <el-table-column :label="$t('node.nodeList.operate')">
              <template slot-scope="scope">
                <el-button :index="scope.$index" type="text"> 编辑 </el-button>
                <el-button
                  :index="scope.$index"
                  type="text"
                  @click="onDel(scope.row.objectId)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="text-right pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage2"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="10"
            layout="sizes, prev, pager, next"
            :total="100">
          </el-pagination>
        </el-card>
      </el-col>
    </el-row>
        <el-dialog
      title="节点入网信息"
      :visible.sync="dialogVisible"
      @close="onClose"
      width="40%"
      :close-on-click-modal="false"
    >
      <el-form
        ref="elForm"
        :model="formData"
        :rules="rules"
        size="medium"
        label-width="100px"
        label-position="right"
      >
        <el-form-item label="节点名称" prop="field101">
          <el-input
            v-model="formData.field101"
            placeholder="请输入单行文本节点名称"
            clearable
            :style="{width: '100%'}"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="节点编号" prop="field102">
          <el-input
            v-model="formData.field102"
            placeholder="请输入节点编号"
            disabled
            clearable
            :style="{width: '100%'}"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="节点类型" prop="field104">
          <el-radio-group v-model="formData.field104" size="medium">
            <el-radio
              v-for="(item, index) in field104Options"
              :key="index"
              :label="item.value"
              :disabled="item.disabled"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="币种" prop="field105">
          <el-radio-group v-model="formData.field105" size="medium">
            <el-radio v-for="(item, index) in field105Options" :key="index" :label="item.value"
              :disabled="item.disabled">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="费率" prop="field106">
          <el-radio-group v-model="formData.field106" size="medium">
            <el-radio v-for="(item, index) in field106Options" :key="index" :label="item.value"
              :disabled="item.disabled">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="资金池地址" prop="field107">
            <el-select v-model="formData.field107" placeholder="请选择资金池地址" clearable :style="{width: '100%'}">
              <el-option v-for="(item, index) in field107Options" :key="index" :label="item.label" :value="item.value"
                :disabled="item.disabled"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="简介" prop="field108">
          <el-input
            v-model="formData.field108"
            type="textarea"
            placeholder="请输入简介"
            :autosize="{minRows: 4, maxRows: 4}"
            :style="{width: '100%'}"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="handelConfirm">确定</el-button>
        <el-button @click="close">重置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { Index } from './index'
@Component({
  name: 'Index'
})
export default class extends Index {}
</script>
<style lang="scss" >
// todo moves to the overall style of the element
.dashboard-container{
  .el-card__body{
    background: #F8F8F9;
    padding: 0px 0px;
  }
  .pagination{
    padding: 10px 10px;
  }
  .el-pagination{
    .el-icon-more,.btn-prev,.btn-next,.number{
      background: none !important;
    }
  }
  .table-sub{
    margin: 0px 5px;
  }
}

</style>
