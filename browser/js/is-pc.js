const isPcFn = (device) => {
    // return device === 'mac' || device === 'windows';
    return /mac/ig.test(device) || /windows/ig.test(device); // || /windows edge/ig.test(device);
};