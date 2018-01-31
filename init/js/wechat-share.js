const wechatShare = ({
    title,
    substr,
    script = [
        'https://res.wx.qq.com/open/js/jweixin-1.0.0.js',
        'http://www.xinhuanet.com/global/public/wxShare.js',
    ],
    src,
}) => {
    $('body').append(`
        <div data-wechat="1" style="display:none">
            <div class="share-title">${$.trim(title)}</div>
            <div class="share-substr">${$.trim(substr)}</div>
            <img class="share-img" src="${src}" width="300" height="300">
        </div>
        <script src="${script[0]}"></script>
        <script src="${script[1]}"></script>
    `);
};