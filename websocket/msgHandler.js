var onfire = require("../utils/onfire.js");
module.exports = function(msg, page) { // page -> index page
  var app = getApp();
  console.log("接到服务器返回消息")
  msg = JSON.parse(msg);
  var cmd = msg.cmd;
  console.log("cmd = ", cmd)
  console.log("msg = ", msg)
  if (cmd === 10002) { // 登录
    console.log("接到服务器返回10002消息")
    //发送事件出去
    onfire.fire('testKey',msg)
  } else if (cmd === 10004) { //
    console.log("接到服务器返回10004消息")
    //发送事件出去
    onfire.fire('getOrderTime', msg)
  } else if (cmd === 10006) { // 
    console.log("接到服务器返回10006消息")
    //发送事件出去
    onfire.fire('rspScheme', msg)
  } else if (cmd === 10008) { // 
    console.log("接到服务器返回10008消息")
    //发送事件出去
    onfire.fire('rspStores', msg)
  } else if (cmd === 10010) { // 
    console.log("接到服务器返回10010消息")
    //发送事件出去
    onfire.fire('rspOrder', msg)
  } else if (cmd === 10012) { // 
    console.log("接到服务器返回10012消息")
    //发送事件出去
    onfire.fire('rspDetailedOrder', msg)
  } else if (cmd === 10014) { // 
    console.log("接到服务器返回10014消息")
    //发送事件出去
    onfire.fire('rspCancelOrder', msg)
  }
}