<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>农产品追溯信息系统</el-breadcrumb-item>
      <el-breadcrumb-item>特色农产品管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 添加区域 -->
      <div>
        <el-button type="primary" size="small" icon="el-icon-circle-plus" @click="addRow">添加</el-button>

        <el-select
          allow-create
          filterable
          v-model="listQuery.productCategory"
          size="small"
          placeholder="产品分类"
          clearable
          class="filter-item"
          style="width: 130px;margin-left: 2rem"
        >
          <el-option v-for="item in productOptions" :key="item" :label="item" :value="item" />
        </el-select>
        <el-button
          class="filter-item"
          size="small"
          type="primary"
          style=";margin-left: 0.5rem"
          icon="el-icon-search"
          @click="handleFilter()"
        >
          查询
        </el-button>
      </div>
      <!-- 表格显示区域 -->
      <el-table
        v-loading="listLoading"
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
            {{ (listQuery.page - 1) * listQuery.size + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="产品名称" width="120">
          <template slot-scope="scope">
            <el-link type="primary" :underline="false" @click="editRow(scope.row)">{{ scope.row.name }}</el-link>
          </template>
        </el-table-column>
        <el-table-column align="center" label="产品分类" width="160">
          <template slot-scope="scope">
            {{ scope.row.allType }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="描述" min-width="160">
          <template slot-scope="scope">
            <el-popover placement="top-start" title="描述" width="250" trigger="hover">
              <div>{{ scope.row.description }}</div>
              <span
                slot="reference"
                v-if="scope.row.hasOwnProperty('description') && JSON.stringify(scope.row.description).length > 20"
                >{{ scope.row.description.substr(0, 30) }}...
              </span>
              <span v-else slot="reference">
                {{ scope.row.description }}
              </span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column align="center" label="产品图片" width="260">
          <template slot-scope="scope">
            <div class="products-img-container">
              <el-image
                :preview-src-list="handleImgUrl(scope.row.imgLists)"
                v-for="url in scope.row.imgLists"
                :key="url.path"
                :src="'http://' + url.path"
                lazy
              ></el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="info" size="mini" icon="el-icon-edit" @click="editRow(scope.row)">编辑 </el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteRow(scope.row.id)"
              >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQuery.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="listQuery.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 新增编辑对话框 -->
    <el-dialog
      v-cloak
      title="优质农产品信息"
      @close="closeDialog()"
      center
      :visible.sync="dialogShow"
      top="7vh"
      width="70%"
      class="row-form"
    >
      <el-form :model="row" label-width="100px" class="demo-ruleForm" :rules="rules" ref="row">
        <el-tabs type="border-card">
          <el-tab-pane label="基本信息">
            <el-row>
              <el-col :span="12">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="产品分类:" prop="productCategory">
                      <el-select v-model="row.allType" clearable style="width: 100%" placeholder="请选择产品分类">
                        <el-option v-for="item in productOptions" :key="item" :label="item" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="产品名称:" prop="productName">
                      <el-select
                        v-model="row.name"
                        filterable
                        allow-create
                        style="width: 100%"
                        placeholder="请输入产品名称关键词"
                      >
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="24">
                    <el-form-item label="描述:" prop="description">
                      <el-input
                        v-model="row.description"
                        clearable
                        type="textarea"
                        :autosize="{ minRows: 10, maxRows: 10 }"
                        placeholder="请输入产品描述"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12" class="register-upload">
                <el-form-item label="产品图片:">
                  <el-upload
                    :action="updateUrl"
                    :http-request="httpRequest"
                    :before-upload="beforeAvatarUpload"
                    :on-preview="handleProductPreview"
                    :on-remove="handleProductRemove"
                    :on-change="handleProductChange"
                    list-type="picture-card"
                    :file-list="fileProductList"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <!-- 农产品图片预览 -->
                  <el-dialog :visible.sync="dialogProductVisible" width="70%" top="5vh" :append-to-body="true">
                    <img width="100%" :src="imageUrl" alt="" />
                  </el-dialog>

                  <div class="upload-div">
                    <div class="upload-div-list" v-for="(item, index) of imgRemoveLists" :key="index">
                      <div class="upload-div-top">
                        <span class="upload-div-del" @click="fileDelIdPhoto(index, item.id)">X</span>
                      </div>
                      <el-image
                        class="el-image-preview"
                        :src="'http://' + item.path"
                        :preview-src-list="srcList"
                      ></el-image>
                    </div>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="三品一标认证"></el-tab-pane>
        </el-tabs>

        <span class="t-btn">
          <el-button type="info" @click="dialogShow = false">取 消</el-button>
          <el-button type="success" @click="submitRow()">提 交</el-button>
        </span>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import userService from '@/globals/service/user.js';
import { Debounce } from '@/utils/tool.js';
export default {
  data() {
    return {
      //提交状态
      flag: 'add',
      productList: [],
      options: [],
      // 搜索条件
      listQuery: {
        page: 1,
        size: 10
      },
      // 总数
      total: 0,
      // 表单高度
      curHeight: 0,
      // 对话框
      dialogShow: false,
      listLoading: false,
      // 表单
      rows: [],
      row: {
        id: '', //农产品的id
        name: '', // 产品名称
        allType: '', // 产品分类
        description: '', //描述
        imgLists: [] //图片列表
      },
      //编辑删除图片id的数组
      deleteIds: [],
      // 预览图片src列表
      srcList: [],
      dialogProductVisible: false,
      productRemoveListPhoto: [],
      imgRemoveLists: [],
      //上传图片文件列表
      fileProductList: [],
      // 图片文件上传
      updateUrl: '#',
      imageUrl: '',
      // 多选框
      productOptions: ['蔬菜', '粮食作物', '其他'],
      // 验证规则
      rules: {
        allType: [{ required: true, message: '请选择产品分类', trigger: 'blur' }],
        name: [{ required: true, message: '请输入产品名称', trigger: 'blur' }],
        description: [{ required: true, message: '请输入产品描述', trigger: 'blur' }]
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
    getAllList() {
      this.listLoading = true;
      let params = this.listQuery;
      userService.featureProductsList(params).then(res => {
        if (res.status !== 200) return this.$message.error('获取失败');
        this.rows = res.data.rows;
        this.listLoading = false;
        this.total = res.data.total;
      });
    },
    //图片预览url处理
    handleImgUrl(data) {
      let imgList = [];
      data.map(item => {
        imgList.push('http://' + item.path);
      });

      return imgList;
    },
    // 查询
    handleFilter() {
      this.listQuery.page = 1;
      this.getAllList();
    },
    // 当前页
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getAllList();
    },
    // 每页多少条
    handleSizeChange(val) {
      this.listQuery.size = val;
      this.getAllList();
    },
    // 设定表格高度
    setTableHeight() {
      let h = document.documentElement.clientHeight || document.body.clientHeight;
      this.curHeight = h - 280;
    },
    //农产品图片预览对话框
    handleProductPreview(file) {
      this.imageUrl = file.url;
      this.dialogProductVisible = true;
    },
    //删除要上传列表中的图片
    handleProductRemove(file, fileLists) {
      for (let i in this.productRemoveListPhoto) {
        if (this.productRemoveListPhoto[i].key == file.uid) {
          this.productRemoveListPhoto.splice(i, 1);
        }
      }
      this.fileProductList = fileLists;
    },
    //上传图片列表文件
    handleProductChange(file, fileList) {
      this.fileProductList = fileList;
    },
    //删除已上传的图片
    fileDelIdPhoto(index, id) {
      this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleteIds.push(id);
          this.imgRemoveLists.splice(index, 1);
        })
        .catch(() => {
          this.$message({
            duration: 1000,
            type: 'info',
            message: '已取消操作'
          });
        });
    },
    // 处理图片
    httpRequest(data) {
      let rd = new FileReader(); // 创建文件读取对象
      let file = data.file;
      rd.readAsDataURL(file); // 文件读取装换为base64类型
      rd.onloadend = function() {
        this.imageUrl = this.result; // this指向当前方法onloadend的作用域
      };
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPng = file.type === 'image/png';
      if (!isJPG && !isPng) {
        this.$message.error('上传图片格式只能为.jpg或.png!');
      }
      // const isLt10M = file.size / 1024 / 1024 < 10;
      // if (!isLt10M) {
      //     this.$message.error('上传头像图片大小不能超过 10MB!');
      // }
      return isJPG || isPng;
    },
    // 添加
    addRow() {
      this.flag = 'add';
      this.dialogShow = true;
    },
    // 编辑
    editRow(row) {
      this.flag = 'edit';
      this.row = row;
      this.imgRemoveLists = row.imgLists;
      row.imgLists.map(item => {
        this.srcList.push('http://' + item.path);
      });
      this.dialogShow = true;
    },
    // 删除
    async deleteRow(ids) {
      const confirmResult = await this.$confirm('此操作将删除该特色农产品,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err);
      if (confirmResult !== 'confirm') return this.$message.info('已经取消删除');
      userService.featureProductDel(ids).then(res => {
        if (res.status !== 200) return this.$message.error('删除特色农产品失败');
        this.$message.success('删除特色农产品成功');
        this.getAllList();
      });
    },
    // 关闭对话框
    closeDialog() {
      this.row = {};
      this.fileProductList = [];
      this.imgRemoveLists = [];
      this.deleteIds = [];
      this.$refs.row.clearValidate();
      this.getAllList();
    },
    // 提交数据
    submitRow: Debounce(function() {
      if (this.flag === 'add') {
        this.$refs.row.validate(valid => {
          if (!valid) return this.$message.error('信息填写不完整或不准确，请检查再提交！');
          let formData = new FormData();
          formData.append('name', this.row.name);
          formData.append('allType', this.row.allType);
          formData.append('description', this.row.description);
          this.fileProductList.foreach(item => {
            formData.append('files', item.raw);
          });
          userService
            .featureProductAdd(formData)
            .then(res => {
              if (res.status !== 200) return this.$message.error('失败');
              this.$message.success('新增成功');
              // 隐藏对话框
              this.dialogShow = false;
              // 重新获取文章
              this.getAllList();
            })
            .catch(() => {
              this.$message({ type: 'error', message: '异常' });
            });
        });
      } else if (this.flag === 'edit') {
        let formData = new FormData();
        formData.append('id', this.row.id);
        formData.append('name', this.row.name);
        formData.append('allType', this.row.allType);
        formData.append('description', this.row.description);
        this.deleteIds.map(item => {
          formData.append('delIds', item);
        });

        this.fileProductList.forEach(item => {
          formData.append('files', item.raw);
        });
        userService
          .featureProductEdit(formData)
          .then(res => {
            if (res.status !== 200) return this.$message.error('失败');
            this.$message.success('更新成功');
            // 隐藏对话框
            this.dialogShow = false;
            // 重新获取文章
            this.getAllList();
          })
          .catch(() => {
            this.$message({ type: 'error', message: '异常' });
          });
      }
    }, 3000)
  }
};
</script>

<style lang="less" scoped>
.upload-div {
  width: 350px;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-wrap: wrap;
}

.upload-div-del {
  cursor: pointer;
}

.upload-div-del:hover {
  color: #64b7ff;
}

.link-type,
.link-type:focus {
  color: #337ab7;
  cursor: pointer;

  & :hover {
    color: rgb(32, 160, 255);
  }
}

.products-img-container {
  height: 100px;
  padding: 10px;
  overflow: auto;
}

.el-image-preview {
  width: 100px;
  height: 100px;
  margin-right: 10px;
}
</style>
