/**
 * Formats a score number cleanly to 1 decimal point if needed
 */
export function round(num) {
    if (num === null || num === undefined) return 0;

    return Math.round(num * 10) / 10;
}

/**
 * Calculates pointercrate leaderboard score points
 */
export function score(rank, percent, percentToQualify) {
    if (percent < percentToQualify || rank > 100) {
        return 0;
    }

    const baseScore = 250 - (rank - 1) * 2.3;

    return percent === 100
        ? round(baseScore)
        : round(baseScore * (percent / 100));
}

/**
 * Strips formatting or wraps text strings cleanly
 */
export function localize(text) {
    return text ? text.toString() : '';
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
 * Converts URLs into embeddable links
 */
export function embed(url) {
    if (!url) return null;

    // YouTube
    const youtubeId = getYoutubeIdFromUrl(url);

    if (youtubeId) {
        return `https://www.youtube.com/embed/${youtubeId}`;
    }

    // TikTok
    const tikTokId = getTikTokIdFromUrl(url);

    if (tikTokId) {
        return `https://www.tiktok.com/player/v1/${tikTokId}`;
    }

    // Unknown platform
    return url;
}

/**
 * Generates YouTube thumbnail from full URL
 */
export function getThumbnail(url) {
    if (!url) return '';

    const youtubeId = getYoutubeIdFromUrl(url);

    if (youtubeId) {
        return `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`;
    }

    // TikTok has no simple public thumbnail
    return '';
}

/**
 * Generates YouTube thumbnail directly from video ID
 * (kept for backwards compatibility)
 */
export function getThumbnailFromId(id) {
    if (!id) return '';

    return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
}
