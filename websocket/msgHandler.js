module.exports = function(msg, page) { // page -> index page
  var app = getApp();
  console.log("接到服务器返回消息")
  msg = JSON.parse(msg);
  var cmd = msg.cmd;
  console.log("cmd = ", cmd)
  console.log("msg = ", msg)
  if (cmd === 103) { // 登录
    console.log("接到服务器返回10001消息")
  } else if (cmd === 'XXXXX') { //

  } else if (cmd === 'XXXXX') { // 

  }
}