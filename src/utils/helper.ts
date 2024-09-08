export const formatNumber = (views:string) => {
    const viewCount = parseInt(views, 10);

    if(isNaN(viewCount)) {
        return '';
    }

    if(viewCount >= 1e7) {
        return (viewCount/1e7).toFixed(1) + ' crore';
    } else if (viewCount >= 1e5) {
        return (viewCount/1e5).toFixed(1) + ' lakh';
    } else if (viewCount >= 1e3) {
        return (viewCount/1e3).toFixed(1) + 'k';
    }
}

export const formatDate = (date: string) : string => {
    const givenDate = new Date(date);
    const now = new Date();
    const diffInMs = now.getTime() - givenDate.getTime();

    const msInMinute = 60 * 1000;
    const msInHour = msInMinute * 60;
    const msInDay = msInHour * 24;
    const msInMonth = msInDay * 30;
    const msInYear = msInDay * 365;

    const yearsAgo = Math.floor(diffInMs / msInYear);
    const monthsAgo = Math.floor(diffInMs / msInMonth);
    const daysAgo = Math.floor(diffInMs / msInDay);
    const hoursAgo = Math.floor(diffInMs / msInHour);
    const minutesAgo = Math.floor(diffInMs / msInMinute);

    if (yearsAgo > 0) {
        return `${yearsAgo} year${yearsAgo > 1 ? 's' : ''} ago`;
    } else if (monthsAgo > 0) {
        return `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`;
    } else if (daysAgo > 0) {
        return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
    } else if (hoursAgo > 0) {
        return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
    } else {
        return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
    }
}