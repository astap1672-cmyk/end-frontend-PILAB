const grid = document.getElementById('masonry-grid');
const scrollContainer1 = document.getElementById('scroll-container');
const modal = document.querySelector('#settingsModal');
const openBtn = document.querySelector('.icon-btn5');
const closeBtn = document.querySelector('#closeSettings');
const modal1 = document.querySelector('#settingsModal1');
const openBtn2 = document.querySelector('.icon-btn2');
const closeBtn1 = document.querySelector('#closeSettings1');
const acceptBtn = document.querySelector('.accept-btn');


// Проверка режима для разных алгоритмов подбора картинок
const urlParams = new URLSearchParams(window.location.search);
const mode = urlParams.get('mode');

function createItems(count) {
    for (let i = 0; i < count; i++) {
        const item = document.createElement('div');
        item.className = 'item';
        if (mode === 'livepi') {
            // Здесь можно добавить логику для подбора картинок в режиме LivePI
            // Например, загрузка изображений из API или другой алгоритм
            const randomHeight = Math.floor(Math.random() * 200) + 200; // Другой диапазон высот
            item.style.height = `${randomHeight}px`;
            item.innerText = `LivePI Контент ${randomHeight}px`;
        } else {
            // Стандартный алгоритм
            const randomHeight = Math.floor(Math.random() * 300) + 150;
            item.style.height = `${randomHeight}px`;
            item.innerText = `Контент ${randomHeight}px`;
        }
        grid.appendChild(item);
    }
}

createItems(20);

// Бесконечный скролл
scrollContainer1.addEventListener('scroll', () => {
    if (scrollContainer1.scrollTop + scrollContainer1.clientHeight >= scrollContainer1.scrollHeight - 50) {
        createItems(10);
    }
});

// Настройки
openBtn.addEventListener('click', () => { modal.showModal(); });
closeBtn.addEventListener('click', () => { modal.close(); });
modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.close();
});

// Feedback
openBtn2.addEventListener('click', (e) => { e.preventDefault(); modal1.showModal(); });
closeBtn1.addEventListener('click', () => { modal1.close(); });
acceptBtn.addEventListener('click', () => { modal1.close(); });
modal1.addEventListener('click', (e) => {
    if (e.target === modal1) modal1.close();
});