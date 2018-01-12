const isDevFn = (href) => {
    return href && (/dev/.test(href) || /localhost/.test(href));
};