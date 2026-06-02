export default {
    props: {
        video: {
            type: String,
            required: true,
        },
    },
    template: `
        <div class="embed">
            <iframe :src="embedUrl" frameborder="0" allowfullscreen></iframe>
        </div>
    `,
    computed: {
        embedUrl() {
            return `https://youtube.com{this.video}`;
        },
    },
};
