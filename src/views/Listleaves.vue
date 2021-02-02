<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <a-layout-header
        ><a-row>
          <span
            class="btu-Clone"
            style="font-family: Anuphan;"
            @click="$router.go(-1)"
          >
            X
          </span>
          <span>Leave form</span>
          <span class="btu-Enter" :style="myStyle" @click="recordUsersleave">
            Enter
          </span>
        </a-row></a-layout-header
      >
    </a-layout>
    <div>
      <input
        class="search-input"
        type="text"
        placeholder="input search text"
        style="width:90%;font-family: Anuphan;"
        v-model="searchUsers"
        @search="onSearch"
      />
      <div style="margin-top:1em;float: left;width: 100%;text-align: start;">
        <div
          v-for="(item, index) in resultQuery"
          :key="index"
          style="width: 100%; padding:10px 20px; box-shadow: inset 0px -1px 0px #F0F0F0, inset 0px 1px 0px #F0F0F0;"
        >
          <a-checkbox
            :value="item.email"
            style="font-family: Anuphan;width: 100%"
            :checked="
              allList.listUsers && allList.listUsers.includes(item.email)
            "
            @click="listUsersleave(item.email, $event)"
          >
            <span v-if="item.image === null" style="margin-right: 10px;"
              ><img
                src="../assets/user.png"
                alt=""
                style="width:35px;height:35px;border-radius: 50%;"
            /></span>
            <span v-else style="margin-right: 10px;">
              <img
                :src="item.image.fullPath"
                alt=""
                style="width:35px;height:35px;border-radius: 50%;"
              />
            </span>
            {{ item.name }}
          </a-checkbox>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import getallUser from "../constant/users";
import { message } from "ant-design-vue";
export default defineComponent({
  name: "Listleaves",
  data: () => ({
    myStyle: {
      color: "#4F4F4F",
    },
    lineId: "" as string,
    searchUsers: "",
    allUsers: [] as object[],
    allList: {
      typeLeaves: "LeavesOther" as string,
      listUsers: [] as string[],
    },
  }),
  methods: {
    listUsersleave(value: string, event: any) {
      const index = this.allList.listUsers.findIndex((v) => v == value);
      const checked = event.target.checked;
      if (checked && index < 0) {
        this.allList.listUsers.push(value);
      }
      if (!checked && index >= 0) {
        this.allList.listUsers.splice(index, 1);
      }
      if (this.allList.listUsers.length > 0) {
        this.myStyle.color = "#FFFF";
      } else if (this.allList.listUsers.length === 0) {
        this.myStyle.color = "#4F4F4F";
      }
    },
    recordUsersleave() {
      if (this.allList.listUsers.length < 1) {
        message.error("Please select the name you wish to take leave from.", 2);
      } else {
        this.$router.push(`/Vrequest?id=${this.lineId}&status=1&type=Onleave`);
        localStorage.removeItem("ListUsersOnleave");
        const result: string = JSON.stringify(this.allList);
        localStorage.setItem("ListUsersOnleave", result);
      }
    },
  },
  computed: {
    resultQuery(): object[] {
      if (this.searchUsers) {
        return this.allUsers.filter((item: any) => {
          return this.searchUsers
            .toLowerCase()
            .split(" ")
            .every((v) => item.name.toLowerCase().includes(v));
        });
      } else {
        return this.allUsers;
      }
    },
  },
  mounted() {
    getallUser().then((result) => (this.allUsers = result.data.users));
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.lineId = `${urlParams.get("id")}`;
  },
});
</script>
<style scoped>
@import "../assets/styles/Titlebar.css";

.search-input {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: "tnum";
  position: relative;
  display: inline-block;
  width: 100%;
  padding: 4px 11px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  line-height: 1.5715;
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  transition: all 0.3s;
}
</style>
