var e, t = getApp(), o = null, n = null, a = "";

Page({
    data: {
        invoice: {
            name: null,
            head: null,
            type: 1,
            head_type: 1,
            addr: null,
            phone: null,
            invoiceHao: "",
            content: "*技术服务费",
            price: 0
        },
        data: {
            name: "",
            phone: "",
            province: "",
            city: "",
            district: "",
            address: "",
            serverAddress: ""
        },
        selectAddress_status: !0
    },
    onLoad: function(t) {
        console.log(t.orderid), this.setData({
            "invoice.name": t.name,
            "invoice.phone": t.phone,
            "invoice.price": t.price
        }), e = t.orderid, wx.getStorage({
            key: "azooo_userID",
            success: function(e) {
                console.log(e.data), e.data ? a = e.data : wx.showModal({
                    title: "提示",
                    content: "没有userID，请到首页重新进入",
                    showCancel: !1,
                    success: function(e) {
                        e.confirm && console.log("用户点击确定");
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
    selectAddress: function() {
        var e = this;
        wx.getSetting ? wx.getSetting({
            success: function(e) {
                !1 === e.authSetting["scope.address"] && wx.openSetting({
                    success: function(e) {
                        console.log("openSetting:", e);
                    }
                });
            }
        }) : wx.showModal({
            title: "提示",
            content: "您的微信版本过低，暂不支持此功能，可以下载最新微信版本，获取更多的小程序功能",
            showCancel: !1,
            confirmText: "知道了",
            success: function(e) {}
        }), wx.chooseAddress ? wx.chooseAddress({
            success: function(t) {
                e.setData({
                    "data.name": t.userName,
                    "data.phone": t.telNumber,
                    "data.province": t.provinceName,
                    "data.city": t.cityName,
                    "data.district": t.countyName,
                    "data.address": t.detailInfo,
                    "data.serverAddress": t.provinceName + t.cityName + t.countyName + t.detailInfo,
                    selectAddress_status: !1
                }), n = t.provinceName + t.cityName + t.countyName + t.detailInfo;
            },
            fail: function(t) {
                e.setData({
                    selectAddress_status: !0
                });
            }
        }) : wx.showModal({
            title: "提示",
            content: "您的微信版本过低，暂不支持此功能，可以下载最新微信版本，获取更多的小程序功能",
            showCancel: !1,
            confirmText: "知道了",
            success: function(e) {}
        });
    },
    click_type: function(e) {
        var t = e.target.dataset.val;
        this.setData({
            "invoice.type": t
        });
    },
    click_head_type: function(e) {
        var t = e.target.dataset.val;
        this.setData({
            "invoice.head_type": t
        });
    },
    input_head: function(e) {
        this.setData({
            "invoice.head": e.detail.value
        });
    },
    input_invoiceHao: function(e) {
        this.setData({
            "invoice.invoiceHao": e.detail.value
        });
    },
    input_email: function(e) {
        o = e.detail.value;
    },
    formSubmit: function() {
        var c = this, s = c.data.invoice;
        if (!s.head) return wx.showModal({
            title: "提示",
            content: "请填写发票抬头",
            showCancel: !1,
            success: function(e) {
                e.confirm && console.log("用户点击确定");
            }
        }), !1;
        if (2 == s.head_type && !s.invoiceHao) return wx.showModal({
            title: "提示",
            content: "请填写纳税人识别号",
            showCancel: !1,
            success: function(e) {
                e.confirm && console.log("用户点击确定");
            }
        }), !1;
        if (!(n && o || (1 != s.type || o) && (2 != s.type || n))) {
            var i = 1 == s.type ? "请填写您的电子邮箱" : "请选择您的收货地址";
            return wx.showModal({
                title: "提示",
                content: i,
                showCancel: !1,
                success: function(e) {
                    e.confirm && console.log("用户点击确定");
                }
            }), !1;
        }
        if (o && !c.isEmailAddress(o)) return wx.showModal({
            title: "提示",
            content: "请填写正确的电子邮箱",
            showCancel: !1,
            success: function(e) {
                e.confirm && console.log("用户点击确定");
            }
        }), !1;
        console.log(c.isEmailAddress(o)), 1 == s.type ? c.setData({
            "invoice.addr": o
        }) : 2 == s.type && c.setData({
            "invoice.addr": n
        }), wx.request({
            url: t.globalData.serverUrl + "addInvoice",
            method: "POST",
            data: {
                userID: a,
                id: e,
                name: s.name,
                head: s.head,
                type: s.type,
                head_type: s.head_type,
                addr: s.addr,
                phone: s.phone,
                invoiceHao: s.invoiceHao,
                content: "*技术服务费"
            },
            success: function(e) {
                console.log(e.data), 1 == e.data.error_code ? wx.showModal({
                    title: "提示",
                    content: e.data.error_msg,
                    showCancel: !1,
                    success: function(e) {
                        e.confirm && console.log("用户点击确定");
                    }
                }) : 0 == e.data.error_code && wx.showModal({
                    title: "提示",
                    content: "发票申请成功",
                    showCancel: !1,
                    success: function(e) {
                        e.confirm && console.log("用户点击确定");
                    }
                });
            }
        });
    },
    isEmailAddress: function(e) {
        return /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/.test(e);
    }
});