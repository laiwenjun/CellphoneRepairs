var t = getApp(), o = null;

Page({
    data: {
        number: "",
        footerFlag: !0,
        signFlag: !1,
        drive: null,
        haibaoFlag: !0,
        haibao_url: null,
        btnFlag: !0
    },
    onLoad: function(o) {
        var a = this;
        a.ajax(), wx.request({
            url: t.globalData.serverUrl + "get717Num",
            method: "POST",
            data: {},
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                console.log(t), 0 == t.data.error_code ? a.setData({
                    number: t.data.data
                }) : wx.showModal({
                    title: "温馨提示",
                    content: JSON.stringify(t.data.error_msg),
                    success: function(t) {
                        t.confirm && console.log("用户点击确定");
                    }
                });
            },
            fail: function(t) {
                wx.showModal({
                    title: "温馨提示get717Num",
                    content: JSON.stringify(t),
                    success: function(t) {
                        t.confirm && console.log("用户点击确定");
                    }
                });
            }
        });
    },
    formSubmit: function(a) {
        var n = a.detail.formId, e = this;
        if (e.data.footerFlag) return e.setData({
            footerFlag: !1
        }), !1;
        console.log(a);
        var i = e.data.name;
        if (!i) return wx.showToast({
            title: "请输入姓名",
            icon: "none",
            duration: 1500
        }), !1;
        var s = e.data.phone;
        if (!s) return wx.showToast({
            title: "请输入手机号码",
            icon: "none",
            duration: 1500
        }), !1;
        var l = e.data.company, c = e.data.post;
        wx.request({
            url: t.globalData.serverUrl + "reg717",
            method: "POST",
            data: {
                userID: o,
                name: i,
                phone: s,
                company: l,
                position: c,
                need_park: e.data.drive,
                form_id: n
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                console.log(t), 0 == t.data.error_code ? (wx.showToast({
                    title: "报名成功",
                    icon: "none",
                    duration: 1500
                }), e.setData({
                    footerFlag: !0,
                    signFlag: !0
                })) : wx.showModal({
                    title: "温馨提示",
                    content: JSON.stringify(t.data.error_msg),
                    success: function(t) {
                        t.confirm && console.log("用户点击确定");
                    }
                });
            },
            fail: function(t) {
                wx.showModal({
                    title: "温馨提示reg717",
                    content: JSON.stringify(t),
                    success: function(t) {
                        t.confirm && console.log("用户点击确定");
                    }
                });
            }
        });
    },
    callFun: function(o) {
        var a = this;
        a.data.haibao_url ? a.setData({
            haibaoFlag: !1
        }) : wx.getStorage({
            key: "azooo_userID",
            success: function(n) {
                if (!n.data) {
                    if (!o.detail.userInfo) return !1;
                    t.wxlogin({
                        encryptedData: o.detail.encryptedData,
                        iv: o.detail.iv,
                        callback: function(t) {
                            if (1 != t) return !1;
                            console.log(1), a.ajax(function() {
                                a.getPoster(function() {
                                    a.setData({
                                        haibaoFlag: !1
                                    });
                                });
                            });
                        }
                    });
                }
            },
            fail: function() {
                if (!o.detail.userInfo) return !1;
                t.wxlogin({
                    encryptedData: o.detail.encryptedData,
                    iv: o.detail.iv,
                    callback: function(t) {
                        if (1 != t) return !1;
                        console.log(1), a.ajax(function() {
                            a.getPoster(function() {
                                a.setData({
                                    haibaoFlag: !1
                                });
                            });
                        });
                    }
                });
            }
        });
    },
    getPoster: function(a) {
        var n = this;
        wx.request({
            url: t.globalData.serverUrl + "get717WxCode",
            method: "POST",
            data: {
                userID: o
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                console.log(t), 0 == t.data.error_code ? (n.setData({
                    haibao_url: t.data.data.wx_code
                }), a && a()) : wx.showModal({
                    title: "温馨提示",
                    content: JSON.stringify(t.data.error_msg),
                    success: function(t) {
                        t.confirm && console.log("用户点击确定");
                    }
                });
            },
            fail: function(t) {
                wx.showModal({
                    title: "温馨提示reg717",
                    content: JSON.stringify(t),
                    success: function(t) {
                        t.confirm && console.log("用户点击确定");
                    }
                });
            }
        });
    },
    ajax: function(a) {
        var n = this;
        wx.getStorage({
            key: "azooo_userID",
            success: function(e) {
                o = e.data, n.setData({
                    btnFlag: !1
                }), a ? a() : n.getPoster(), wx.request({
                    url: t.globalData.serverUrl + "get717UserInfo",
                    method: "POST",
                    data: {
                        userID: o
                    },
                    header: {
                        "content-type": "application/json"
                    },
                    success: function(t) {
                        if (console.log(t), 0 == t.data.error_code) {
                            var o = t.data.data;
                            "" != o.phone && o.phone ? n.setData({
                                signFlag: !0,
                                footerFlag: !0
                            }) : n.setData({
                                signFlag: !1
                            });
                        } else wx.showModal({
                            title: "温馨提示",
                            content: JSON.stringify(t.data.error_msg),
                            success: function(t) {
                                t.confirm && console.log("用户点击确定");
                            }
                        });
                    },
                    fail: function(t) {
                        wx.showModal({
                            title: "温馨提示get717UserInfo",
                            content: JSON.stringify(t),
                            success: function(t) {
                                t.confirm && console.log("用户点击确定");
                            }
                        });
                    }
                });
            },
            fail: function() {
                n.setData({
                    btnFlag: !0
                });
            }
        });
    },
    signFun: function(o) {
        var a = this;
        console.log("signFun", o), wx.getStorage({
            key: "azooo_userID",
            success: function(n) {
                if (n.data) a.signFunGo(); else {
                    if (!o.detail.userInfo) return !1;
                    t.wxlogin({
                        encryptedData: o.detail.encryptedData,
                        iv: o.detail.iv,
                        callback: function(t) {
                            if (1 != t) return !1;
                            console.log(1), a.signFunGo(), a.ajax();
                        }
                    });
                }
            },
            fail: function() {
                if (!o.detail.userInfo) return !1;
                t.wxlogin({
                    encryptedData: o.detail.encryptedData,
                    iv: o.detail.iv,
                    callback: function(t) {
                        if (1 != t) return !1;
                        console.log(1), a.signFunGo(), a.ajax();
                    }
                });
            }
        });
    },
    signFunGo: function() {
        this.setData({
            footerFlag: !1
        });
    },
    bgFun: function() {
        this.setData({
            footerFlag: !0
        });
    },
    input_name: function(t) {
        this.setData({
            name: t.detail.value
        });
    },
    input_phone: function(t) {
        this.setData({
            phone: t.detail.value
        });
    },
    input_company: function(t) {
        this.setData({
            company: t.detail.value
        });
    },
    input_post: function(t) {
        this.setData({
            post: t.detail.value
        });
    },
    select: function(t) {
        console.log(t), 1 == t.target.dataset.index ? this.setData({
            drive: 1
        }) : 0 == t.target.dataset.index && this.setData({
            drive: 0
        });
    },
    share_conFun: function() {},
    hide_haibao: function() {
        this.setData({
            haibaoFlag: !0
        });
    },
    save: function() {
        var t = this;
        t.setData({
            haibaoFlag: !0
        }), wx.downloadFile({
            url: t.data.haibao_url,
            success: function(o) {
                console.log(o), wx.saveImageToPhotosAlbum({
                    filePath: o.tempFilePath,
                    success: function(o) {
                        console.log("保存海报成功"), wx.showToast({
                            title: "保存成功",
                            icon: "success",
                            duration: 1500
                        }), t.setData({
                            shareFlag: !0
                        });
                    },
                    fail: function(t) {
                        console.log("fail", t), wx.showToast({
                            title: "保存失败",
                            icon: "none",
                            duration: 1500
                        });
                    }
                });
            },
            fail: function(t) {
                console.log("fail", t), wx.showToast({
                    title: "下载失败",
                    icon: "none",
                    duration: 1500
                });
            }
        });
    },
    openwin: function(t) {
        console.log(t);
        var o = t.target.dataset.url;
        o && wx.navigateTo({
            url: "../" + o + "/" + o
        });
    },
    mapFun: function() {
        wx.openLocation({
            latitude: 23.07109,
            longitude: 113.31279,
            scale: 28,
            name: "创投小镇O2O",
            address: "广州创投小镇O2O创新实验室一楼发布厅"
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});