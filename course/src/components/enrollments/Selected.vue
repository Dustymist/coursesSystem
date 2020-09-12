<template>
  <el-container v-show="this.$store.state.studentType">
    <el-aside><topbar></topbar></el-aside>
    <el-main>
      <vxe-toolbar custom print :refresh="{ query: selectedItem }">
      </vxe-toolbar>

      <vxe-table :data="selectedList" show-footer :footer-method="footerMethod">
        <vxe-table-column type="seq" width="60"></vxe-table-column>
        <vxe-table-column type="checkbox" width="60"></vxe-table-column>

        <vxe-table-column
          field="courseId"
          title="课程编号"
          sortable
          width="100"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.courseId }}</span>
          </template>
        </vxe-table-column>

        <vxe-table-column field="courseName" title="课程名称" sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.courseName }}</span>
          </template>
        </vxe-table-column>

        <vxe-table-column field="courseInstitution" title="教学学院" sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.courseInstitution }}</span>
          </template>
        </vxe-table-column>

        <vxe-table-column field="courseLecturer" title="教学老师" sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.courseLecturer }}</span>
          </template>
        </vxe-table-column>

        <vxe-table-column field="courseScore" title="课程学分" sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.courseScore }}</span>
          </template>
        </vxe-table-column>

        <vxe-table-column field="courseResult" title="我的成绩" sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.courseResult }}</span>
          </template>
        </vxe-table-column>

        <vxe-table-column title="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small">详细信息</el-button>

            <el-button
              type="text"
              size="small"
              v-if="checkReg(scope.row.courseId)"
              @click="register(scope.row)"
              >注册课程</el-button
            >
            <el-button
              type="text"
              size="small"
              v-else
              @click="cancel(scope.row)"
              style="color:red"
              >取消课程</el-button
            >
          </template>
        </vxe-table-column>
      </vxe-table>
    </el-main>
  </el-container>
</template>

<script>
import topbar from "../Topbar.vue";
import "xe-utils";
import XEUtils from "xe-utils";
import { mapState } from "vuex";

export default {
  data() {
    return {
      selectedList: []
    };
  },
  created: function() {
    this.selectedItem();
  },
  methods: {

    locate(){
      //取得一个学号数组
      let studentIdList= this.students.map(item => item.studentId)
      //定位索引
      let index = studentIdList.indexOf(this.$store.state.currentStudentId)
      return index
    },

    footerMethod({ columns, data }) {
      const means = [];
      const sums = [];
      const others = [];
      //console.log({ columns, data });
      columns.forEach((column, columnIndex) => {
        if (columnIndex === 0) {
          means.push("平均");
          sums.push("总修学分");
          others.push("GPA");
        } else {
          let meanCell = null;
          let sumCell = null;
          let otherCell = null;

          let courseScoreSum = 0;
          switch (column.property) {
            case "courseResult":
              for (let i = 0; i <= data.length - 1; i++) {
                otherCell += data[i].courseScore * this.toPoint(data[i].courseResult);
                //console.log(data[i].courseScore,this.toPoint(data[i].courseResult));
                courseScoreSum += parseInt(data[i].courseScore);
                //console.log(courseScoreSum);
              }
              otherCell = (otherCell / courseScoreSum).toFixed(2);
              break;
              case "courseScore":
                sumCell = XEUtils.sum(data, column.property)
                break;
          }
          means.push(meanCell);
          sums.push(sumCell);
          others.push(otherCell);
        }
      });
      // 返回一个二维数组的表尾合计
      return [means, sums, others];
    },

    //bug
    toPoint(score) {
      let point = 0;
      if (score >= 90) point = 4;
      else if (score >= 85 && score < 90) point = 3.7;
      else if (score >= 82 && score < 85) point = 3.3;
      else if (score >= 78 && score < 82) point = 3.0;
      else if (score >= 75 && score < 78) point = 2.7;
      else if (score >= 72 && score < 75) point = 2.3;
      else if (score >= 68 && score < 72) point = 2.0;
      else if (score >= 64 && score < 68) point = 1.5;
      else if (score > 60 && score < 64) point = 1.3;
      else if (score == 60) point = 1.0;
      else if (score < 60) point = 0;
      return point;
    },

    selectedItem() {
      //功能:向selectedList里面导入 courseId,courseName,courseInstitution,courseLecturer,courseScore,courseResult
      //这些数据来自resultList 

      //找到当前的学生
      let index = this.locate()
      let studentId = this.students[index].studentId

      //拿出该学生已注册的课程编号
      let regIdList =this.students[index].regId

      //获取对应课程编号的课程学院和课程教师
      let courseIdList_All = this.courses.map(item => item.courseId)
      let institutionList_All = this.courses.map(item => item.courseInstitution)
      let lecturerList_All = this.courses.map(item => item.courseLecturer)

      let institutionList =[]
      let lecturerList=[]
      for(let i=0;i<regIdList.length;i++){
        if(courseIdList_All.indexOf(regIdList[i]) != -1){
          let index_id = courseIdList_All.indexOf(regIdList[i])
          institutionList.push(institutionList_All[index_id])
          lecturerList.push(lecturerList_All[index_id])
        }
      }

      //创建该学生的primaryKeyList
      let primaryKeyList = regIdList.map(item => studentId.toString() + item)

      //创建resultList的primaryKeyList_All
      let primaryKeyList_All = this.resultList.map(item => item.primaryKey)


      //用primaryKey从resultList取出数据,并push入selectedList
      for(let i=0; i<primaryKeyList.length;i++){
        let primaryKey = primaryKeyList[i]
        if(primaryKeyList_All.indexOf(primaryKey) != -1){

          let index_pk = primaryKeyList_All.indexOf(primaryKey)
          //Object.assign(this.selectedList,this.resultList[index_pk])

          this.selectedList.push({
            courseId: this.resultList[index_pk].courseId,
            courseName: this.resultList[index_pk].courseName,
            courseInstitution:institutionList[i],
            courseLecturer:lecturerList[i],
            courseScore:this.resultList[index_pk].courseScore,
            courseResult:this.resultList[index_pk].courseResult,
          })

        }
      }
    },

    checkReg(id) {
      //通过遍历定位学生,输出index
      let index = "";
      let studentFound = false;
      for (let i = 0; i < this.students.length - 1; i++) {
        if (
          this.students[i].studentId ==
          this.currentStudentId
        ) {
          index = i;
          studentFound = true;
        }
      }

      if (studentFound == false) {
        console.log("未找到学生");
        return true;
      }

      if (this.students[index].regId.indexOf(id) != -1) {
        //找到有重复的
        return false;
      } else {
        //未找到有重复的
        return true;
      }
    },

    register(row){
      //获得当前学生的索引
      let index = this.locate()

      //写入数据到students中的regId和regCourse中
      this.students[index].regId.push(row.courseId)
      this.students[index].regCourse.push(row.courseName)
      //console.log(this.students[index])

      //增加一个resultList元素
      this.resultList.push({
        primaryKey:this.students[index].studentId + row.courseId,
        studentId: this.students[index].studentId,
        studentName: this.students[index].studentName,
        courseId: row.courseId,
        courseName: row.courseName,
        courseScore: row.courseScore,
        courseResult:''
        })
      console.log(this.resultList)

      //本门课程的注册人数增加1
      let courseId = row.courseId
      let courseIdList = this.courses.map(item => item.courseId.toString())
      for(let i=0;i<this.courses.length;i++){
        if(courseIdList.indexOf(row.courseId.toString()) != -1){
          let index_id = courseIdList.indexOf(row.courseId.toString())
          this.courses[index_id].courseSize ++
        }
      }
      
    },

    cancel(row) {
      //获得当前学生的索引
      let index = this.locate()

      console.log(row)
      //查询该课程是否已经锁定
      
      if(this.students[index].lockedId.indexOf(row.courseId.toString())!=-1){
        alert('课程已锁定,无法取消')
      }else{//执行删除操作
        //删除regId数组中对应的courseId
        let index_regId = this.students[index].regId.indexOf(row.courseId)
        this.students[index].regId.splice(index_regId,1)
        //删除regCourse数组中对应的courseName
        let index_regName = this.students[index].regCourse.indexOf(row.courseName)
        this.students[index].regCourse.splice(index_regName,1)

        //删除对应的resultList元素
        let primaryKeyList = this.resultList.map(item => item.primaryKey)
        let primaryKey= this.students[index].studentId + row.courseId
        let index_primaryKey= primaryKeyList.indexOf(primaryKey)
        this.resultList.splice(index_primaryKey,1)

        //本门课程的注册人数减少1
        let courseIdList = this.courses.map(item => item.courseId.toString())
        for(let i=0;i<this.courses.length;i++){
          if(courseIdList.indexOf(row.courseId.toString()) != -1){
            let index_id = courseIdList.indexOf(row.courseId.toString())
            this.courses[index_id].courseSize --
          }
        }

      }
    }
  },

  computed:{
    ...mapState(["students"]),
    ...mapState(["currentStudentId"]),
    ...mapState(["courses"]),
    ...mapState(["resultList"])
    
  },
  components: {
    topbar
  }
};
</script>

<style scoped></style>
