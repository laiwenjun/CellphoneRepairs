//地图显示
Page({
    data: {
      latitude: 23.1353360000,
      longitude: 113.2714290000,
        markers: [ {
            id: 1,
          latitude: 23.1353360000, 
          longitude: 113.2714290000,
          name: "广东省广州市越秀区吉祥路79号"
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