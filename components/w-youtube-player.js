/*
 video-id for the video
 height for iframe height
 width for iframe width
 autoplay for autoplaying the video
 color for the loading
 */
Slim.tag('w-youtube-player', class extends Slim {

    get template() {
        return `<div class="slim-youtube-container">
                    <div id="ytplayer"></div>
                </div>`;
    }

    onBeforeCreated() {
        var autoplay = this.getAttribute('autoplay');
        this.youtubeVideoId = this.getAttribute('video-id');

        this.playerHeight = this.getAttribute('height');
        this.playerWidth = this.getAttribute('width');
        this.initializeIframeApi();
    }


    initializeIframeApi() {
        // Load the IFrame Player API code asynchronously.
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/player_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        //Insert the script once
        if (!window.YT) {
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
        // Replace the 'ytplayer' element with an <iframe> and
        // YouTube player after the API code downloads.
        var player;

        window.onYouTubePlayerAPIReady = () => {
            player = new YT.Player('ytplayer', {
                height: this.playerHeight,
                width: this.playerWidth,
                videoId: this.youtubeVideoId,
                playerVars: {
                    color: this.color || "red",
                    autoplay: !!this.autoplay || false,
                    start: this.start || 0
                }
            });
        }
    }

});