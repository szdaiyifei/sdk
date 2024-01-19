import axios from "axios";
import { Modal } from "antd";
import { BACKEND_HOST_LOCAL, BACKEND_HOST_PROD } from "./constants";

type Params = { domain: string };

function getNotificatiionVoUsingGet(params: Params) {
  // const url = `http://localhost:8101/api/notification/get/vo`;

  // 判断当前环境是开发还是生产
  const backend_domain = import.meta.env.PROD
    ? BACKEND_HOST_PROD
    : BACKEND_HOST_LOCAL;
  const url = `${backend_domain}/api/notification/get/vo`;

  return axios
    .get(url, { params })
    .then((response) => response.data)
    .catch((error) => {
      // 处理错误
      console.error("Axios request error:", error);
      throw error;
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const url = new URL(location.href);
  const domain = url.hostname;
  console.log(domain);
  fetchNotification(domain);
});

const fetchNotification = async (domain: string) => {
  console.log(domain);

  try {
    // 发起请求获取通知信息的逻辑
    const response = await getNotificatiionVoUsingGet({ domain: domain });
    const data = response.data;
    console.log(data);
    const id = data.id;

    console.log(id);

    if (localStorage.getItem(id) !== null) {
      return;
    }

    if (data?.title && data?.content) {
      showNotification(data.title, data.content, data.id);
    }
  } catch (error) {
    console.error("Error fetching notification:", error);
  }
};

const showNotification = (title: string, content: string, id: string) => {
  // 使用 antd Modal 组件弹出通知框
  const modal = Modal.info({
    title,
    content,
    okText: "确定",
    onOk() {
      modal.destroy();
    },
  });

  // console.log(title, content);

  localStorage.setItem(id, "id");
};
