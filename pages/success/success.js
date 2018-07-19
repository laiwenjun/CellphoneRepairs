var t, e, s = getApp();

Page({
    data: {
        status: 72,
        store_address: "",
        store_time: "",
        store_phone: ""
    },
    onLoad: function(a) {
        var o = this;
        this.setData({
            id: a.id,
            status: a.status
        }), e = a.storeId, console.log(e), 73 == a.status && wx.request({
            url: s.globalData.serverUrl + "getStores",
            data: {},
            method: "GET",
            header: {
                "content-type": "application/json"
            },
            success: function(s) {
                t = s.data.data.store, console.log(t);
                for (var a in t) t[a].id == e && o.setData({
                    store_address: t[a].address,
                    store_time: t[a].serviceTime,
                    store_phone: t[a].phone
                });
            }
        });
    },
    clickIndex: function() {
        wx.reLaunch({
            url: "../index/index"
        });
    },
    look: function() {
        wx.navigateTo({
            url: "../order_details/order_details?orderid=" + this.data.id
        });
    }
});