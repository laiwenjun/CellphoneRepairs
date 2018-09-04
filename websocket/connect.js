var msgHandler = require('msgHandler.js');
//'ws://119.23.65.177:8103/websocket',
//'ws://www.dashengqp.gd.cn:8103/websocket',
var webSocketUrl = 'wss://www.dashengqp.gd.cn/websocket',
  socketOpened = false, // 标记websocket是否已经打开
  socketMsgQueue = [],
  connCallback = null,
  msgReceived = {};

function connect(callback) { // 发起链接
  wx.connectSocket({
    url: webSocketUrl
  });
  connCallback = callback;
}

function initEvent() { // 初始化一些webSocket事件
  wx.onSocketOpen(function (res) { // webSocket打开事件处理
    socketOpened = true;
    console.log('websocket opened.');
    // 处理一下没发出去的消息
    while (socketMsgQueue.length > 0) {
      var msg = socketMsgQueue.pop();
      sendSocketMessage(msg);
    }
    // sendSocketMessage({
    //   cmd:10001,
    //   optId:1,
    //   param:"test10001"
    // });

    // connection callback
    connCallback && connCallback.call(null);
  });
  wx.onSocketMessage(function (res) { // 收到服务器消息时的处理
    //console.log('received msg: ' + res.data);
    // msgReceived.callback && msgReceived.callback.call(null, res.data, ...msgReceived.params);
    msgHandler(res.data);
  });
  wx.onSocketError(function (res) { // 链接出错时的处理
    console.log('webSocket fail', res);
  });
}
wx.onSocketClose(function (res) {
  console.log('WebSocket 已关闭！')
  connect()
})
function sendSocketMessage(msg) {
  if (typeof (msg) === 'object') {
    msg = JSON.stringify(msg);
  }
  if (socketOpened) {
    wx.sendSocketMessage({
      data: msg
    });
  } else { // 发送的时候，链接还没建立 
    socketMsgQueue.push(msg);
  }
}

function setReceiveCallback(callback, ...params) {
  if (callback) {
    msgReceived.callback = callback;
    msgReceived.params = params;
  }
}

function init() {
  initEvent();
}
module.exports = (function() {
    init();
    return {
        connect: connect,
        send: sendSocketMessage,
        setReceiveCallback: setReceiveCallback,
        socketOpened: socketOpened
    };
})();
