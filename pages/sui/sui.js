Page({
    data: {},
    onLoad: function(a) {
        console.log(a), a && this.setData({
            page: "https://api.azooo.com/WechatWeb/ScreenInsurance/activate/account/5?from=groupmessage&number=" + a.number + "&password=" + a.password
        });
    }
});