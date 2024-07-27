document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('.video');
    const firstSectionVideo = document.querySelector('#section1 .video');
    const firstSectionImage = document.querySelector('#section1 .placeholder-image');

    const playVideo = (video) => {
        video.play();
    };

    const pauseVideo = (video) => {
        video.pause();
        video.currentTime = 0; // Reset the video to start
    };

    const checkVideoVisibility = () => {
        videos.forEach(video => {
            const rect = video.getBoundingClientRect();
            const inView = (
                rect.top >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
            );

            if (inView) {
                playVideo(video);
            } else {
                pauseVideo(video);
            }
        });
    };

    videos.forEach(video => {
        video.addEventListener('mouseenter', () => {
            playVideo(video);
            video.removeEventListener('mouseenter', playVideo); // Remove event listener after first hover
            video.addEventListener('ended', () => pauseVideo(video)); // Stop the video when it ends
        });
    });

    firstSectionImage.addEventListener('mouseenter', () => {
        firstSectionImage.style.display = 'none';
        playVideo(firstSectionVideo);
    });

    window.addEventListener('scroll', checkVideoVisibility);
    window.addEventListener('resize', checkVideoVisibility);
    checkVideoVisibility(); // Initial check
});