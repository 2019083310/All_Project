<template>
  <div id="fill">
    <el-steps :active="active" align-center finish-status="success">
      <el-step title="01" description="填写资料"></el-step>
      <el-step title="02" description="选择就医医生和日期"></el-step>
      <el-step title="03" description="确定预约"></el-step>
    </el-steps>
    <el-form
      :model="fillForm"
      status-icon
      :rules="fillRules"
      ref="fillsForm"
      label-width="100px"
      v-show="display_dialog"
    >
      <el-form-item label="姓名:" prop="name">
        <el-input v-model="fillForm.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="身份证号:" prop="identify">
        <el-input v-model="fillForm.identify" disabled></el-input>
      </el-form-item>
      <el-form-item label="手机号:" prop="phone">
        <el-input v-model.number="fillForm.phone" disabled></el-input>
      </el-form-item>
      <el-form-item label="年龄:" prop="age">
        <el-input v-model.number="fillForm.age" disabled></el-input>
      </el-form-item>
    </el-form>
    <div class="block" v-show="doctorDialog">
      <span class="demonstration">请选择相应的医生和就诊日期:</span>
      <el-cascader
        v-model="value"
        :options="options"
        @change="handleChange"
        clearable
      ></el-cascader>
    </div>
    <table border="1px" v-show="endDialog" align="center">
      <tr>
        <td>姓名</td>
        <td>{{ this.fillForm.name }}</td>
        <td>身份证号</td>
        <td>{{ this.fillForm.identify }}</td>
      </tr>
      <tr>
        <td>手机号</td>
        <td>{{ this.fillForm.phone }}</td>
        <td>年龄</td>
        <td>{{ this.fillForm.age }}</td>
      </tr>
      <tr>
        <td>预约医生</td>
        <td>{{ this.value[0] }}</td>
        <td>预约日期时间</td>
        <td>{{ this.value[1] }}</td>
      </tr>
    </table>
    <el-button @click="preStep" v-show="step2">上一步</el-button>
    <el-button @click="nextStep" v-show="step">下一步</el-button>
    <el-button @click="finishReg" v-show="really" id="btn2">确定预约</el-button>
  </div>
</template>

<script>
import { request } from "../../network/request";
export default {
  name: "Reg",
  data() {
    return {
      fillForm: {
        name: "",
        identify: "",
        phone: "",
        age: "",
      },
      fillRules: {
        name: [
          {
            required: true,
            trigger: "blur",
            message: "请填写真实姓名",
          },
          {
            min: 2,
            max: 8,
            trigger: "blur",
            message: "长度在2-8个字符之间",
          },
        ],
        phone: [
          {
            required: true,
            trigger: "blur",
            message: "请填写手机号",
          },
          {
            type: "number",
            message: "手机号必须为数字值",
          },
        ],
        age: [
          {
            required: true,
            trigger: "blur",
            message: "请填写年龄",
          },
          {
            type: "number",
            message: "长度为11个字符",
          },
        ],
        identify: [
          {
            required: true,
            trigger: "blur",
            message: "请填写身份证号",
          },
        ],
      },
      display_dialog: true,
      doctorDialog: false,
      endDialog: false,
      active: 0,
      really: false,
      step: true,
      step2: false,
      options: [],
      size: "",
      value: [],
    };
  },
  methods: {
    preStep() {
      this.active--;
      if (this.active === 1) {
        this.display_dialog = false;
        this.doctorDialog = true;
        this.endDialog = false;
        this.really = false;
        this.step = true;
        this.step2 = true;
      }
      if (this.active === 2) {
        this.doctorDialog = true;
        this.endDialog = false;
        this.display_dialog = false;
        this.really = true;
        this.step2 = true;
        this.step = false;
      }
      if (this.active === 0) {
        this.display_dialog = true;
        this.doctorDialog = false;
        this.endDialog = false;
        this.step2 = false;
        this.really = false;
        this.step = true;
      }
    },
    nextStep() {
      if (this.active === 0) {
        this.$refs.fillsForm.validate((valid) => {
          if (!valid) {
            this.$message.error("请填写信息");
            this.$refs.fillsForm.resetFields();
            return;
          }
        });
      }
      this.display_dialog = false;
      if (this.active++ > 2) {
        this.active = 0;
        this.display_dialog = true;
        this.endDialog = false;
        this.really = false;
      }
      if (this.active === 1) {
        this.doctorDialog = true;
        this.really = false;
        this.step2 = true;
        this.step = true;
      }
      if (this.active === 2) {
        this.doctorDialog = false;
        this.step = false;
        this.step2 = true;
        this.endDialog = true;
        this.really = true;
      }
    },
    finishReg() {
      // this.active++;
      // this.nextStep();
      request({
        url: "/user/reg",
        method: "put",
        data: {
          id: window.sessionStorage.getItem("id"),
          doctor: this.value[0],
          regTime: this.value[1],
          state: "成功预约",
        },
      }).then((res) => {
        if (res.data.data.state === true) {
          this.$message.success(
            "恭喜你，已经成功完成预约挂号,请到预约历史查看挂号信息!"
          );
        } else {
          this.$message.error("抱歉，您已挂号成功，不能再次挂号或着该医生当日预约人数已满，请隔天预约");
        }
        this.display_dialog = true;
        this.endDialog = false;
        this.doctorDialog = false;
        this.really = false;
        this.step = true;
        this.step2 = false;
        this.active = 0;
      });
    },
    getDoctorList() {
      request({
        url: "/doctor/allInfo",
        method: "get",
        params: {
          role: 1,
        },
      }).then((res) => {
        this.options = res.data.data["newArr"];
      });
    },
    handleChange(value) {
      this.$message.success("选择信息成功");
    },
    getUserInfo() {
      request({
        url: "/user/findUserInfo",
        method: "get",
        params: {
          id: window.sessionStorage.getItem("id"),
        },
      }).then((res) => {
        this.fillForm = res.data.data["obj"];
        this.fillForm["phone"] = Number(res.data.data["obj"]["phone"]);
      });
    },
  },
  created() {
    this.getDoctorList();
    this.getUserInfo();
  },
};
</script>

<style>
.el-step {
  margin: 20px auto;
  /* font-size:36px; */
  color: black;
}
#fill .el-form {
  width: 500px;
  margin-top: 20px;
  margin-left: 60px;
}
#fill .el-button {
  margin-left: 160px;
}
#fill .block {
  margin-left: 140px;
  margin-top: 20px;
  margin-bottom: 20px;
}
#fill .el-cascader {
  margin-left: 20px;
}
#fill .demonstration2 {
  margin-left: 1000px;
}
#fill .el-select {
  margin-left: 16px;
}
#fill table {
  width: 600px;
  height: 200px;
  margin-top: 20px;
  margin-left: 120px;
  border-spacing: 0;
  text-align: center;
  border-color: rgb(205, 226, 226);
}
#fill tr td {
  width: 150px;
  height: 50px;
}
#btn2 {
  /* position: absolute; */
  margin-top: 30px;
  margin-left: 100px;
  background-color: rgb(23, 253, 80);
}
</style>