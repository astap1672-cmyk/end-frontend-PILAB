document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('works-grid');

    // Создаем 6 пустых белых блоков для раздела работ
    for (let i = 0; i < 6; i++) {
        const box = document.createElement('div');
        box.className = 'work-box';
        grid.appendChild(box);
    }

    // --- Логика Модального окна настроек ---
    const modal = document.querySelector('#settingsModal');
    const openBtn = document.querySelector('.icon-btn5');
    const closeBtn = document.querySelector('#closeSettings');

    // Открыть модалку
    openBtn.addEventListener('click', () => {
        modal.showModal();
    });

    // Закрыть модалку
    closeBtn.addEventListener('click', () => {
        modal.close();
    });

    // Закрытие кликом по фону (размытой области)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.close();
    });
});