//机友中心
var o = getApp();
Page({
    data: {
        page_info: [ {
            img: "../../images/jiyou_003.png",
            text: "我要提现",
            url: "withdrawal",
            num: 1
        }, {
            img: "../../images/jiyou_005.png",
            text: "机友订单",
            url: "jiyou_order",
            num: 2
        }, {
            img: "../../images/jiyou_004.png",
            text: "我的机友",
            url: "jiyou_my",
            num: 3
        }, {
            img: "../../images/jiyou_002.png",
            text: "机友指南",
            url: "jiyou_guide",
            num: 4
        } ],
        haibao_info: {
            hide: !0,
            posters: ""
        },
        jiyou_info: null,
        share_hide: !0
    },
    onShow: function() {
        var o = this;
        o.getjiyou_info(o.getQRCode);
    },
    openwin: function(o) {
        console.log(o);
        var e = o.target.dataset.url;
        wx.navigateTo({
            url: "../" + e + "/" + e
        });
    },
    show_haibao: function() {
        this.setData({
            "haibao_info.hide": !1
        });
    },
    hide_haibao: function() {
        this.setData({
            "haibao_info.hide": !0
        });
    },
    save: function() {
        var o = this;
        wx.downloadFile({
            url: o.data.haibao_info.posters,
            success: function(e) {
                console.log(e), wx.saveImageToPhotosAlbum({
                    filePath: e.tempFilePath,
                    success: function(e) {
                        console.log("保存海报成功"), o.hide_haibao(), wx.showToast({
                            title: "保存成功",
                            icon: "success",
                            duration: 2e3
                        });
                    },
                    fail: function(o) {
                        console.log("fail", o);
                    }
                });
            },
            fail: function(o) {
                console.log("fail", o);
            }
        });
    },
    getjiyou_info: function(e) {
        var t = this;
        wx.request({
            url: o.globalData.serverUrl + "myInfo",
            data: {
                userID: wx.getStorageSync("azooo_userID")
            },
            method: "POST",
            success: function(o) {
                wx.setStorage({
                    key: "integral",
                    data: o.data.data.userInfo.integral
                }), 0 == o.data.error_code ? (console.log(o.data), t.setData({
                    jiyou_info: o.data.data.userInfo
                })) : wx.showModal({
                    title: "提示",
                    content: o.data.error_msg,
                    showCancel: !1,
                    success: function(o) {}
                }), e && e();
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
    show_share: function() {
        this.setData({
            share_hide: !1
        });
    },
    hide_share: function() {
        this.setData({
            share_hide: !0
        });
    },
    getQRCode: function() {
        var e = this;
        wx.request({
            url: o.globalData.serverUrl + "getQRCode",
            data: {
                userID: wx.getStorageSync("azooo_userID")
            },
            method: "POST",
            success: function(o) {
                if (0 == o.data.error_code) {
                    var t = o.data.data[0].replace(/http:/, "https:");
                    e.setData({
                        "haibao_info.posters": t
                    });
                } else wx.showModal({
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
        });
    },
    sel_userid: function(e) {
        return wx.showLoading({
            title: "获取用户信息"
        }), new Promise(function(e, t) {
            var a = setInterval(function() {
                o.globalData.userid && (wx.hideLoading(), clearInterval(a), e());
            });
        });
    }
});