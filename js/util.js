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
 * Randomly shuffles an array in place (used for the Roulette game minigame)
 */
export function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

/**
 * Extracts a unique YouTube video ID from various YouTube URL formats.
 * Added compatibility fallback for Medal links to prevent crashes.
 */
export function getYoutubeIdFromUrl(url) {
    if (!url) return null;

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

    // Fix: Clean out tracking queries safely and format Medal link parameters correctly
    if (url.includes('medal.tv')) {
        if (url.includes('clip-embed')) {
            return url;
        }
        let cleanUrlString = url.split(/[?#]/)[0];
        let embedPath = cleanUrlString.replace('medal.tv/games/', 'medal.tv/clip-embed/games/');
        return `${embedPath}?autoplay=0&muted=1&loop=1`;
    }

    return getYoutubeIdFromUrl(url);
}

/**
 * Generates a high-quality YouTube video thumbnail URL from its unique video ID string.
 */
export function getThumbnailFromId(id) {
    if (!id) return '';
    if (id.includes('medal.tv')) {
        return 'https://githubusercontent.com';
    }
    return `https://youtube.com{id}/mqdefault.jpg`;
}
