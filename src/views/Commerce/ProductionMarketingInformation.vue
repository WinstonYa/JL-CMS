<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>电子商务子系统</el-breadcrumb-item>
      <el-breadcrumb-item>农产品产销信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 添加区域 -->
      <div>
        <el-button type="primary" size="small" icon="el-icon-circle-plus" @click="addRow">添加产销信息 </el-button>
      </div>
      <!-- 表格显示区域 -->
      <el-table
        :data="rows"
        border
        stripe
        fit
        highlight-current-row
        :row-style="{ height: '5px' }"
        :cell-style="{ padding: '5px 0' }"
        :height="curHeight"
      >
        <el-table-column align="center" label="序号" width="60">
          <template slot-scope="scope">
            {{ (listQuery.page - 1) * listQuery.limit + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="标题" min-width="160">
          <template slot-scope="scope">
            <el-tooltip effect="light" :content="scope.row.title" placement="top">
              <el-link type="primary" :underline="false" @click="editRow(scope.row)">{{ scope.row.title }}</el-link>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column align="center" label="产品分类" width="160">
          <template slot-scope="scope">
            {{ scope.row.productCategory }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="阅读量" width="120">
          <template slot-scope="scope">
            {{ scope.row.reading }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="来源" width="160">
          <template slot-scope="scope">
            {{ scope.row.source }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="发布时间" width="160">
          <template slot-scope="scope">
            {{ scope.row.pubTime }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="作者" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="发布状态" width="120">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status !== '待发布'"
              type="success"
              size="mini"
              @click="handleModifyStatus(scope.row, '待发布')"
            >
              已发布
            </el-button>
            <el-button
              v-if="scope.row.status !== '已发布'"
              type="danger"
              size="mini"
              @click="handleModifyStatus(scope.row, '已发布')"
            >
              待发布
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="success" icon="el-icon-edit" @click="editRow(scope.row)">编辑 </el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteRow(scope.row)">删除 </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQuery.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 新增编辑对话框 -->
    <el-dialog
      v-cloak
      title="农产品产销信息"
      @close="closeDialog"
      center
      :visible.sync="dialogShow"
      top="7vh"
      width="60%"
      class="row-form"
    >
      <el-form :model="row" label-width="100px" class="demo-ruleForm" :rules="rules" ref="row">
        <el-tabs type="border-card">
          <el-tab-pane label="基本信息">
            <el-row>
              <el-col :span="12">
                <el-form-item label="产品分类:" prop="productCategory">
                  <!-- <el-input v-model="row.productCategory" clearable maxlength="50" placeholder="请输入产品分类"></el-input> -->
                  <el-select v-model="row.productCategory" clearable style="width: 100%" placeholder="请选择产品分类">
                    <el-option v-for="item in productOptions" :key="item" :label="item" :value="item"> </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="阅读量:">
                  <el-input
                    v-model="row.reading"
                    clearable
                    onkeyup="this.value=this.value.replace(/[^\d]/g,'')"
                    maxlength="20"
                    placeholder="请输入阅读量"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="文章来源:" prop="source">
                  <el-input v-model="row.source" clearable maxlength="20" placeholder="请输入文章来源"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="文章作者:" prop="author">
                  <el-input v-model="row.author" clearable maxlength="20" placeholder="请输入文章作者"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="发布时间:" prop="pubTime">
                  <el-date-picker v-model="row.pubTime" type="datetime" style="width: 100%" placeholder="选择发布时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="文章状态:" prop="status">
                  <el-radio v-model="row.status" label="已发布">已发布 </el-radio>
                  <el-radio v-model="row.status" label="待发布">待发布 </el-radio>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="文章信息">
            <el-row>
              <el-col :span="24">
                <el-form-item label="文章标题:" prop="title">
                  <el-input v-model="row.title" clearable maxlength="50" placeholder="请输入文章标题"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="文章内容:" prop="content">
                  <quill-editor class="editor" ref="myTextEditor" v-model="row.content" :options="editorOption">
                  </quill-editor>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>

        <span class="t-btn">
          <el-button type="info" @click="dialogShow = false">取 消</el-button>
          <el-button type="success" @click="submitRow">提 交</el-button>
        </span>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import userService from '../../globals/service/user';

export default {
  data() {
    return {
      //提交状态,是提交还是编辑
      flag: 'add',
      // 搜索条件
      listQuery: {
        page: 1,
        limit: 10,
        type: '产销信息'
      },
      total: 0,
      // 表单高度
      curHeight: 0,
      // 对话框
      dialogShow: false,
      // 表单
      rows: [],
      //loading
      listLoading: false,
      row: {
        title: '', // 标题
        productCategory: '', // 产品分类
        reading: 0, // 阅读量
        status: '已发布', // 状态
        type: '产销信息', //类型（产销信息或者市场行情）
        content: '' // 内容
      },
      // 多选框
      productOptions: ['粮油', '蔬菜', '水果', '牛羊猪肉', '家禽蛋类', '水产品', '其他'],
      articleList: [], //
      // 富文本
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
            ['blockquote', 'code-block'], // 引用  代码块
            [{ header: 1 }, { header: 2 }], // 1、2 级标题
            [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
            [{ script: 'sub' }, { script: 'super' }], // 上标/下标
            [{ indent: '-1' }, { indent: '+1' }], // 缩进
            // [{'direction': 'rtl'}],                         // 文本方向
            [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
            [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
            [{ font: [] }], // 字体种类
            [{ align: [] }], // 对齐方式
            ['clean'], // 清除文本格式
            ['link', 'image', 'video'] // 链接、图片、视频
          ] //工具菜单栏配置
        },
        placeholder: '请在这里添加文章内容', //提示
        readyOnly: false, //是否只读
        theme: 'snow', //主题 snow/bubble
        syntax: true //语法检测
      },
      // 验证规则
      rules: {
        title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入文章内容', trigger: 'blur' }],
        productCategory: [{ required: true, message: '请选择产品分类', trigger: 'blur' }],
        source: [{ required: true, message: '请输入文章来源', trigger: 'blur' }],
        pubTime: [{ required: true, message: '请选择发布时间', trigger: 'blur' }],
        author: [{ required: true, message: '请输入作者', trigger: 'blur' }],
        status: [{ required: true, message: '请输入状态', trigger: 'blur' }]
      }
    };
  },
  created() {
    this.getAllList();
    this.setTableHeight();
    window.onresize = () => {
      this.setTableHeight();
    };
  },
  methods: {
    // 获取全部的列表数据
    async getAllList() {
      this.row.type = '产销信息';
      let params = this.listQuery;
      this.listLoading = true;
      userService.getMarketingListByPage(params).then(res => {
        if (res.status !== 200) return this.$message.error('获取失败');
        this.listLoading = false;
        this.rows = res.data.rows;
        this.total = res.data.total;
      });
    },
    // 富文本编辑器
    // 失去焦点
    // onEditorBlur(editor) {
    // },
    // 获得焦点
    // onEditorFocus(editor) {
    // },
    // 开始
    // onEditorReady(editor) {
    // },
    // 值发生变化
    // onEditorChange(editor) {
    //   this.row.content = editor.html;
    //   console.log(editor);
    // },
    // 每页多少条
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getAllList();
    },
    // 修改审核状态
    handleModifyStatus(row, status) {
      this.$confirm(`是否将审核状态修改为 ${status} ?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // console.log(row, status);
          row.status = status;
          userService.updateMarketingInfo(row).then(res => {
            if (res.status === 200) {
              this.$message({
                message: `操作成功，已修改为${status}`,
                type: 'success'
              });
            }
          });
        })
        .catch(() => {
          this.$message({ type: 'info', message: '已取消操作' });
        });
    },
    // 当前页
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getAllList();
    },
    // 设定表格高度
    setTableHeight() {
      let h = document.documentElement.clientHeight || document.body.clientHeight;
      this.curHeight = h - 280;
    },
    // 新增
    addRow() {
      this.row.reading = 0;
      this.row.status = '已发布';
      this.row.type = '产销信息';
      console.log(this.row);
      this.dialogShow = true;
    },
    // 编辑
    editRow(row) {
      this.flag = 'edit';
      this.row = row;
      this.dialogShow = true;
    },
    // 删除
    deleteRow(row) {
      console.log(row);
      // 弹出删除确认框
      this.$confirm('此操作将删除一条产销信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.listLoading = true;
          this.delMarketingInfo(row.id);
        })
        .catch(() => {
          this.$message({ type: 'info', message: '已取消删除' });
        });
    },
    // 关闭对话框
    closeDialog() {
      this.row = {};
      this.$refs.row.clearValidate();
    },
    // 提交数据
    submitRow() {
      if (this.flag === 'add') {
        this.$refs.row.validate(async valid => {
          if (!valid) return this.$message.error('信息填写不完整或不准确，请检查再提交！');
          this.row.pubTime = this.$moment(new Date(this.row.pubTime)).format('YYYY-MM-DD HH:mm:ss');
          console.log(this.row.pubTime);
          userService.addMarketingInfo(this.row).then(res => {
            if (res.status !== 200) return this.$message.error('失败');
            this.$message.success('新增一条产销信息成功');
          });
          // 隐藏新增的对话框
          this.dialogShow = false;
          // 重新获取列表
          this.getAllList();
        });
      } else if (this.flag === 'edit') {
        console.log(this.row);
        this.editMarketingSubmit();
      }
    },
    //编辑的提交
    async editMarketingSubmit() {
      this.listLoading = true;
      userService.updateMarketingInfo(this.row).then(res => {
        if (res.status !== 200) return this.$message.error('更新失败');
        this.listLoading = false;
      });
      // 关闭对话框
      this.dialogShow = false;
      // 刷新数据列表
      this.getAllList();
      // 提醒更新成功
      this.$message.success('更新成功');
    },
    // 删除
    async delMarketingInfo(id) {
      this.listLoading = true;
      userService.delMarketingInfoById(id).then(res => {
        if (res.status !== 200) return this.$message.error('删除失败');
        this.listLoading = false;
      });
      // 关闭对话框
      this.dialogShow = false;
      // 刷新数据列表
      this.getAllList();
      // 提醒删除成功
      this.$message.success('删除成功');
    }
  }
};
</script>

<style lang="less" scoped></style>
