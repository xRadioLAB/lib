
const addDatas = ({ cms, cb, pages, isDev, isOff }) => {
    const isOn = isOff !== 1;
    if (isOn) {
        isDev = 0;
        let isMain = true;
        const url = 'http://qc.wa.news.cn/nodeart/list';
        const _cms = cms['1'].list;
        const MAIN_URL = isDev ? 'http://localhost:3000/' : cms.url;
        // console.log('====================================');
        // console.log(_cms);
        // console.log('====================================');
        const tip = ({ key, _cms, textStatus, data }) => {
            // return `${key} ${_cms[key].cid} ${data.message}`;
        };
        const devLog = ({ tips, jqXHR, data }) => {
            if (isAboveIE9 && isDev) console.log(tips, jqXHR, data);
        };
        const listData = ({ key, number }) => {
            $.ajax({
                url: url,
                data: {
                    nid: _cms[key].cid,
                    cnt: number ? number : 5,
                    pgnum: 1,
                    tp: 1,
                    orderby: 1,
                },
                dataType: 'jsonp'
            }).done((data, textStatus, jqXHR) => {
                let listDom = '';
                let list = 0;
                const isData = data.status !== '-1';
                const tips = tip({ key, _cms, textStatus, data });
                if (isData) {
                    data.data.list.map((item, index) => {
                        if (number ? true : (list < 4)) {
                            listDom += `
                        <li>
                            <a target="_blank" href="${item.LinkUrl}" data-info="${key}: ${_cms[key].cid}, DocID: ${item.DocID}, PubTime: ${item.PubTime}">${item.Title}</a>
                        </li>
                    `;
                            list++;
                        }
                    });
                } else {
                    listDom = tips;
                }
                devLog({ tips, jqXHR, data });
                $(`[data-list="${key}"]`).html(listDom);
            });
        };

        if (isDev) {
            _cms['二维码'].cid =
                _cms['通栏广告'].cid =
                _cms['大图'].cid =
                _cms['聚焦'].cid =
                _cms['即时播报'].cid = 11168296;
        }

        // console.log('====================================');
        // console.log(pages);
        // console.log('====================================');

        if (pages.length) {
            pages.map((e) => {
                const reg = new RegExp(e.reg);
                const isPages = reg.test(window.location.href);
                // console.log('isPages: ', isPages);
                if (isPages && isMain) {
                    isMain = false;

                    $('html').addClass('pages');
                    $('.main').remove();

                    $('.container-pages')
                        .show()
                        .find('.list')
                        .attr('data-list', e.key);

                    if (e.dom) {
                        const dom = e.dom({ key: e.key });
                        $('#page-col-title')
                            .html(dom)
                            .after(`<div class="back-home"><a href="${MAIN_URL}" target="_self"><< 返回首页 </a></div>`);
                    }

                    $('#bread').html(`
                    <span class="bread-t">当前位置：</span>
                    <span class="bread-c">
                        <a href="${MAIN_URL}">新华网网络视听大会 </a> 
                        > 
                        <a class="active" href="${e.reg}.html"> ${e.key} </a>
                    </span>`);

                    listData({
                        key: e.key,
                        number: e.number
                    });
                }
                // else {
                //     console.log('not pages')
                //     // isMain = true;
                //     $('html').removeClass('pages');
                //     $('.container-pages').hide();
                // }
            });

            // right side
            let pagesRightDom = '';
            const pagesRight = [{
                text: '总议程',
                href: '#'
            }, {
                text: '高端峰会',
                href: '#'
            }, {
                text: '专业论坛',
                href: '#'
            }, {
                text: '业界活动',
                href: '#'
            }, {
                text: '展交会',
                href: '#'
            }];
            pagesRight.map((e, i) => {
                pagesRightDom += `
                <a href="${e.href}">
                    <img src="bundle/side${i - 0 + 1}.png" width="100%" height="auto">
                    <div class="page-right-title">
                        ${e.text}
                    </div>
                </a>`;
            });
            $('#pages-right').html(pagesRightDom);
        } else {
            isMain = true;
        }

        // console.log('isMain: ', isMain);

        if (isMain) {
            $('html').removeClass('pages');
            $('.container-pages').remove();

            // 大图 
            $.ajax({
                url: url,
                data: {
                    nid: _cms['大图'].cid,
                    cnt: 20,
                    pgnum: 1,
                    tp: 1,
                    orderby: 1,
                },
                dataType: 'jsonp'
            }).done((data, textStatus, jqXHR) => {
                const key = '大图';
                let imgDom = '';
                let img = 0;
                const isData = data.status !== '-1';
                const tips = tip({ key, _cms, textStatus, data });
                if (isData) {
                    data.data.list.map((item, index) => {
                        if (img < 5) { //图片 item.Attr === 63 && 
                            imgDom += `
                        <div class="swiper-slide">
                            <a target="_blank" href="${item.LinkUrl}" data-info="${key}: ${_cms[key].cid}, DocID: ${item.DocID}, PubTime: ${item.PubTime}">
                                <img src="${item.allPics && item.allPics[0]}" class="transition"  width="100%" height="auto">
                                <div class="swiper-title">
                                    <div class="swiper-text">${item.Title}</div>
                                </div>
                            </a>
                        </div>
                    `;
                            img++;
                        }
                    });
                } else {
                    imgDom = tips;
                }
                devLog({ tips, jqXHR, data });
                $(`[data-img="${key}"]`).html(imgDom);
                cb && cb.rot1 && cb.rot1();
            });

            // 聚焦
            $.ajax({
                url: url,
                data: {
                    nid: _cms['聚焦'].cid,
                    cnt: 20,
                    pgnum: 1,
                    tp: 1,
                    orderby: 1,
                },
                dataType: 'jsonp'
            }).done((data, textStatus, jqXHR) => {
                const key = '聚焦';
                let bigTitleDom = '';
                let bigTitle = 0;
                let listDom = '';
                let list = 0;
                const isData = data.status !== '-1';
                const tips = tip({ key, _cms, textStatus, data });
                if (isData) {
                    data.data.list.map((item, index) => {

                        if (item.Attr === 63 && bigTitle < 1) { //头条
                            bigTitleDom += `
                        <h2 class="big-title">
                            <a target="_blank" href="${item.LinkUrl}" data-info="${key}: ${_cms[key].cid}, DocID: ${item.DocID}, PubTime: ${item.PubTime}">${item.Title}</a>
                        </h2>
                        <div class="abs">
                            ${(item.Abstract !== null) ? item.Abstract + ' <a target="_blank" href="' + item.LinkUrl + '">[详细]</a>' : ''}
                        </div>
                    `;
                            bigTitle++;
                        }

                        if (item.Attr === 63 && list < 4) { //普通
                            listDom += `
                        <li>
                            <a target="_blank" href="${item.LinkUrl}" data-info="${key}: ${_cms[key].cid}, DocID: ${item.DocID}, PubTime: ${item.PubTime}">${item.Title}</a>
                        </li>
                    `;
                            list++;

                        }
                    });
                } else {
                    bigTitleDom = tips;
                    listDom = tips;
                }
                devLog({ tips, jqXHR, data });
                $(`[data-title="${key}"]`).html(bigTitleDom);
                $(`[data-list="${key}"]`).html(listDom);
            });

            // 即时播报
            $.ajax({
                url: url,
                data: {
                    nid: _cms['即时播报'].cid,
                    cnt: 20,
                    pgnum: 1,
                    tp: 1,
                    orderby: 1,
                },
                dataType: 'jsonp'
            }).done((data, textStatus, jqXHR) => {
                const key = '即时播报';
                let listDom = '';
                let list = 0;
                const isData = data.status !== '-1';
                const tips = tip({ key, _cms, textStatus, data });
                if (isData) {
                    data.data.list.map((item, index) => {
                        listDom += `
                    <div class="swiper-slide">
                        <a target="_blank" href="${item.LinkUrl}" data-info="${key}: ${_cms[key].cid}, DocID: ${item.DocID}, PubTime: ${item.PubTime}">
                            <div class="swiper-title">
                                ${item.Title}
                            </div>
                        </a>
                    </div>
                `;
                        list++;
                    });
                } else {
                    listDom = tips;
                }
                devLog({ tips, jqXHR, data });
                $(`[data-list="${key}"]`).html(listDom);
                cb && cb.rot2 && cb.rot2();
            });

            // 精彩视频
            $.ajax({
                url: url,
                data: {
                    nid: _cms['精彩视频'].cid,
                    cnt: 20,
                    pgnum: 1,
                    tp: 1,
                    orderby: 1,
                },
                dataType: 'jsonp'
            }).done((data, textStatus, jqXHR) => {
                const key = '精彩视频';
                let imgDom = '';
                let img = 0;
                const isData = data.status !== '-1';
                const tips = tip({ key, _cms, textStatus, data });
                if (isData) {
                    data.data.list.map((item, index) => {
                        imgDom += `
                        <div class="swiper-slide">
                            <a target="_blank" href="${item.LinkUrl}" data-info="${key}: ${_cms[key].cid}, DocID: ${item.DocID}, PubTime: ${item.PubTime}">
                                <div class="pic-swiper-btn-box">
                                    <img src="${item.allPics && item.allPics[0]}" class="transition"  width="100%" height="auto">
                                </div>
                                <div class="swiper-title">
                                    ${item.Title}
                                </div>
                            </a>
                        </div>
                    `;
                        img++;
                    });
                } else {
                    imgDom = tips;
                }
                devLog({ tips, jqXHR, data });
                $(`[data-img="${key}"]`).html(imgDom);
                cb && cb.rotPicSwiper && cb.rotPicSwiper();
            });

            // 日程安排

            // 二维码
            $.ajax({
                url: url,
                data: {
                    nid: _cms['二维码'].cid,
                    cnt: 20,
                    pgnum: 1,
                    tp: 1,
                    orderby: 1,
                },
                dataType: 'jsonp'
            }).done((data, textStatus, jqXHR) => {
                const key = '二维码';
                let listDom = `<div class="swiper-container qrcode-swiper" id="qrcode-swiper">
                                <div class="swiper-wrapper">`;

                let list = 0;
                const isData = data.status !== '-1';
                const tips = tip({ key, _cms, textStatus, data });
                if (isData) {
                    data.data.list.map((item, index) => {
                        if (list < 2) { //普通
                            listDom += `
                            <div class="swiper-slide">
                                <div class="row">
                                    <img data-href="${item.LinkUrl}" data-info="${key}: ${_cms[key].cid}, DocID: ${item.DocID}, PubTime: ${item.PubTime}" src="${item.allPics && item.allPics[0]}" width="140" height="140">
                                    <div class="qrcode-title">
                                        ${item.Title}
                                    </div>
                                </div>
                            </div>`;
                            // <a href="javascript:void(0);" data-href="${item.LinkUrl}" data-info="${key}: ${_cms[key].cid}, DocID: ${item.DocID}, PubTime: ${item.PubTime}"> </a>
                            list++;
                        }
                    });
                } else {
                    listDom = tips;
                }
                devLog({ tips, jqXHR, data });
                listDom += '</div></div>';
                $(`[data-list="${key}"]`).html(listDom);
                cb && cb.qrcodeRot && cb.qrcodeRot();
            });

            // 高清图片
            $.ajax({
                url: url,
                data: {
                    nid: _cms['高清图片'].cid,
                    cnt: 20,
                    pgnum: 1,
                    tp: 1,
                    orderby: 1,
                },
                dataType: 'jsonp'
            }).done((data, textStatus, jqXHR) => {
                const key = '高清图片';
                let imgDom = '';
                let img = 0;
                const isData = data.status !== '-1';
                const tips = tip({ key, _cms, textStatus, data });
                if (isData) {
                    data.data.list.map((item, index) => {
                        imgDom += `
                        <div class="swiper-slide">
                            <a target="_blank" href="${item.LinkUrl}" data-info="${key}: ${_cms[key].cid}, DocID: ${item.DocID}, PubTime: ${item.PubTime}">
                                <div class="pic-swiper-btn-box">
                                    <img src="${item.allPics && item.allPics[0]}" class="transition"  width="100%" height="auto">
                                </div>
                                <div class="swiper-title">
                                    ${item.Title}
                                </div>
                            </a>
                        </div>
                    `;
                        img++;
                    });
                } else {
                    imgDom = tips;
                }
                devLog({ tips, jqXHR, data });
                $(`[data-img="${key}"]`).html(imgDom);
                cb && cb.rotPicSwiper2 && cb.rotPicSwiper2();
            });

            listData({ key: '大咖说' });
            listData({ key: '行业' });
            listData({ key: '资讯' });
            listData({ key: '技术' });

            // 合作机构
            $.ajax({
                url: url,
                data: {
                    nid: _cms['合作机构'].cid,
                    cnt: 20,
                    pgnum: 1,
                    tp: 1,
                    orderby: 1,
                },
                dataType: 'jsonp'
            }).done((data, textStatus, jqXHR) => {
                const key = '合作机构';
                let listDom = '';
                let list = 0;
                const isData = data.status !== '-1';
                const tips = tip({ key, _cms, textStatus, data });
                if (isData) {
                    data.data.list.map((item, index) => {
                        // if (list < 2) { //普通
                        listDom += `
                        <a target="_blank" href="${item.LinkUrl}" data-info="${key}: ${_cms[key].cid}, DocID: ${item.DocID}, PubTime: ${item.PubTime}">
                            <img src="${item.allPics && item.allPics[0]}" width="auto" height="52">
                        </a>
                    `;
                        list++;
                        // }
                    });
                } else {
                    listDom = tips;
                }
                devLog({ tips, jqXHR, data });
                $(`[data-list="${key}"]`).html(listDom);
            });

            // 广告1
            $.ajax({
                url: url,
                data: {
                    nid: _cms['通栏广告'].cid,
                    cnt: 2,
                    pgnum: 1,
                    tp: 1,
                    orderby: 1,
                },
                dataType: 'jsonp'
            }).done((data, textStatus, jqXHR) => {
                const key = '通栏广告';
                let listDom = [];
                let list = 0;
                const isData = data.status !== '-1';
                const tips = tip({ key, _cms, textStatus, data });
                if (isData) {
                    data.data.list.map((item, index) => {
                        listDom.push(`
                    <div class="container container-ad">
                        <a target="_blank" href="${item.LinkUrl}" data-info="${key}: ${_cms[key].cid}, DocID: ${item.DocID}, PubTime: ${item.PubTime}">
                            <img src="${item.allPics && item.allPics[0]}" width="100%" height="100">
                        </a>
                    </div>
                `);
                        list++;
                    });

                    devLog({ tips, jqXHR, data });
                    const $body = $('body');
                    const $keys = $body.find(`[data-list="${key}"]`)
                    $keys.eq(0).html(listDom[0]);
                    $keys.eq(1).html(listDom[1]);

                } else {
                    listDom = tips;
                }

            });

            $('.main').show();
        }
    }
};