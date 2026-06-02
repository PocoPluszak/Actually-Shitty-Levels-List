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
    return percent === 100 ? round(baseScore) : round(baseScore * (percent / 100));
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
    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

/**
 * Extracts a unique YouTube video ID
 */
export function getYoutubeIdFromUrl(url) {
    if (!url) return null;
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

/**
 * Multi-platform embed link cleaner.
 */
export function embed(url) {
    if (!url) return null;

    if (url.includes('medal.tv')) {
        const cleanUrl = url.split(/[?#]/)[0];
        const parts = cleanUrl.split('/');
        const clipId = parts[parts.length - 1];
        return `https://medal.tv/clip-embed/clips/${clipId}?autoplay=0&muted=1&loop=1`;
    }

    const youtubeId = getYoutubeIdFromUrl(url);
    if (youtubeId) {
        return `https://www.youtube.com/embed/${youtubeId}`;
    }

    return url;
}

/**
 * Generates a high-quality YouTube video thumbnail URL.
 */
export function getThumbnailFromId(id) {
    if (!id) return '';
    if (id.includes('medal.tv')) {
        return '/assets/medal-placeholder.png'; 
    }
    return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
}
