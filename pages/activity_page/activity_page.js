Page({
    data: {
        page: "https://api.azooo.com/WechatWeb/Activity/huandianchi99.html"
    },
    onLoad: function(a) {
        console.log(a), a && a.url && this.setData({
            page: a.url
        });
    }
});