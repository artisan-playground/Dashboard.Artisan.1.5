<template>
  <div class="Vonleave">
    <div>
      <a-tabs default-active-key="Onleave" @change="callback" animated="false">
        <a-tab-pane key="Onleave" tab="ลากิจ">
          <div class="From-leave">
            <p class="title-leave">จำนวนวันลากิจที่เหลือ ... วัน</p>

            <div>
              <p><span>*</span> ประเภทการลา</p>
              <a-input value="ลากิจ" readonly />
            </div>

            <div>
              <p class="text"><span>* </span>ช่วงเวลา</p>

              <a-select placeholder="เลือกช่วงเวลาการลา" style="width: 100%">
                <a-select-option value="1">
                  ครึ่งวัน (เช้า)
                </a-select-option>
                <a-select-option value="2">
                  ครึ่งวัน(บ่าย)
                </a-select-option>
                <a-select-option value="3">
                  เต็มวัน
                </a-select-option>
              </a-select>
              <div>
                <div style="width:50%;float: left;">
                  <p class="text"><span>* </span>เริ่ม</p>
                  <a-date-picker
                    v-model="startValue"
                    :disabled-date="disabledStartDate"
                    show-time
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="Start"
                    @change="onChangeStartDate"
                  />
                </div>

                <div style="width:50%;float: right;">
                  <p class="text"><span>* </span>ถึง</p>
                  <a-date-picker
                    v-model="endValue"
                    :disabled-date="disabledEndDate"
                    show-time
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="End"
                    @change="onChangeEndDate"
                  />
                </div>
              </div>

              <div>
                <p class="title-leave"><span>* </span>เหตุผลการลา</p>
                <a-textarea
                  class="box1"
                  name="leave"
                  v-model="leave"
                  placeholder="เขียนข้อความ"
                ></a-textarea>
              </div>

              <div>
                <p class="title-leave">แนบเอกสารการลา</p>
                <a-upload
                  v-model:fileList="fileList"
                  name="avatar"
                  list-type="picture-card"
                  class="avatar-uploader"
                  :show-upload-list="false"
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  :before-upload="beforeUpload"
                  @change="handleChange"
                >
                  <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                  <div v-else>
                    <!-- todo -->
                    <loading-outlined v-if="loading" />
                    <plus-outlined v-else />
                    <div class="ant-upload-text">Upload</div>
                  </div>
                </a-upload>
              </div>
            </div>
          </div>
        </a-tab-pane>

        <a-tab-pane key="sick" tab="ลาป่วย">
          <div class="From-leave">
            <p class="title-leave">จำนวนวันลาป่วยที่เหลือ ... วัน</p>
            <div>
              <p><span>*</span> ประเภทการลา</p>
              <a-input value="ลาป่วย" readonly />
            </div>

            <div>
              <p class="text"><span>* </span>ช่วงเวลา</p>
              <a-select placeholder="เลือกช่วงเวลาการลา" style="width: 100%">
                <a-select-option value="1">
                  ครึ่งวัน (เช้า)
                </a-select-option>
                <a-select-option value="2">
                  ครึ่งวัน(บ่าย)
                </a-select-option>
                <a-select-option value="3">
                  เต็มวัน
                </a-select-option>
              </a-select>
              <div>
                <div style="width:50%;float: left;">
                  <p class="text"><span>* </span>เริ่ม</p>
                  <a-date-picker
                    v-model="startValue"
                    :disabled-date="disabledStartDate"
                    show-time
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="Start"
                    @change="onChangeStartDate"
                  />
                </div>

                <div style="width:50%;float: right;">
                  <p class="text"><span>* </span>ถึง</p>
                  <a-date-picker
                    v-model="endValue"
                    :disabled-date="disabledEndDate"
                    show-time
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="End"
                    @change="onChangeEndDate"
                  />
                </div>
              </div>
              <p class="title-leave"><span>* </span>เหตุผลการลา</p>
              <a-textarea
                class="box1"
                name="leave"
                v-model="leave"
                placeholder="เขียนข้อความ"
              ></a-textarea>
            </div>

            <div>
              <p class="title-leave">แนบเอกสารการลา</p>
              <a-upload
                v-model:fileList="fileList"
                name="avatar"
                list-type="picture-card"
                class="avatar-uploader"
                :show-upload-list="false"
                :before-upload="beforeUpload"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                @change="handleChange"
              >
                <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                <div v-else>
                  <loading-outlined v-if="loading" />
                  <plus-outlined v-else />
                  <div class="ant-upload-text">Upload</div>
                </div>
              </a-upload>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>

    <div class="div-button-senddata">
      <a-button class="button-senddata" @click="request">ส่ง</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref, defineComponent } from "vue";
import store from "../store";
import axios from "axios";
import { useRoute } from "vue-router";
import dayjs from "dayjs";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";

function getBase64(img: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default defineComponent({
  components: {
    LoadingOutlined,
    PlusOutlined,
  },
  data: () => ({
    type: "" as string,
    startValue: "" as string,
    endValue: "" as string,
    endOpen: false as boolean,
    option: "" as string,
    leave: "" as string,
    loading: false as boolean,
    imageUrl: "" as string,
  }),
  methods: {
    onChangeStartDate(date: string, dateString: string) {
      this.startValue = dayjs(date).format("YYYY-MM-DD HH:mm:ss");
    },
    onChangeEndDate(date: string, dateString: string) {
      this.endValue = dayjs(date).format("YYYY-MM-DD HH:mm:ss");
    },
    disabledStartDate(startValue: string) {
      const endValue = this.endValue;
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.valueOf() > endValue.valueOf();
    },
    disabledEndDate(endValue: string) {
      const startValue = this.startValue;
      if (!endValue || !startValue) {
        return false;
      }
      return startValue.valueOf() >= endValue.valueOf();
    },
    handleChange(info: any) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        getBase64(info.file.originFileObj, (imageUrl: any) => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
      }
      if (info.file.status === "error") {
        this.loading = false;
      }
    },
    beforeUpload(file: any) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG file!");
      }
      const isLt2M = file.size / 2024 / 2024 < 2;
      if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
    request() {
      const payload = {
        Leavetype: this.option,
        Since: this.startValue,
        Until: this.endValue,
        Leaveevent: this.leave,
      };
      axios
        .post(`http://172.16.3.33:8100/api/request`, payload)
        .then(function(response) {
          if (response.data.responseCode === 200) {
            alert(response.data.message);
          } else {
            alert("Success");
          }
        })
        .catch(function(error) {
          alert(error);
        });
    },

    callback(key: any) {
      console.log(key);
    },
  },
  mounted() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.type = `${urlParams.get("type")}`;
    console.log(this.type);
  },
});
</script>
<style scoped>
@font-face {
  font-family: Anuphan;
  src: url("../fonts/Anuphan-Regular.woff") format("woff");
}
.Vonleave {
  font-family: Anuphan;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
p {
  margin-bottom: 0em;
}
span {
  color: red;
}
.title-leave {
  color: #105efb;
}
.From-leave,
.div-button-senddata {
  padding: 15px;
}
.From-leave {
  height: 80%;
}

.button-senddata {
  width: 100%;
  background-color: #134f83;
  color: white;
}
</style>
