const formatNumber = (number, decimals = 2) => {
    if (number < 1000) {
        return number.toString();
    }

    const units = ["", "K", "M", "G", "T", "P", "E"];
    const index = Math.floor(Math.log10(number) / 3);
    const scaledNum = (number / Math.pow(1000, index)).toFixed(decimals);
    return `${scaledNum.replace(/\.?0+$/, "")}${units[index]}`;
};

console.log(formatNumber(3546789743));