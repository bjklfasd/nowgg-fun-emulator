const modal = document.getElementById('video-modal');
    const video = document.getElementById('modal-video');
    const closeBtn = document.getElementById('close-video');

    const buttons = document.querySelectorAll('.game-btn');

    function openVideo(src) {
      video.src = src;
      video.load();
      modal.classList.add('active');
      video.play().catch(e => console.warn('autoplay blocked', e));
    }

    function closeVideo() {
      modal.classList.remove('active');
      video.pause();
      video.src = '';
    }

    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const src = btn.getAttribute('data-video');
        if (src) openVideo(src);
        else alert('no video URL set for this button');
      });
    });

    closeBtn.addEventListener('click', closeVideo);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeVideo();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) closeVideo();
    });
