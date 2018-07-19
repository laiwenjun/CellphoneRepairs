var a = null, t = null, e = null, o = null, n = null, s = null, i = getApp();

Page({
    data: {
        shareFlag: !0,
        chaiFlag: !0,
        libaoFlag: !0,
        oldUserFlag: !0,
        suiFlag: !0,
        haibaoFlag: !0,
        haibao_url: "",
        top_margin: 0
    },
    onLoad: function(a) {
        var e = this;
        console.log(a), a && (o = a.pid), wx.getStorage({
            key: "azooo_userID",
            success: function(a) {
                console.log(a.data), (t = a.data) ? (e.myInfoFun(), e.getQRCode(), e.getMyInsuranceFun()) : e.setData({
                    chaiFlag: !1
                });
            }
        });
    },
    myInfoFun: function() {
        var a = this;
        wx.request({
            url: i.globalData.serverUrl + "myInfo",
            data: {
                userID: t
            },
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                if (console.log(t), 0 == t.data.error_code) {
                    var o = t.data.data.userInfo;
                    a.setData({
                        userInfo: o
                    }), e = o.pid;
                }
            }
        });
    },
    getMyInsuranceFun: function() {
        var a = this;
        wx.request({
            url: i.globalData.serverUrl + "getMyInsurance",
            data: {
                userID: t
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                console.log(t), 0 == t.data.error_code && t.data.data.cards && (n = t.data.data.cards.number, 
                s = t.data.data.cards.password, t.data.data.jihuo < 1 && a.setData({
                    suiFlag: !1
                }));
            }
        });
    },
    startScroll: function() {
        var t = this;
        a = setInterval(t.scrollUp, 10), t.setData({
            top_margin: ++t.data.top_margin
        });
    },
    scrollUp: function() {
        var t = this;
        t.data.top_margin % 44 == 0 ? (clearInterval(a), setTimeout(t.startScroll, 700)) : (t.setData({
            top_margin: ++t.data.top_margin
        }), t.data.top_margin >= 44 * t.data.top_info.length / 2 && t.setData({
            top_margin: 0
        }));
    },
    strategyFun: function() {
        wx.pageScrollTo({
            scrollTop: 550,
            duration: 300
        });
    },
    openwin: function(a) {
        console.log(a);
        var t = a.target.dataset.url;
        t && wx.navigateTo({
            url: "../" + t + "/" + t
        });
    },
    shareFun: function() {
        var a = this;
        this.setData({
            shareFlag: !1
        }), setTimeout(function() {
            a.setData({
                guzhang_hide: "guzhang_hide"
            });
        }, 0);
    },
    shareBgFun: function() {
        this.setData({
            shareFlag: !0,
            guzhang_hide: ""
        });
    },
    share_conFun: function() {},
    openHaibao: function() {
        this.data.haibao_url ? this.setData({
            haibaoFlag: !1
        }) : wx.navigateTo({
            url: "../activity_page/activity_page?url=https://api.azooo.com/WechatWeb/User/generalizeCode.html"
        });
    },
    getQRCode: function() {
        var a = this;
        wx.request({
            url: i.globalData.serverUrl + "getQRCode",
            data: {
                userID: t
            },
            method: "POST",
            success: function(t) {
                if (0 == t.data.error_code) {
                    if (t.data && t.data.data[0]) {
                        var e = t.data.data[0].replace(/http:/, "https:");
                        a.setData({
                            haibao_url: e
                        });
                    }
                } else wx.showModal({
                    title: "提示",
                    content: t.data.error_msg,
                    showCancel: !1,
                    success: function(a) {}
                });
            },
            fail: function(a) {
                console.log("fail", a), wx.showModal({
                    title: "提示",
                    content: "服务器获取数据出错",
                    showCancel: !1,
                    success: function(a) {}
                });
            }
        });
    },
    hide_haibao: function() {
        this.setData({
            haibaoFlag: !0
        });
    },
    save: function() {
        var a = this;
        a.setData({
            haibaoFlag: !0
        }), wx.downloadFile({
            url: a.data.haibao_url,
            success: function(t) {
                console.log(t), wx.saveImageToPhotosAlbum({
                    filePath: t.tempFilePath,
                    success: function(t) {
                        console.log("保存海报成功"), wx.showToast({
                            title: "保存成功",
                            icon: "success",
                            duration: 2e3
                        }), a.setData({
                            shareFlag: !0
                        });
                    },
                    fail: function(a) {
                        console.log("fail", a), wx.showToast({
                            title: "保存失败",
                            icon: "success",
                            duration: 2e3
                        });
                    }
                });
            },
            fail: function(a) {
                console.log("fail", a), wx.showToast({
                    title: "下载失败",
                    icon: "success",
                    duration: 2e3
                });
            }
        });
    },
    bindGetUserInfo: function(a) {
        var e = this;
        console.log("bindGetUserInfo", a), i.wxlogin({
            encryptedData: a.detail.encryptedData,
            iv: a.detail.iv,
            pid: o,
            callback: function(a, o) {
                1 == a && wx.getStorage({
                    key: "azooo_userID",
                    success: function(a) {
                        console.log(a.data), t = a.data, e.myInfoFun(), e.getQRCode(), 1 == o ? e.setData({
                            chaiFlag: !0,
                            libaoFlag: !1
                        }) : 0 == o && e.setData({
                            chaiFlag: !0,
                            oldUserFlag: !1
                        });
                    }
                });
            }
        });
    },
    closeFun: function() {
        this.setData({
            chaiFlag: !0
        });
    },
    closeOldFun: function() {
        this.setData({
            oldUserFlag: !0
        });
    },
    oldUserFun: function() {
        this.setData({
            oldUserFlag: !0,
            shareFlag: !1
        });
    },
    closeSuiFun: function() {
        this.setData({
            suiFlag: !0
        });
    },
    suiFun: function() {
        this.setData({
            suiFlag: !0
        }), wx.navigateTo({
            url: "../sui/sui?number=" + n + "&password=" + s
        });
    },
    closeLibaoFun: function() {
        this.setData({
            libaoFlag: !0
        });
    },
    onShareAppMessage: function() {
        return {
            title: "邀好友，赚赏金",
            path: "pages/jiyou_center_new/jiyou_center_new?pid=" + e,
            imageUrl: "../../images/jiyou/topbg.png"
        };
    },
    onReady: function() {},
    onShow: function() {
        var t = this;
        t.setData({
            top_info: []
        }), wx.request({
            url: i.globalData.serverUrl + "getLastBill",
            data: {},
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                if (console.log(e), 0 == e.data.error_code) {
                    var o = e.data.data;
                    if (o && o.length) {
                        for (var n = 0, s = o.length; n < s; n++) o[n].headImg = o[n].headImg ? o[n].headImg : "../../images/wx_user.jpg";
                        t.setData({
                            top_info: o.concat(o)
                        }), a && clearInterval(a);
                    }
                }
            }
        });
    },
    onHide: function() {
        a && clearInterval(a), clearInterval(a);
    },
    onUnload: function() {
        a && clearInterval(a);
    }
});