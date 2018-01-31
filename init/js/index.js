$(() => {
    // import cmsConfig from './cms-config';
    @import '../js/cms-config.js'
    // import isDev_fn from './is-dev';
    @import '../js/is-dev.js'
    // import isPC_fn from './is-pc';
    @import '../js/is-pc.js'
    // import footer from './footer';
    @import '../js/footer.js'
    // import addDatas from './add-datas';
    @import '../js/add-datas.js'
    // import wechatShare from './wechat-share';
    @import '../js/wechat-share.js'
    // import rot from './rot';
    @import '../js/rot.js'



    const $window = $(window);
    const $html = $('html');
    const $body = $('body');

    if (isAboveIE9) {
        $body.append(`<script src="bundle/swiper.min.js"></script>`);
    } else {
        $('head').append('<link rel="stylesheet" href="bundle/idangerous.swiper.css">');
        $body.append('<script src="bundle/idangerous.swiper.min.js"></script>');
    }

    let windowWidth = $window.width();
    let MOBILE_WIDTH_RATIO = 710 / 750;
    let MOBILE_WIDTH = windowWidth * MOBILE_WIDTH_RATIO;

    const { isDev, isPC } = {
        isDev: isDevFn(),
        isPC: isPcFn(),
    };
    let isMobile = !isPC;

    footer({
        $target: $('body'),
        isMobile,
        isAboveIE9,
    });

    wechatShare({
        title: $('title').text(),
        substr: $('meta[name="description"]').attr('content'),
        src: 'http://uav.xinhuanet.com/wlstdh/bundle/wechat-logo.png',
    });

    if (isMobile) {
        $('.area-banner-img').html(`<img src="bundle/mobile-banner.png" width="100%" height="auto">`);
        $('.container').width(MOBILE_WIDTH);
        $('.topbox .container').width('100%');
        $('.text-swiper').width(MOBILE_WIDTH - $('.container2').find('.col2').width() + 20);
    } else {
        $body.append(`<script src="bundle/jquery.slimscroll.min.js"></script>`);
    }

    console.log('====================================');
    console.log('Swiper: ', Swiper.VER);
    console.log('isDev: ', isDev);
    console.log('isPC: ', isPC);
    console.log('isMobile: ', isMobile);
    console.log('====================================');

    // add-datas
    addDatas({
        isOff: 0,
        isDev,
        pages: [
            {
                reg: 'jsbb',
                key: '即时播报',
                number: 200,
                dom({ key }) {
                    return `<div class="sprite sprite-jishibobao">
                                <h2 class="hide">${key}</h2>
                            </div>`;
                },
            },
            // {
            //     reg: 'gqtp',
            //     key: '高清图片',
            //     number: 200,
            //     dom({ key }) {
            //         return `<h2 class="page-title">${key}</h2>`;
            //     },
            // }
        ],
        cms: cmsConfig,
        cb: {
            rot1() {
                rot({
                    $target: $('#rot1'),
                    isFade: false,
                    isPagination: true,
                    isMobile,
                    onStart() {
                        if (isMobile) {
                            const ratio = 405 / 710;
                            $('#rot1').width(MOBILE_WIDTH).height(MOBILE_WIDTH * ratio);
                        }
                    }
                });
            },
            rot2() {
                rot({
                    $target: $('#text-swiper'),
                    isFade: false,
                    isPagination: false,
                    isMobile,
                    onStart() {
                        $('#text-swiper')
                            .find('.swiper-slide')
                            .each((i, e) => {
                                const $e = $(e);
                                const w = $e.find('.swiper-title').width() + 40; //+ 26;
                                // console.log(w);
                                $e.attr('style', `width:${w}px`);
                            });
                    },
                    setConfig: {
                        slidesPerView: 'auto',
                        // slidesPerGroup: 1,
                        spaceBetween: 10
                    }
                });
            },
            rotPicSwiper() {
                rot({
                    $target: $('#pic-swiper'),
                    isFade: false,
                    isPagination: isMobile ? true : false,
                    isMobile,
                    isOrgBtns: isMobile ? false : true,
                    setConfig: {
                        slidesPerView: isMobile ? 1 : 4,
                        slidesPerGroup: isMobile ? 1 : 4,
                        slidesPerColumn: isMobile ? 2 : 1,
                        spaceBetween: isMobile ? 10 : 20,
                        autoplay: false,
                        loop: isMobile ? false : true,
                    }
                });
            },
            rotPicSwiper2() {
                rot({
                    $target: $('#pic-swiper2'),
                    isFade: false,
                    isPagination: isMobile ? true : false,
                    isMobile,
                    isOrgBtns: isMobile ? false : true,
                    setConfig: {
                        slidesPerView: isMobile ? 1 : 4,
                        slidesPerGroup: isMobile ? 1 : 4,
                        slidesPerColumn: isMobile ? 2 : 1,
                        spaceBetween: isMobile ? 10 : 20,
                        autoplay: false,
                        loop: isMobile ? false : true,
                    }
                });
            },
            // qrcode() {
            // // qrcode
            // const $qrcode = $('#qrcode');
            // $qrcode.find('.row').each((i, e) => {
            //     const $e = $(e);
            //     const $a = $e.find('a');
            //     const href = $a.attr('data-href');
            //     if (href) {
            //         const id = 'qrcode-img' + i;
            //         $a.prepend(`<div class="qrcode-img" id="${id}"></div>`);
            //         const qrcode = new QRCode(document.getElementById(id), {
            //             width: 140,
            //             height: 140
            //         });
            //         qrcode.makeCode(href);
            //     }
            // });
            // }
            qrcodeRot() {
                rot({
                    $target: $('#qrcode-swiper'),
                    isFade: false,
                    isPagination: isMobile ? false : true,
                    isOrgBtns: isMobile ? false : true,
                    isMobile,
                    setConfig: {
                        slidesPerView: isMobile ? 2 : 1,
                        // slidesPerColumn: isMobile ? 1 : 2,
                        spaceBetween: 10,
                        // autoplay: 3000,
                        // loop: isMobile ? false : true,
                        loop: true,
                        // paginationType: 'custom',
                        // paginationCustomRender(swiper, current, total) {
                        //     return $(swiper.slides[current]).find('.qrcode-title').text();
                        // }
                    }
                });
            }
        }
    });

    search();
    calendar();

});


