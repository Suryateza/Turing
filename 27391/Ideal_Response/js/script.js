document.addEventListener("DOMContentLoaded", function() {
    let navbar = document.querySelector('.header .navbar');
    let menuBtn = document.querySelector('#menu-btn');
    
    if (menuBtn) {
        menuBtn.onclick = () => {
            navbar.classList.toggle('active');
        }
    }

    window.onscroll = () => {
        if (navbar) {
            navbar.classList.remove('active');
        }
    }

    let mainVid = document.querySelector('.main-video');
    let courseVids = document.querySelectorAll('.course-3 .box .video video');
    let closeVidBtn = document.querySelector('#close-vid');

    if (courseVids.length > 0 && mainVid) {
        courseVids.forEach(vid => {
            vid.onclick = () => {
                let src = vid.getAttribute('src');
                mainVid.classList.add('active');
                mainVid.querySelector('video').src = src;
            }
        });
    }

    if (closeVidBtn && mainVid) {
        closeVidBtn.onclick = () => {
            mainVid.classList.remove('active');
            mainVid.querySelector('video').src = '';
        };
    }

    // Additional script for checking thumbnails (if applicable to course page)
    const videoThumbnails = document.querySelectorAll('.box .video i');
    const mainVideo = document.querySelector('.main-video video');
    
    if (videoThumbnails.length > 0 && mainVideo) {
        videoThumbnails.forEach((thumbnail, index) => {
            thumbnail.onclick = function() {
                const videoSrc = document.querySelectorAll('.box video')[index].getAttribute('src');
                mainVideo.setAttribute('src', videoSrc);
                mainVideo.parentElement.style.display = 'block';
            };
        });
    }

    if (closeVidBtn && mainVideo) {
        closeVidBtn.onclick = function() {
            mainVideo.setAttribute('src', '');
            mainVideo.parentElement.style.display = 'none';
        };
    }
});
