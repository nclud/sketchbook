jQuery(document).ready(function() {
    if (!isMobile) {
        // SET VIDEO BACKGROUND ON DESKTOP
        $('#rosetta_header').wallpaper({
            id: 'rosetta_video',
            source: {
                mp4: '/img/pages/rosetta/video/rosetta-header.mp4',
                webm: '/img/pages/rosetta/video/rosetta-header.webm'
            }
        });
    }
});
