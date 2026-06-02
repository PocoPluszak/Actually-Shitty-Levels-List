export function embed(url) {
    if (!url) return null;

    // 1. Support Medal.tv clip links
    if (url.includes('medal.tv')) {
        if (url.includes('clip-embed')) return url;
        let cleanUrl = url.split(/[?#]/)[0];
        return cleanUrl.replace('medal.tv/games/', 'medal.tv/clip-embed/games/');
    }

    // 2. Original YouTube support logic
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
