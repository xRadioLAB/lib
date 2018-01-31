const isDevFn = () => {
    const href = window.location.href;
    return (/dev/.test(href) || /localhost/.test(href));
    // return true;
};