//订单详细情况脚本
var e = getApp(), t = "";
Page({
    data: {
        info: "",
        apply_invoice_flag: !0,
        apply_invoice_header: "",
        apply_invoice_address: "",
        cancle_flag: !0,
        cancleData: "",
        textareaVal: "",
        voucherFlag: !0,
        voucherImg: null
    },
    onLoad: function(a) {
        var o = this;
        console.log(a);
        var n = a.orderid;
        wx.getStorage({
            key: "azooo_userID",
            success: function(a) {
                console.log(a.data), a.data ? (t = a.data, wx.showLoading({
                    title: "加载中"
                }), wx.request({
                    url: e.globalData.serverUrl + "getOrder",
                    data: {
                        orderID: n,
                        userID: t
                    },
                    method: "POST",
                    success: function(e) {
                        if (console.log(e), wx.hideLoading(), 0 == e.data.error_code) {
                            var t = e.data.data.info;
                            t.colorName || (t.colorName = ""), t.couponName || (t.couponName = ""), t.desc || (t.desc = ""), 
                            t.orderTime ? "尽快到达" != t.orderTime && (t.orderTime = o.getTime(new Date(1e3 * parseInt(t.orderTime)))) : t.orderTime = t.addTime;
                            var a = (parseFloat(t.totalPrice) - parseFloat(t.couponPrice) + parseFloat(t.spreads)).toFixed(2);
                            t.payPrice = a >= 0 ? a : 0, parseFloat(t.spreads) >= 0 ? t.spreads = "￥" + t.spreads : t.spreads = "-￥" + t.spreads, 
                            o.setData({
                                info: t
                            });
                        } else wx.showModal({
                            title: "提示",
                            content: JSON.stringify(e),
                            showCancel: !1,
                            success: function(e) {
                                e.confirm;
                            }
                        });
                    },
                    fail: function() {},
                    complete: function() {
                        wx.hideToast();
                    }
                })) : wx.showModal({
                    title: "提示",
                    content: "没有userID，请到首页重新进入",
                    showCancel: !1,
                    success: function(e) {
                        e.confirm && console.log("用户点击确定");
                    }
                });
            }
        });
        var s = [ {
            flag: !1,
            text: "超出了上门维修范围"
        }, {
            flag: !1,
            text: "需要重新修改订单信息"
        }, {
            flag: !1,
            text: "报价太高了"
        }, {
            flag: !1,
            text: "不想到店维修"
        }, {
            flag: !1,
            text: "重启恢复正常了"
        }, {
            flag: !1,
            text: "等待时间太久"
        }, {
            flag: !1,
            text: "不放心取机维修"
        }, {
            flag: !1,
            text: "工程师无法在约定时间内到达"
        } ];
        o.setData({
            cancleData: s
        });
    },
    tel: function(e) {
        wx.makePhoneCall({
            phoneNumber: e.target.dataset.phone
        });
    },
    backRepair: function(e) {
        var t = e.target.dataset.orderid;
        try {
            wx.removeStorageSync("backRepair_data");
        } catch (e) {
            console.log(e);
        }
        wx.navigateTo({
            url: "../back_repair/back_repair?orderid=" + t
        });
    },
    snFun: function(e) {
        var t = this, a = e.target.dataset.ordersn;
        t.data.voucherImg ? t.setData({
            voucherFlag: !1
        }) : (wx.showLoading({
            title: "加载中"
        }), wx.request({
            url: "https://api.azooo.com/Home/autotask/createCert",
            data: {
                sn: a
            },
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                console.log(e), wx.hideLoading(), 1 == e.data.status ? t.setData({
                    voucherFlag: !1,
                    voucherImg: e.data.data.url
                }) : wx.showModal({
                    title: "提示",
                    content: JSON.stringify(e),
                    showCancel: !1,
                    success: function(e) {
                        e.confirm;
                    }
                });
            },
            fail: function() {},
            complete: function() {
                wx.hideToast();
            }
        }));
    },
    voucherClose: function() {
        this.setData({
            voucherFlag: !0
        });
    },
    applyInvoice: function(e) {
        var t = e.target.dataset.url, a = e.target.dataset.orderid, o = e.target.dataset.name, n = e.target.dataset.phone, s = e.target.dataset.price;
        wx.navigateTo({
            url: "../" + t + "/" + t + "?orderid=" + a + "&name=" + o + "&phone=" + n + "&price=" + s
        });
    },
    inputHeader: function(e) {
        this.setData({
            apply_invoice_header: e.detail.value
        });
    },
    inputAddress: function(e) {
        this.setData({
            apply_invoice_address: e.detail.value
        });
    },
    applyInvoiceAgain: function() {
        this.setData({
            apply_invoice_flag: !0
        });
    },
    applyInvoiceSubmit: function(a) {
        var o = this, n = a.target.dataset.orderid, s = (a.target.dataset.masterid, this.data.apply_invoice_header), i = this.data.apply_invoice_address;
        return s ? i ? (wx.showToast({
            title: "申请提交中...",
            icon: "loading",
            duration: 1e4
        }), void wx.request({
            url: e.globalData.serverUrl + "invoice",
            data: {
                orderID: n,
                userID: t,
                invoiceHead: s,
                invoiceAddress: i
            },
            method: "POST",
            success: function(e) {
                console.log(e), 0 == e.data.error_code ? (wx.showModal({
                    title: "提示",
                    content: "申请成功",
                    showCancel: !1,
                    success: function(e) {
                        e.confirm && console.log("用户点击确定");
                    }
                }), o.setData({
                    apply_invoice_flag: !0
                })) : wx.showModal({
                    title: "提示",
                    content: e.data.error_msg,
                    showCancel: !1,
                    success: function(e) {
                        e.confirm && console.log("用户点击确定");
                    }
                });
            },
            fail: function() {},
            complete: function() {
                wx.hideToast();
            }
        })) : (wx.showToast({
            title: "请输入邮寄地址",
            icon: "success",
            duration: 2e3
        }), !1) : (wx.showToast({
            title: "请输入发票抬头",
            icon: "success",
            duration: 2e3
        }), !1);
    },
    appraise: function(e) {
        var t = e.target.dataset.orderid, a = e.target.dataset.masterid;
        wx.navigateTo({
            url: "../appraise/appraise?orderid=" + t + "&masterid=" + a
        });
    },
    cancelOrder: function(e) {
        this.setData({
            cancle_flag: !this.data.cancle_flag
        });
    },
    pay: function(a) {
        var o = a.target.dataset.orderid;
        wx.showToast({
            title: "付款中...",
            icon: "loading",
            duration: 1e4
        }), wx.request({
            url: e.globalData.serverUrl + "wxPay",
            data: {
                orderID: o,
                userID: t,
                account_id: require("../../utils/account_id.js").account_id
            },
            method: "POST",
            success: function(e) {
                if (console.log(e), 0 == e.data.error_code) {
                    var t = e.data.data.info;
                    wx.requestPayment({
                        timeStamp: t.timeStamp,
                        nonceStr: t.nonceStr,
                        package: t.package,
                        signType: t.signType,
                        paySign: t.paySign,
                        success: function(e) {
                            wx.showModal({
                                title: "提示",
                                content: "付款成功",
                                showCancel: !1,
                                success: function(e) {
                                    e.confirm && (console.log("用户点击确定"), wx.navigateBack({
                                        delta: 1
                                    }));
                                }
                            });
                        },
                        fail: function(e) {
                            console.log(e);
                        }
                    });
                } else wx.showModal({
                    title: "提示",
                    content: e.data.error_msg,
                    showCancel: !1,
                    success: function(e) {
                        e.confirm && console.log("用户点击确定");
                    }
                });
            },
            fail: function() {},
            complete: function() {
                wx.hideToast();
            }
        });
    },
    getTime: function(e) {
        if (console.log(e), e) {
            var t = e.getYear() + 1900, a = e.getMonth() + 1, o = e.getDate(), n = e.getHours(), s = e.getMinutes(), i = e.getSeconds();
            return t + "-" + this.bl(a) + "-" + this.bl(o) + " " + this.bl(n) + ":" + this.bl(s) + ":" + this.bl(i);
        }
        var t = (e = new Date()).getYear() + 1900, a = e.getMonth() + 1, o = e.getDate(), n = e.getHours(), s = e.getMinutes(), i = e.getSeconds();
        return t + "-" + this.bl(a) + "-" + this.bl(o) + " " + this.bl(n) + ":" + this.bl(s) + ":" + this.bl(i);
    },
    bl: function(e) {
        return e < 10 ? "0" + e : e;
    },
    previewImage: function(e) {
        wx.previewImage({
            current: e.target.dataset.url,
            urls: [ e.target.dataset.url ]
        });
    },
    cancelSelect: function(e) {
        var t = e.target.dataset.index, a = this.data.cancleData;
        a[t].flag = !a[t].flag, this.setData({
            cancleData: a
        });
    },
    cancelNo: function() {
        this.setData({
            cancle_flag: !this.data.cancle_flag
        });
    },
    cancelYes: function(a) {
        for (var o = a.target.dataset.orderid, n = "", s = this.data.cancleData, i = 0; i < s.length; i++) s[i].flag && (n = n + s[i].text + ",");
        if (!(n += this.data.textareaVal)) return wx.showToast({
            title: "请选择取消原因",
            icon: "loading",
            duration: 2e3
        }), !1;
        wx.showToast({
            title: "取消订单中...",
            icon: "loading",
            duration: 1e4
        }), wx.request({
            url: e.globalData.serverUrl + "cancelOrder",
            data: {
                orderID: o,
                userID: t,
                cancelReason: n
            },
            method: "POST",
            success: function(e) {
                console.log(e), 0 == e.data.error_code ? wx.showModal({
                    title: "提示",
                    content: "取消订单成功",
                    showCancel: !1,
                    success: function(e) {
                        e.confirm && (console.log("用户点击确定"), wx.navigateBack({
                            delta: 1
                        }));
                    }
                }) : wx.showModal({
                    title: "提示",
                    content: e.data.error_msg,
                    showCancel: !1,
                    success: function(e) {
                        e.confirm && console.log("用户点击确定");
                    }
                });
            },
            fail: function() {},
            complete: function() {
                wx.hideToast();
            }
        });
    },
    textareaVal: function(e) {
        this.setData({
            textareaVal: e.detail.value.substr(0, 100)
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
});