<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>电子商务子系统</el-breadcrumb-item>
      <el-breadcrumb-item>价格行情管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 添加区域 -->
      <div>
        <el-button type="primary" size="small" icon="el-icon-circle-plus" @click="addRow">录入价格</el-button>
        <el-button type="primary" size="small" icon="el-icon-circle-plus" @click="importByExcel">Excel导入 </el-button>
      </div>
      <!-- 表格显示区域 -->
      <el-table
        :data="priceList"
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
        <el-table-column align="center" label="产品名称" min-width="160">
          <template slot-scope="scope">
            <el-tooltip effect="light" :content="scope.row.productName" placement="top">
              <el-link type="primary" :underline="false" @click="editRow(scope.row)">{{
                scope.row.productName
              }}</el-link>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column align="center" label="产品分类" width="160">
          <template slot-scope="scope">
            {{ scope.row.productCategory }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="价格" width="120">
          <template slot-scope="scope">
            {{ scope.row.price }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="最高价" width="120">
          <template slot-scope="scope">
            {{ scope.row.highestPrice }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="最低价" width="120">
          <template slot-scope="scope">
            {{ scope.row.lowestPrice }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="报价时间" width="160">
          <template slot-scope="scope">
            {{ scope.row.offerTime }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="采集点" width="160">
          <template slot-scope="scope">
            {{ scope.row.collectionPoint }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="报价员" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.pricingOffer }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="info" size="mini" icon="el-icon-edit" @click="editRow(scope.row)">编辑 </el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteRow(scope.row)">删除 </el-button>
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
      title="价格行情信息"
      @close="closeDialog"
      center
      :visible.sync="dialogShow"
      top="7vh"
      width="50%"
      class="row-form"
    >
      <el-form :model="form" label-width="100px" class="demo-ruleForm" :rules="rules" ref="row">
        <el-tabs type="border-card">
          <el-tab-pane label="价格信息">
            <el-row>
              <el-col :span="12">
                <el-form-item label="产品分类:" prop="productCategory">
                  <!-- <el-input v-model="row.productCategory" clearable maxlength="50" placeholder="请输入产品分类"></el-input> -->
                  <el-select
                    v-model="form.productCategory"
                    clearable
                    style="width: 100%"
                    placeholder="请选择产品分类"
                    @change="getDic"
                  >
                    <el-option v-for="item in productOptions" :key="item" :label="item" :value="item"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="产品名称:">
                  <el-select
                    v-model="form.productName"
                    filterable
                    style="width: 100%"
                    placeholder="请输入产品名称关键词"
                  >
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="产品报价:" prop="source">
                  <el-input v-model="form.price" clearable maxlength="20" placeholder="请输入产品报价"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="发布时间:" prop="pubTime">
                  <el-date-picker
                    v-model="form.offerTime"
                    type="datetime"
                    style="width: 100%"
                    placeholder="选择报价时间"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="采价地点:" prop="pubTime">
                  <el-input
                    v-model="form.collectionPoint"
                    clearable
                    maxlength="20"
                    placeholder="请输入采价地点"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="报价员:" prop="pubTime">
                  <el-input v-model="form.pricingOffer" clearable maxlength="20" placeholder="请输入报价员"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="最高价:" prop="pubTime">
                  <el-input v-model="form.highestPrice" clearable maxlength="20" placeholder="请输入最高价"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="最低价:" prop="pubTime">
                  <el-input v-model="form.lowestPrice" clearable maxlength="20" placeholder="请输入最低价"></el-input>
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
    <!--  删除提示框-->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import userService from '../../globals/service/user';

export default {
  data() {
    return {
      productList: [],
      options: [],
      //提交状态,是提交还是编辑
      flag: 'add',
      // 搜索条件
      listQuery: {
        page: 1,
        limit: 10
      },
      total: 0,
      // 表单高度
      curHeight: 0,
      // 对话框
      dialogShow: false,
      // 删除提示框
      dialogVisible: false,
      //loading
      listLoading: false,
      // 表单
      form: {
        id: '',
        productName: '', //产品名称
        highestPrice: '', //最高价
        lowestPrice: '', // 最低价
        price: '', // 价格
        offerTime: '', // 报价时间
        pricingOffer: '', // 报价员
        productCategory: '', // 产品分类
        collectionPoint: '' //采集点
      },
      // 多选框
      productOptions: ['粮油', '蔬菜', '水果', '牛羊猪肉', '家禽蛋类', '水产品', '其他'],
      priceList: [], // 价格行情列表
      // 验证规则
      rules: {
        // title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
        // content: [{ required: true, message: '请输入文章内容', trigger: 'blur' }],
        // productCategory: [{ required: true, message: '请选择产品分类', trigger: 'blur' }],
        // source: [{ required: true, message: '请输入文章来源', trigger: 'blur' }],
        // pubTime: [{ required: true, message: '请选择发布时间', trigger: 'blur' }],
        // author: [{ required: true, message: '请输入作者', trigger: 'blur' }],
        // status: [{ required: true, message: '请输入状态', trigger: 'blur' }]
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
      let params = this.listQuery;
      // const { data: res } = await this.$http.get('/price/listByPage', { params });
      userService.getPriceInfoListByPage(params).then(res => {
        if (res.status !== 200) return this.$message.error('获取失败');
        this.priceList = res.data.rows;
        this.total = res.data.total;
      });
    },
    // 每页多少条
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getAllList();
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
    async getDic(item) {
      console.log(item);
      // const { data: res } = await this.$http.post(`/dic/getDicByType?type=${item}`);
      userService.getProductNameDicByType(item).then(res => {
        if (res.status !== 200) return this.$message.error('获取失败');
        // this.$refs.row.resetFields();
        this.productList = res.data.rows;
        console.log(this.productList);
        this.options = this.productList.map(item => {
          return { value: `${item.text}`, label: `${item.text}` };
        });
        console.log(this.options);
        // this.form.productName = this.options[0].value;
      });
    },
    // 新增
    addRow() {
      this.flag = 'add';
      this.form = {};
      this.dialogShow = true;
    },
    //Excel 导入
    importByExcel() {
      console.log('从excel导入价格行情');
    },
    // 编辑
    editRow(row) {
      this.form = row;
      this.flag = 'edit';
      this.dialogShow = true;
    },
    // 删除
    deleteRow(row) {
      console.log(row);
      // 弹出删除确认框
      this.$confirm('此操作将删除一条价格行情信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.listLoading = true;
          this.delPriceInfo(row.id);
        })
        .catch(() => {
          this.$message({ type: 'info', message: '已取消删除' });
        });
    },
    // 关闭对话框
    closeDialog() {
      this.row = {};
      this.$refs.row.clearValidate();
      this.getAllList();
    },
    // 提交数据
    submitRow() {
      if (this.flag == 'add') {
        console.log('添加');
        this.$refs.row.validate(async valid => {
          if (!valid) return this.$message.error('信息填写不完整或不准确，请检查再提交！');
          console.log(this.$moment(new Date(this.form.offerTime)).format('YYYY-MM-DD HH:mm:ss'));
          this.form.offerTime = this.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
          // const { data: res } = await this.$http.post('/price', this.form);

          userService.addPriceInfo(this.form).then(res => {
            if (res.status !== 200) return this.$message.error('失败');
            this.$message.success('新增一条价格行情成功');
          });
          // 隐藏添加价格行情的对话框
          this.dialogShow = false;
          // 重新获取价格行情列表
          this.getAllList();
        });
      } else if (this.flag == 'edit') {
        console.log('编辑');
        this.editPriceInfoSubmit();
      }
    },
    //编辑价格行情的提交
    async editPriceInfoSubmit() {
      // const { data: res } = await this.$http.put('/price', this.form);
      this.form.offerTime = this.$moment(new Date(this.form.offerTime)).format('YYYY-MM-DD HH:mm:ss');
      userService.updatePriceInfo(this.form).then(res => {
        if (res.status !== 200) return this.$message.error('更新失败');
        // 关闭对话框
        this.dialogShow = false;
        // 刷新数据列表
        this.getAllList();
        // 提醒更新成功
        this.$message.success('更新成功');
      });
    },
    async delPriceInfo(id) {
      // const { data: res } = await this.$http.delete(`/price/${id}`);
      userService.delPriceInfoById(id).then(res => {
        if (res.status !== 200) return this.$message.error('删除失败');
        // 关闭对话框
        this.dialogShow = false;
        // 刷新数据列表
        this.getAllList();
        // 提醒删除成功
        this.$message.success('删除成功');
      });
    }
  }
};
</script>

<style lang="less" scoped></style>
