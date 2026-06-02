/**
 * Formats a score number cleanly to 1 decimal point if needed
 */
export function round(num) {
    if (num === null || num === undefined) return 0;
    return Math.round(num * 10) / 10;
}

/**
 * Calculates pointercrate leaderboard score points based on level position and percentage achieved
 */
export function score(rank, percent, percentToQualify) {
    if (percent < percentToQualify || rank > 100) {
        return 0;
    }
    if (percent === 100) {
        return round(250 - (rank - 1) * 2.3);
    }
    return round((250 - (rank - 1) * 2.3) * (percent / 100));
}

/**
 * Strips formatting or wraps text strings cleanly for language localization configs
 */
export function localize(text) {
    if (!text) return '';
    return text.toString();
}

/**
 * Extracts a unique YouTube video ID from various YouTube URL formats.
 * Added compatibility fallback for Medal links to prevent crashes.
 */
export function getYoutubeIdFromUrl(url) {
    if (!url) return null;

    // Handle Medal links if they slip into Roulette
    if (url.includes('medal.tv')) {
        return url;
    }

    let id = url;
    if (url.includes('youtu.be/')) {
        id = url.split('youtu.be/')[1].split(/[?#]/)[0];
    } else if (url.includes('://youtube.com')) {
        id = url.split('://youtube.com')[1].split(/[?#]/)[0];
    } else if (url.includes('v=')) {
        id = url.split('v=')[1].split(/[&?#]/)[0];
    }
    return id;
}

/**
 * Multi-platform embed link cleaner. Handles traditional YouTube URLs and formats
 * raw Medal.tv clip URLs into fully compatible iframe elements.
 */
export function embed(url) {
    if (!url) return null;

    // 1. Support Medal.tv clip links
    if (url.includes('medal.tv')) {
        if (url.includes('clip-embed')) {
            return url;
        }
        let cleanUrl = url.split(/[?#]/)[0];
        if (cleanUrl.includes('/games/')) {
            return cleanUrl.replace('medal.tv/games/', 'medal.tv/clip-embed/games/');
        }
        return cleanUrl;
    }

    // 2. Standard YouTube parsing using our helper above
    return getYoutubeIdFromUrl(url);
}

/**
 * Generates a high-quality YouTube video thumbnail URL from its unique video ID string.
 */
export function getThumbnailFromId(id) {
    if (!id) return '';
    // If it's a Medal link, return a default thumbnail placeholder
    if (id.includes('medal.tv')) {
        return 'https://githubusercontent.com';
    }
    return `https://youtube.com{id}/mqdefault.jpg`;
}
