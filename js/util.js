/**
 * Strips formatting or wraps text strings cleanly
 */
export function localize(text) {
    return text ? text.toString() : '';
}

/**
 * Extracts YouTube video ID
 */
export function getYoutubeIdFromUrl(url) {
    if (!url) return null;

    const regex =
        /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([^"&?\/\s]{11})/;

    const match = url.match(regex);

    return match ? match[1] : null;
}

/**
 * Extracts TikTok video ID
 */
export function getTikTokIdFromUrl(url) {
    if (!url) return null;

    const regex = /video\/(\d+)/;

    const match = url.match(regex);

    return match ? match[1] : null;
}

/**
 * Detects platform
 */
export function getPlatform(url) {
    if (!url) return 'unknown';

    if (getYoutubeIdFromUrl(url)) {
        return 'youtube';
    }

    if (getTikTokIdFromUrl(url)) {
        return 'tiktok';
    }

    return 'unknown';
}

/**
 * Randomly shuffles an array in place
 */
export function shuffle(array) {
    let currentIndex = array.length;

    while (currentIndex !== 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);

        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex]
        ];
    }

    return array;
}

/**
 * YouTube embed link
 */
export function embed(url) {
    const youtubeId = getYoutubeIdFromUrl(url);

    if (youtubeId) {
        return `https://www.youtube.com/embed/${youtubeId}`;
    }

    return url;
}

/**
 * Generates YouTube thumbnail directly from video ID
 */
export function getThumbnailFromId(id) {
    if (!id) return '';

    return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
}

/**
 * YouTube thumbnail only
 */
export function getThumbnail(url) {
    const youtubeId = getYoutubeIdFromUrl(url);

    if (youtubeId) {
        return `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`;
    }

    return '';
}
