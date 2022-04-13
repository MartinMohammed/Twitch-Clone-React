const NodeMediaServer = require("node-media-server");

// const HOST = "192.168.2.125";

const config = {
  // input
  rtmp: {
    // host: HOST,
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  // output
  http: {
    // host: "192.168.2.125",
    port: 8000,
    allow_origin: "*",
  },
};

var nms = new NodeMediaServer(config);
nms.run();
