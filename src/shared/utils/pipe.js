export const pipe = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
        .format(value)
        .replace('₫', '')
        .replace(',', '.')
        .trim();
}