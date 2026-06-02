export function embed(url) {
    if (!url) return null;

    if (url.includes('medal.tv')) {
        // 1. Remove all query parameters and fragments
        const cleanUrl = url.split(/[?#]/)[0];
        // 2. Extract the Clip ID (the last part of the path)
        const parts = cleanUrl.split('/');
        const clipId = parts[parts.length - 1];
        
        // 3. Construct the clean global embed URL (no language prefix like /pl/)
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
    // Fixed: uses ${id} instead of {id}
    return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
}
