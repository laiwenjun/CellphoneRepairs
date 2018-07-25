//提现成功页面提示处理
Page({
    data: {},
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    return_last: function() {
        wx.navigateBack({
            delta: 1
        });
    }
});