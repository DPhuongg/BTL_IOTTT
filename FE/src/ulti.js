export const getTemperatureColor = (temperature) => {
    if (temperature <= 10) return 'rgb(0, 88, 207)';
    if (temperature <= 20) return 'rgb(65, 180, 178)';
    if (temperature <= 30) return 'rgb(249, 251, 4)';
    if (temperature <= 40) return 'rgb(254, 111, 7)';
    return 'rgb(248, 5, 0)';
};

export const createQueryString = (filter, page) => {
    let queryString = '?';
    Object.keys(filter).forEach((query) => {
        if (filter[query]) queryString += `${query}=${filter[query]}&`
    })
    Object.keys(page).forEach((query) => {
        if (page[query]) queryString += `${query}=${page[query]}&`
    })
    return queryString.slice(0, -1);
}

export const mappingDataSensor = (datas) => {
    return datas.map((data, index) => {
        return {
            stt: index + 1,
            id: data.id,
            temperature: data.temperature,
            humidity: data.humidity,
            light: data.light,
            gas: data.gas,
            time: convertUtcToVnTime(data.createdAt)
        }
    })
}

export const mappingActionHistory = (datas) => {
    return datas.map((data, index) => {
        return {
            stt: index + 1,
            id: data.id,
            device: data.device,
            action: data.action,
            time: convertUtcToVnTime(data.createdAt)
        }
    })
}

export const convertUtcToVnTimeChart = (time) => {
    const date = new Date(time);
    return new Intl.DateTimeFormat('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Ho_Chi_Minh'
    }).format(date)
}
export const convertUtcToVnTime = (time) => {
    const date = new Date(time);

    // Chuyển đổi giờ UTC về múi giờ Việt Nam
    const vnTime = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }));

    const year = vnTime.getFullYear();
    const month = String(vnTime.getMonth() + 1).padStart(2, '0'); // getMonth() trả về giá trị từ 0 đến 11
    const day = String(vnTime.getDate()).padStart(2, '0');
    const hours = String(vnTime.getHours()).padStart(2, '0');
    const minutes = String(vnTime.getMinutes()).padStart(2, '0');
    const seconds = String(vnTime.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
