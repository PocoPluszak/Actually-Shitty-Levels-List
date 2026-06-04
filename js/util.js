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
 * Detects platform (YouTube only now)
 */
export function getPlatform(url) {
    if (!url) return 'unknown';

    return getYoutubeIdFromUrl(url) ? 'youtube' : 'unknown';
}

/**
 * Random shuffle
 */
export function shuffle(array) {
    let currentIndex = array.length;

    while (currentIndex !== 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] =
            [array[randomIndex], array[currentIndex]];
    }

    return array;
}

/**
 * YouTube embed link
 */
export function embed(url) {
    const id = getYoutubeIdFromUrl(url);
    return id ? `https://www.youtube.com/embed/${id}` : url;
}

/**
 * YouTube thumbnail
 */
export function getThumbnail(url) {
    const id = getYoutubeIdFromUrl(url);
    return id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : '';
}

/**
 * Thumbnail from ID
 */
export function getThumbnailFromId(id) {
    return id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : '';
}
