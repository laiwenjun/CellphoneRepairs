App({
    onLaunch: function(o) {
        console.log("onLaunch:", o), this.globalData.scene = o.scene, null != o.referrerInfo ? (console.log("onLaunch:", o.referrerInfo), 
        this.globalData.appId = o.referrerInfo.appId, wx.setStorage({
            key: "from_appid",
            data: o.referrerInfo.appId
        })) : console.log("onLaunch:", "没有appid");
    },
    onShow: function(o) {
        console.log("onShow:", o), null != o.referrerInfo ? (console.log("onShow:", o.referrerInfo), 
        this.globalData.appId = o.referrerInfo.appId, wx.setStorage({
            key: "from_appid",
            data: o.referrerInfo.appId
        })) : console.log("onShow:没有appid");
    },
    onHide: function() {},
    onError: function(o) {
        console.log("appError:" + o);
    },
    globalData: {
        userInfo: null,
        userid: null,
        serverUrl: "https://small2.azooo.com/api/",
        appId: null,
        scene: null
    },
    wxlogin: function(o) {
        var e = this;
        console.log("wxlogin"), wx.login({
            success: function(n) {
                if (n.code) {
                    var a = n.code;
                    o.code = a, e.login(o);
                } else console.log("获取用户登录态失败！" + n.errMsg);
            },
            fail: function(o) {},
            complete: function(o) {}
        });
    },
    login: function(o) {
        var e = this;
        console.log("login= " + JSON.stringify(o));
        var n = require("/utils/account_id.js").account_id;
        wx.setStorage({
            key: "account_id",
            data: n
        }), wx.request({
            url: this.globalData.serverUrl + "login3",
            data: {
                code: o.code,
                encryptedData: encodeURIComponent(o.encryptedData),
                iv: o.iv,
                from_appid: this.globalData.appId,
                scene: this.globalData.scene,
                account_id: n,
                pid: o.pid ? o.pid : 0
            },
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            success: function(n) {
                console.log("login3", n);
                var a = n.data;
                if (0 == a.error_code) {
                    var l = a.data.azooo_userID;
                    e.globalData.userid = l, wx.setStorage({
                        key: "azooo_userID",
                        data: l
                    }), o.callback && o.callback(1, a.data.newUser);
                } else o.callback && o.callback(0), wx.showModal({
                    title: "登录提示",
                    content: JSON.stringify(n),
                    success: function(o) {
                        o.confirm && console.log("用户点击确定");
                    }
                });
            },
            fail: function(o) {
                wx.showModal({
                    title: "登录fail提示",
                    content: JSON.stringify(o),
                    success: function(o) {
                        o.confirm && console.log("用户点击确定");
                    }
                });
            },
            complete: function() {}
        });
    },
    throttle: function(o, e) {
        var n;
        return function() {
            var a = this, l = arguments;
            clearTimeout(n), n = setTimeout(function() {
                e.apply(a, l);
            }, o);
        };
    }
});