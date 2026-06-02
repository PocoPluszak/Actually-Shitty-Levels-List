export const embed = {
    props: {
        video: {
            type: String,
            required: true,
        },
    },
    template: `
        <div class="embed">
            <iframe 
                :src="embedUrl" 
                frameborder="0" 
                allowfullscreen
                allow="autoplay; encrypted-media">
            </iframe>
        </div>
    `,
    computed: {
        embedUrl() {
            // Check for YouTube links
            if (this.video.includes('youtube.com') || this.video.includes('youtu.be')) {
                let id = '';
                if (this.video.includes('youtu.be/')) {
                    id = this.video.split('youtu.be/')[1].split(/[?#]/)[0];
                } else if (this.video.includes('embed/')) {
                    id = this.video.split('embed/')[1].split(/[?#]/)[0];
                } else {
                    id = this.video.split('v=')[1].split(/[&?#]/)[0];
                }
                return `https://youtube.com{id}`;
            }
            
            // Check for Medal.tv clip links
            if (this.video.includes('medal.tv')) {
                // If it's already an embed link, pass it through
                if (this.video.includes('clip-embed')) {
                    return this.video;
                }
                // Cleans up a standard share link and converts it to Medal's official frame player
                let cleanUrl = this.video.split(/[?#]/)[0];
                return cleanUrl.replace('medal.tv/games/', 'medal.tv/clip-embed/games/');
            }

            // Fallback: If it's another direct link, try loading it straight into the frame
            return this.video;
        },
    },
};
