function openPopup(id) {
  document.getElementById(id).classList.add('active');
}

function closePopup(id) {
  document.getElementById(id).classList.remove('active');
}

document.addEventListener('DOMContentLoaded', () => {
  const stack = document.querySelector('.stack');
  const imgs = Array.from(stack.querySelectorAll('img'));

  imgs.forEach(img => stack.removeChild(img));
  imgs.reverse();
  imgs.forEach(img => stack.appendChild(img));
  imgs.forEach(img => {
    const clone = img.cloneNode(true);
    stack.appendChild(clone);
  });

  const imgHeight = 320;
  const gap = 16;
  const totalImages = imgs.length;
  const totalHeight = (imgHeight + gap) * totalImages;

  let position = totalHeight - (imgHeight + gap);
  const speed = 0.15;

  function animate() {
    position += speed;
    if (position >= totalHeight) position = 0;
    stack.style.transform = `translateY(-${position}px)`;
    requestAnimationFrame(animate);
  }
  animate();

  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.tagName.toLowerCase() === 'button') return;
      const popupId = card.getAttribute('onclick').match(/openPopup\('(.+?)'\)/)[1];
      openPopup(popupId);
    });
  });

  const openButtons = document.querySelectorAll('.project-card button');
  openButtons.forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const popupId = btn.getAttribute('onclick').match(/openPopup\('(.+?)'\)/)[1];
      openPopup(popupId);
    });
  });

  const closeButtons = document.querySelectorAll('.popup button');
  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const popup = btn.closest('.popup');
      if (popup) popup.classList.remove('active');
    });
  });
});

