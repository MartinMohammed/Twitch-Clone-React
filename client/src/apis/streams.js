import axios from "axios";

// 192.168.2.125
const HOST = "localhost";

export default axios.create({
  // changeable
  baseURL: `http://${HOST}:3001`,
});
