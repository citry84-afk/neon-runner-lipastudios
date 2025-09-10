// NEON RUNNER - FIXES QUE FUNCIONAN v2.2
// Solo las optimizaciones que no rompen el juego

// ========================================
// 1. SHARING VIRAL SIMPLE
// ========================================

function shareNative() {
    const distance = gameState.distance || 0;
    const coins = gameState.coins || 0;
    
    // Capturar momento épico
    captureEpicMoment();
    
    // Mostrar modal de sharing
    showShareModal(distance, coins);
}

function captureEpicMoment() {
    // Crear canvas temporal para captura
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 600;
    
    // Fondo degradado épico
    const gradient = ctx.createLinearGradient(0, 0, 0, 600);
    gradient.addColorStop(0, '#FF0080');
    gradient.addColorStop(0.5, '#00FFFF');
    gradient.addColorStop(1, '#8000FF');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 600);
    
    // Texto épico
    ctx.fillStyle = 'white';
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('NEON RUNNER', 200, 100);
    
    ctx.font = 'bold 48px Arial';
    ctx.fillText(`${Math.floor(gameState.distance || 0)}m`, 200, 200);
    
    ctx.font = 'bold 24px Arial';
    ctx.fillText(`${gameState.coins || 0} MONEDAS`, 200, 250);
    
    ctx.font = 'bold 20px Arial';
    ctx.fillText('¿Puedes superarme?', 200, 300);
    
    // Convertir a imagen
    const dataURL = canvas.toDataURL('image/png');
    
    // Descargar automáticamente
    const link = document.createElement('a');
    link.download = `neon-runner-epic-${Date.now()}.png`;
    link.href = dataURL;
    link.click();
}

function showShareModal(distance, coins) {
    const modal = document.createElement('div');
    modal.className = 'share-modal';
    modal.innerHTML = `
        <div class="share-content">
            <h3>🎉 ¡MOMENTO ÉPICO CAPTURADO!</h3>
            <div class="score-display">
                <div class="score-number">${Math.floor(distance)}m</div>
                <div class="score-label">DISTANCIA</div>
                <div class="coins-badge">${coins} MONEDAS</div>
            </div>
            <p>¡Comparte tu carrera y desafía a tus amigos!</p>
            <div class="share-buttons">
                <button onclick="shareToTwitter(${distance}, ${coins})" class="share-btn twitter">🐦 Twitter</button>
                <button onclick="shareToFacebook(${distance}, ${coins})" class="share-btn facebook">📘 Facebook</button>
                <button onclick="shareToWhatsApp(${distance}, ${coins})" class="share-btn whatsapp">💬 WhatsApp</button>
                <button onclick="shareToInstagram(${distance}, ${coins})" class="share-btn instagram">📷 Instagram</button>
            </div>
            <button onclick="closeShareModal()" class="close-btn">✕</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 100);
}

function shareToTwitter(distance, coins) {
    const text = `🏃‍♂️ ¡Acabo de correr ${Math.floor(distance)}m y recogí ${coins} monedas en Neon Runner! #NeonRunner #EndlessRunner #Gaming`;
    const url = window.location.href;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank');
    closeShareModal();
}

function shareToFacebook(distance, coins) {
    const text = `🏃‍♂️ ¡Mira mi carrera de ${Math.floor(distance)}m en Neon Runner!`;
    const url = window.location.href;
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank');
    closeShareModal();
}

function shareToWhatsApp(distance, coins) {
    const text = `🏃‍♂️ ¡Acabo de correr ${Math.floor(distance)}m en Neon Runner! Juega aquí: ${window.location.href}`;
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank');
    closeShareModal();
}

function shareToInstagram(distance, coins) {
    const modal = document.createElement('div');
    modal.className = 'instagram-modal';
    modal.innerHTML = `
        <div class="instagram-content">
            <h3>📷 Compartir en Instagram</h3>
            <p>1. La imagen épica se ha descargado</p>
            <p>2. Abre Instagram Stories</p>
            <p>3. Sube la imagen</p>
            <p>4. Añade el hashtag #NeonRunner</p>
            <button onclick="closeInstagramModal()" class="btn">✅ Entendido</button>
        </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 100);
}

function closeShareModal() {
    const modal = document.querySelector('.share-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
}

function closeInstagramModal() {
    const modal = document.querySelector('.instagram-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
}

// ========================================
// 2. ESTILOS CSS SIMPLES
// ========================================

const workingStyles = `
<style>
/* Modales de sharing */
.share-modal, .instagram-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s;
}

.share-modal.show, .instagram-modal.show {
    opacity: 1;
}

.share-content, .instagram-content {
    background: linear-gradient(135deg, #FF0080, #00FFFF);
    padding: 2rem;
    border-radius: 20px;
    text-align: center;
    color: white;
    max-width: 500px;
    width: 90%;
    position: relative;
}

.score-display {
    background: rgba(0,0,0,0.3);
    padding: 2rem;
    border-radius: 20px;
    margin: 1.5rem 0;
    border: 3px solid white;
}

.score-number {
    font-size: 4rem;
    font-weight: bold;
    color: #00FFFF;
    text-shadow: 0 0 20px #00FFFF;
}

.score-label {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0.5rem 0;
}

.coins-badge {
    background: linear-gradient(45deg, #FF0080, #8000FF);
    padding: 0.5rem 1rem;
    border-radius: 25px;
    font-weight: bold;
    display: inline-block;
    margin-top: 1rem;
}

.share-buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin: 2rem 0;
}

.share-btn {
    padding: 1.2rem;
    border: none;
    border-radius: 20px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 1.1rem;
    color: white;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.share-btn:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0,0,0,0.4);
}

.share-btn.twitter { background: #1da1f2; }
.share-btn.facebook { background: #4267b2; }
.share-btn.whatsapp { background: #25d366; }
.share-btn.instagram { background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); }

.close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    opacity: 0.7;
}

.close-btn:hover {
    opacity: 1;
}
</style>
`;

// Inyectar estilos que funcionan
document.head.insertAdjacentHTML('beforeend', workingStyles);
