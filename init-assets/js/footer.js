const footer = ({
    $target,
    isMobile,
    isAboveIE9
} = {
        $target: $('body'),
        isMobile: false,
        isAboveIE9: true,
    }) => {
    const date = new Date();
    const targetBlank = 'target="_blank"';
    const hrefCom = 'href="http://www.xinhuanet.com"';
    const hrefLtd = 'href="http://www.xinhuanet.ltd"';
    const mobileBr = isMobile ? '<br>' : '';

    const dom = `
        <div class="footer">
            <p> <a href="http://www.xinhuanet.com/company/contact-us.htm" ${targetBlank}>联系我们</a> | 电话：010-88050799    邮箱：uav@news.cn</p>
            <p>Copyright © 2000 - ${date.getFullYear()} XINHUANET.com　All Rights Reserved.${mobileBr}  　制作单位：<a ${hrefLtd} ${targetBlank}>新华网股份有限公司</a></p>
            <p>本网站各种专题专栏资料，均为<a ${hrefLtd} ${targetBlank}>新华网股份有限公司</a>版权所有，${mobileBr}未经协议授权禁止下载使用。</p>
        </div>`;

    let aboveIE9Tips = '';
    if (!isAboveIE9) {
        aboveIE9Tips = `
            <div class="hack-tips">
                <h1 class="t1">Oops！似乎发生了一些异常</h1>
                <p>如果您能看到这个提示，这说明您的浏览器已过于陈旧，我们建议您尽快进行升级。</p>
                <div class="t2">
                    PS: 公元2015年微软放弃了ie10及以下版本浏览器的安全更新，<br>
                    2016年某宝某猫某某巴巴已经都不支持ie8、9、10了！<br>
                    如果您还在使用这些浏览器会存在巨大的安全隐患！
                </div>
                <span class="t3">
                    一些有用的信息：${window.BRO.browser} + ${window.BRO.device} / ${window.BRO.ua}
                </span>
            </div>
        `;
    }

    $target.append(dom + aboveIE9Tips);
};