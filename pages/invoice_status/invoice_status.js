function n(n, o, e) {
    return o in n ? Object.defineProperty(n, o, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : n[o] = e, n;
}

var o, e, a = getApp(), t = "";

Page({
    data: {
        invoice: (o = {
            name: null,
            head: null,
            type: 1,
            head_type: 1,
            address: null,
            phone: null,
            invoiceHao: null,
            content: "*技术服务费",
            price: "",
            orderSn: "",
            add_time: ""
        }, n(o, "invoiceHao", ""), n(o, "status", null), o)
    },
    onLoad: function(n) {
        console.log(n.orderid), console.log(n.masterid);
        var o = this;
        o.setData({
            "invoice.name": n.name,
            "invoice.phone": n.phone,
            "invoice.price": n.price
        }), e = n.orderid, wx.getStorage({
            key: "azooo_userID",
            success: function(n) {
                console.log(n.data), n.data ? (t = n.data, o.invoice_con()) : wx.showModal({
                    title: "提示",
                    content: "没有userID，请到首页重新进入",
                    showCancel: !1,
                    success: function(n) {
                        n.confirm && console.log("用户点击确定");
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
    onShareAppMessage: function() {},
    invoice_con: function() {
        var n = this;
        wx.request({
            url: a.globalData.serverUrl + "invoiceDetails",
            method: "POST",
            data: {
                userID: t,
                id: e
            },
            success: function(o) {
                console.log(o.data.data.info), n.setData({
                    invoice: o.data.data.info
                });
            }
        });
    }
});