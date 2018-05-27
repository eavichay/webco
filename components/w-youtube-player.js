/*
 video-id for the video
 height for iframe height
 width for iframe width
 autoplay for autoplaying the video
 color for the loading
 */
Slim.tag('w-youtube-player', class extends Slim {

    get template() {
        return `
            <div>
                <iframe s:id="iframe"
                    bind:src="getURL(youtubeVideoId)" 
                    width="100%" height="100%"
                    frameborder="0"></iframe>
            </div>
            <style bind>
                div {
                    width: {{playerWidth}};
                    height: {{playerHeight}};
                }
            </style>
            `;
    }

    get useShadow() {
        return true;
    }

    connectedCallback() {
        this.autoplay = this.hasAttribute('autoplay');
        this.playerHeight = this.getAttribute('height');
        this.playerWidth = this.getAttribute('width');
        this.youtubeVideoId = this.getAttribute('video-id');
    }

    disconnectedCallback() {
        this.iframe.src = null;
    }

    getURL(videoID) {
        const autoplay = this.autoplay ? '1' : '0';
        return `https://www.youtube.com/embed/${videoID}?autoplay=1`;
    }

});