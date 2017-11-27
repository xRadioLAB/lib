const rot = ({
    $target,
    onStart,
    isFade,
    isPagination,
    isFraction,
    isGroup,
    isOrgBtns,
    isMobile,
    setConfig,
    btnStyle,
}) => {
    onStart && onStart();

    const selector = $target.selector;
    const selectorText = selector.replace('#', '');
    const targetLen = $target.find('.swiper-slide').length;
    // let addLine = () => {
    //     if ($target.find('.line')) {
    //         $target.append('<div class="line"></div>');
    //     }
    // };
    let btns = `
        <div class="arrow-left hide"></div>
        <div class="arrow-right hide"></div>
    `;

    const config = {
        loop: true,
        grabCursor: true,
        paginationClickable: true,
        pagination: `${selector} .pagination`,
        prevButton: `${selector} .arrow-left`,
        nextButton: `${selector} .arrow-right`,
        // spaceBetween: isMobile ? 1 : 0,
    };

    if (isFade && !isMobile) {
        config.effect = 'fade';
        config.fade = {
            crossFade: true,
        };
        config.speed = 3000;
    }

    if (isFraction) {
        config.paginationType = 'fraction';
    }

    let pagination = '';
    if (isPagination) {
        pagination = `<div class="swiper-pagination pagination"></div>`;
    }

    if (isGroup) {
        config.slidesPerView = 3;
        config.slidesPerGroup = 3;
        config.spaceBetween = 26;
        if (isMobile) {
            config.slidesPerView = 1;
            config.slidesPerGroup = 1;
            config.spaceBetween = 8;
        }
    }


    if (isOrgBtns) {
        btns = `
            <div class="swiper-button-prev${    btnStyle ? ' ' + btnStyle : ''
            }" id="swiper-button-prev-${selectorText}"></div>
            <div class="swiper-button-next${    btnStyle ? ' ' + btnStyle : ''
            }" id="swiper-button-next-${selectorText}"></div>
        `;
    }

    if (targetLen > 1) {
        $target.append(`
            ${pagination}
            ${!(isOrgBtns) ? btns : ''}
        `);

        if (isOrgBtns) {
            $target.wrap(`
                <div data-name="is-jq-wrap" style="position: relative;"></div>
            `);
            $target.after(btns);
            config.prevButton = `#swiper-button-prev-${selectorText}`;
            config.nextButton = `#swiper-button-next-${selectorText}`;
            config.loop = isMobile ? true : false;
        }

        if (!isOrgBtns) {
            $($target.selector).on('mouseover mouseleave', (e) => {
                const $left = $(e.currentTarget).find('.arrow-left');
                const $right = $(e.currentTarget).find('.arrow-right');
                if (e.type === 'mouseover') {
                    $left.fadeIn();
                    $right.fadeIn();
                } else {
                    $left.fadeOut();
                    $right.fadeOut();
                }
            });
        }

        config.autoplay = isMobile ? false : 3500;

        // if (isMobile) {
        //     const orgWidth = $target.width();
        //     const orgHeight = $target.height();
        //     console.log('====================================');
        //     console.log(orgWidth, orgHeight);
        //     console.log('====================================');
        //     const width = $target.parent().width();
        //     const height = width * orgHeight / orgWidth;
        //     // $target.width(width).height(height);
        // }
        let _config = config;
        if (setConfig) {
            _config = $.extend(config, setConfig);
        }
        // console.log('====================================');
        // console.log(_config.slidesPerGroup);
        // console.log('====================================');
        return new Swiper(selector, _config);
    }
};