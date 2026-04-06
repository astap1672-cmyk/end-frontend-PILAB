let zoom = 1;
let rotation = 0;
let currentPage = 0;
const pages = [{ image: "", rotation: 0 }]; // Массив объектов для хранения состояния каждой страницы

const workspace = document.getElementById("workspace");
const zoomValue = document.getElementById("zoomValue");
const fileInput = document.getElementById("fileInput");
const image = document.getElementById("image");
const uploadBtn = document.getElementById("uploadBtn");
const rotateValue = document.getElementById("rotateValue");
const pageDisplay = document.querySelector(".rotate-control:last-child .rotate-text");

function updateZoom() {
    workspace.style.transform = `scale(${zoom}) rotate(${rotation}deg)`;
    zoomValue.textContent = Math.round(zoom * 100) + "%";
}

function updateRotation() {
    workspace.style.transform = `scale(${zoom}) rotate(${rotation}deg)`;
    rotateValue.textContent = rotation + "°";
    pages[currentPage].rotation = rotation;
}

function updatePageDisplay() {
    const totalPages = pages.length;
    pageDisplay.textContent = `Page: ${currentPage + 1}/${totalPages}`;
}

function updateWorkspaceBackground() {
    if (pages[currentPage].image) {
        workspace.classList.remove("empty");
    } else {
        workspace.classList.add("empty");
    }
}

function loadPage(pageIndex) {
    if (pageIndex >= 0 && pageIndex < pages.length) {
        currentPage = pageIndex;
        const pageData = pages[currentPage];
        image.src = pageData.image;
        rotation = pageData.rotation;
        updateRotation();
        updateWorkspaceBackground();
        updatePageDisplay();
    }
}

document.getElementById("zoomIn").addEventListener("click", () => {
    zoom += 0.1;
    updateZoom();
});

document.getElementById("zoomOut").addEventListener("click", () => {
    if (zoom > 0.2) {
        zoom -= 0.1;
        updateZoom();
    }
});

document.getElementById("rotateLeft").addEventListener("click", () => {
    rotation = (rotation - 90 + 360) % 360;
    updateRotation();
});

document.getElementById("rotateRight").addEventListener("click", () => {
    rotation = (rotation + 90) % 360;
    updateRotation();
});

document.getElementById("left").addEventListener("click", () => {
    loadPage(currentPage - 1);
});

document.getElementById("right").addEventListener("click", () => {
    loadPage(currentPage + 1);
});

document.getElementById("plus").addEventListener("click", () => {
    pages.push({ image: "", rotation: 0 });
    loadPage(pages.length - 1);
});

fileInput.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const result = e.target.result;
        pages[currentPage].image = result;
        image.src = result;
        updateWorkspaceBackground();
    };
    reader.readAsDataURL(file);
});

function dataURLtoBlob(dataURL) {
    const [header, base64] = dataURL.split(",");
    const mime = header.match(/:(.*?);/)[1];
    const binary = atob(base64);
    const array = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        array[i] = binary.charCodeAt(i);
    }
    return new Blob([array], { type: mime });
}

function downloadBlob(blob, filename) {
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

document.getElementById("saveBtn").addEventListener("click", async () => {
    for (const [index, page] of pages.entries()) {
        if (!page.image) continue;
        const blob = dataURLtoBlob(page.image);
        downloadBlob(blob, `page_${index + 1}.png`);
        await new Promise(resolve => setTimeout(resolve, 200));
    }
});

updateWorkspaceBackground();
updatePageDisplay();


