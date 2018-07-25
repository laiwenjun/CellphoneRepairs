//提现处理
var o, n, t = getApp(), e = "";
Page({
    data: {
        user_info: {
            integral: "",
            user_name: "",
            money: ""
        }
    },
    onLoad: function(o) {
        var t = this;
        n = require("../../utils/account_id.js").account_id, console.log("account_id", n), 
        wx.getStorage({
            key: "azooo_userID",
            success: function(o) {
                console.log(o.data), o.data ? (e = o.data, t.getjiyou_info()) : wx.showModal({
                    title: "提示",
                    content: "没有userID，请到首页重新进入",
                    showCancel: !1,
                    success: function(o) {
                        o.confirm && console.log("用户点击确定");
                    }
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    input_money: function(o) {
        this.setData({
            "user_info.money": o.detail.value
        });
    },
    withdrawal: function() {
        var a = this, s = parseInt(a.data.user_info.money);
        if (console.log(s), console.log(o), s) {
            if (s < 5) return wx.showModal({
                title: "提示",
                content: "每次提现金额不得少于 5 元",
                showCancel: !1,
                success: function(o) {}
            }), !1;
            o >= s ? wx.request({
                url: t.globalData.serverUrl + "withdrawals",
                data: {
                    userID: e,
                    amounts: s,
                    account_id: n
                },
                method: "POST",
                success: function(o) {
                    0 == o.data.error_code ? wx.navigateTo({
                        url: "../withdrawal_success/withdrawal_success"
                    }) : wx.showModal({
                        title: "提示",
                        content: o.data.error_msg,
                        showCancel: !1,
                        success: function(o) {}
                    });
                },
                fail: function(o) {
                    console.log("fail", o), wx.showModal({
                        title: "提示",
                        content: "服务器获取数据出错",
                        showCancel: !1,
                        success: function(o) {}
                    });
                }
            }) : wx.showModal({
                title: "提示",
                content: "提现金额不能大于可提现余额",
                showCancel: !1,
                success: function(o) {}
            });
        } else wx.showModal({
            title: "提示",
            content: "请输入提现金额",
            showCancel: !1,
            success: function(o) {}
        });
    },
    getjiyou_info: function() {
        var n = this;
        wx.request({
            url: t.globalData.serverUrl + "myInfo",
            data: {
                userID: e
            },
            method: "POST",
            success: function(t) {
                0 == t.data.error_code ? (console.log(t.data), o = t.data.data.userInfo.integral, 
                n.setData({
                    "user_info.integral": o
                })) : wx.showModal({
                    title: "提示",
                    content: t.data.error_msg,
                    showCancel: !1,
                    success: function(o) {}
                });
            },
            fail: function(o) {
                console.log("fail", o), wx.showModal({
                    title: "提示",
                    content: "服务器获取数据出错",
                    showCancel: !1,
                    success: function(o) {}
                });
            }
        });
    },
    openwin: function(o) {
        console.log(o);
        var n = o.target.dataset.url;
        wx.navigateTo({
            url: "../" + n + "/" + n
        });
    }
});