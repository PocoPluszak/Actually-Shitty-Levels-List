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
        // Extract the raw link text, strip parameters, and swap to embed paths
        let cleanUrl = url.split(/[?#]/)[0];
        if (cleanUrl.includes('/games/')) {
            return cleanUrl.replace('medal.tv/games/', 'medal.tv/clip-embed/games/');
        }
        return cleanUrl;
    }

    // 2. Standard YouTube fallback parsing
    let id = url;
    if (url.includes('youtu.be/')) {
        id = url.split('youtu.be/')[1].split(/[?#]/)[0];
    } else if (url.includes('://youtube.com')) {
        id = url.split('://youtube.com')[1].split(/[?#]/)[0];
    } else if (url.includes('v=')) {
        id = url.split('v=')[1].split(/[&?#]/)[0];
    }
    
    // Return just the unique video code string so the component creates the YouTube URL
    return id;
}
