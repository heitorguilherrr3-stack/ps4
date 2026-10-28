(() => {
  const picker = document.getElementById('videoPicker');
  const tile = document.getElementById('openVideoTile');
  const player = document.getElementById('videoPlayer');
  const video = document.getElementById('gameplayVideo');
  const close = document.getElementById('closeVideo');
  const choose = document.getElementById('pickAnother');
  const toggle = document.getElementById('toggleControls');
  const controls = document.getElementById('virtualController');
  const name = document.getElementById('videoName');
  let objectUrl = null;

  function pickVideo() { picker.click(); }
  tile.addEventListener('click', e => { e.preventDefault(); pickVideo(); });
  tile.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pickVideo(); } });
  choose.addEventListener('click', pickVideo);
  picker.addEventListener('change', () => {
    const file = picker.files && picker.files[0];
    if (!file) return;
    if (!file.type.startsWith('video/')) { alert('Escolha um arquivo de vídeo, como MP4.'); picker.value = ''; return; }
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    objectUrl = URL.createObjectURL(file);
    video.src = objectUrl;
    name.textContent = file.name;
    player.classList.add('open');
    player.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const p = video.play();
    if (p && p.catch) p.catch(() => {});
  });
  function closePlayer() {
    video.pause();
    player.classList.remove('open');
    player.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  close.addEventListener('click', closePlayer);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && player.classList.contains('open')) closePlayer(); });
  toggle.addEventListener('click', () => {
    controls.classList.toggle('hidden');
    toggle.textContent = controls.classList.contains('hidden') ? 'Mostrar controles' : 'Ocultar controles';
  });
  // Touch feedback only: this is a video viewer, so the overlay does not control a real game.
  controls.querySelectorAll('button').forEach(button => {
    button.addEventListener('pointerdown', () => { button.style.background = 'rgba(48,125,255,.8)'; });
    ['pointerup','pointercancel','pointerleave'].forEach(evt => button.addEventListener(evt, () => { button.style.background = ''; }));
  });
  window.addEventListener('beforeunload', () => { if (objectUrl) URL.revokeObjectURL(objectUrl); });
})();
