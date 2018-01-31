const isPcFn = () => {
    const browser = window.BRO;
    return (browser && (browser.device === 'mac' || browser.device === 'windows'));
};