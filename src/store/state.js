export default {
  solutech_web_token: localStorage.getItem("solutech_web_token") || "",
  user: JSON.parse(localStorage.getItem("user")) || {}
};
