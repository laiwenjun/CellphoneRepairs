module.exports = function(msg, page) { // page -> index page
    var app = getApp();

    msg = JSON.parse(msg);
    var type = msg.data && msg.data.cmd || 
        msg.errMsg && msg.errMsg.type;
    if (type === 10001) { // 登录
        console.log("接到服务器返回10001消息")
    }
    else if (type === 'XXXXX') { //
        
    }
    else if (type === 'XXXXX') { // 
        
    }
}
