const modal = document.querySelector('#settingsModal');
const openBtn = document.querySelector('.icon-btn5');
const closeBtn = document.querySelector('#closeSettings');

openBtn.addEventListener('click', () => { modal.showModal(); });
closeBtn.addEventListener('click', () => { modal.close(); });
modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.close();
});