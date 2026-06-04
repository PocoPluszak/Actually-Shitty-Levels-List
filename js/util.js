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

    const regex =
        /(?:https?:\/\/)?(?:www\.)?tiktok\.com\/@[^\/]+\/video\/(\d+)/;

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
 * YouTube thumbnail only
 */
export function getThumbnail(url) {
    const youtubeId = getYoutubeIdFromUrl(url);

    if (youtubeId) {
        return `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`;
    }

    return '';
}
