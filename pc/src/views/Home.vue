<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/img/logo.png">
    <Hi :msg="title"/>
    <!-- 测试上传图片 -->
    
    <upload action="123" ref="upload" :imgUrl="img"></upload>
    <div class="box">全局按钮</div>
    <el-button @click="upload">上传</el-button>

    <el-button @click="add({num: 1})" type="primary">vuex-total: <em>{{total}}</em></el-button>
    <el-table
    :data="tableData"
    style="width: 100%"
    max-height="250">
    <el-table-column
      fixed
      prop="date"
      label="日期"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="province"
      label="省份"
      width="120">
    </el-table-column>
    <el-table-column
      prop="city"
      label="市区"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      width="300">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="邮编"
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small">
          移除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  
  </div>
</template>

<script>
// @ is an alias to /src
import Hi from '@/components/Hi.vue'
import Upload from '@/components/upload'
import { mapState, mapMutations, mapActions } from 'vuex'
import { isIe } from 'utils/common'

export default {
  name: 'home',

  components: {
    Hi,
    Upload
  },

  data() {
    return {
      title: 'Welcome to OpenCoder For PC',
      img: 'https://img3.mukewang.com/59964eb600012d9a06400640-100-100.jpg',
      tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
    }
  },

  computed: {
    ...mapState(['total'])
  },

  created() {
    console.log(isIe);
    this.upload();
  },

  methods: {
    ...mapMutations([
      'add'
    ]),
    deleteRow(index, rows) {
        rows.splice(index, 1);
      },
    upload() {
      this.img = '';
      this.$refs.upload.submitUpload()
    }
  }
}
</script>

<style lang="stylus">
  .box
    border-radius(6px)
    font-size: fs14
    width: 100px
    color: #fff
    background-color: #000
</style>

