Page({
    data: {
        latitude: 23.07109,
        longitude: 113.31279,
        markers: [ {
            id: 1,
            latitude: 23.07109,
            longitude: 113.31279,
            name: "广州创投小镇O2O创新实验室一楼发布厅"
        } ]
    },
    onLoad: function(n) {},
    onReady: function() {
        this.mapCtx = wx.createMapContext("myMap");
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});