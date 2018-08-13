import Vue from "vue";
import { Api, Http, Upload, Axios } from "./utils/api";
import DayJs from "dayjs";

Vue.config.productionTip = true;
Vue.config.debug = true;
Vue.use(Api);

Vue.filter("formatDate", val => {
  console.log(val);
  return DayJs(val).format("YYYY-MM-DD HH:mm:ss");
});

class Uploader {
  static upload(ev) {
    const data = ev.clipboardData;
    const items = (ev.clipboardData || ev.originalEvent.clipboardData).items;
    let actions = []; //如果是多文件上传的话
    for (let index in items) {
      const item = items[index];
      if (item.kind === "file") {
        const blob = item.getAsFile();
        // const url = reader.readAsDataURL(blob);
        const formData = new FormData();
        formData.append("file", blob);
        //ajax上传图片
        return Upload.post(`upload/editor`, formData);
      }
    }
    return null;
  }
}

/**
 * 粘贴图片
 */
Vue.directive("paste-img", {
  //绑定一个粘贴事件
  inserted(el, binding) {
    //绑定事件
    const callback = typeof binding.value === "function" ? binding.value : null;
    el.addEventListener("paste", async ev => {
      let res = await Uploader.upload(ev);
      if (null !== callback) callback(res);
    });
  }
});
