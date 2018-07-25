//下单成功处理显示
Page({
    data: {
        id: ""
    },
    onLoad: function(o) {
        this.setData({
            id: o.id
        });
    },
    look: function() {
        wx.navigateTo({
            url: "../order_details/order_details?orderid=" + this.data.id
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
});