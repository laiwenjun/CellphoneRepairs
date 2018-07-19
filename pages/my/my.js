var n = getApp();

Page({
    data: {
        userInfo: ""
    },
    onLoad: function(o) {
        this.setData({
            userInfo: n.globalData.userInfo
        });
    },
    openwin: function(n) {
        console.log(n);
        var o = n.target.dataset.url;
        wx.navigateTo({
            url: "../" + o + "/" + o
        });
    },
    tel: function() {
        wx.makePhoneCall({
            phoneNumber: "4006-233-866"
        });
    },
    telJoin: function() {
        wx.makePhoneCall({
            phoneNumber: "16620137673"
        });
    },
    onReady: function() {},
    onShow: function() {
        wx.removeStorage({
            key: "order_data",
            success: function(n) {
                console.log(n);
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});