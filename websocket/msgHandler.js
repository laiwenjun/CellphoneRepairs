module.exports = function(msg, page) { // page -> index page
    var app = getApp();

    msg = JSON.parse(msg);
    var type = msg.data && msg.data.type || 
        msg.errMsg && msg.errMsg.type;
    if (type === 'login') { // 登录
        
    }
    else if (type === 'XXXXX') { //
        
    }
    else if (type === 'XXXXX') { // 
        
    }
}
