// NEON RUNNER - FIXES SIMPLES v2.1
// Solo las optimizaciones que funcionan

// ========================================
// 1. MONETIZACIÓN BÁSICA
// ========================================

// Reward ads cuando te matan
function showRewardAdOnDeath() {
    const modal = document.createElement('div');
    modal.className = 'reward-ad-death-modal';
    modal.innerHTML = `
        <div class="reward-ad-death-content">
            <h3>💀 ¡Has caído!</h3>
            <p>Mira un anuncio para revivir y continuar tu carrera</p>
            <div class="ad-simulation">
                <div class="ad-video">
                    <div class="ad-progress"></div>
                    <p>Anuncio en reproducción...</p>
                </div>
            </div>
            <button onclick="reviveWithAd()" class="btn revive-btn">🎬 REVIVIR GRATIS</button>
            <button onclick="restartGame()" class="btn secondary">🔄 REINICIAR</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 100);
    
    // Simular progreso del anuncio
    const progressBar = modal.querySelector('.ad-progress');
    let progress = 0;
    const interval = setInterval(() => {
        progress += 2;
        progressBar.style.width = progress + '%';
        if (progress >= 100) {
            clearInterval(interval);
            modal.querySelector('.revive-btn').disabled = false;
        }
    }, 100);
}

function reviveWithAd() {
    // Revivir el juego
    gameState.gameActive = true;
    gameState.distance = Math.max(0, gameState.distance - 50); // Penalización pequeña
    
    // Cerrar modal
    const modal = document.querySelector('.reward-ad-death-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
    
    // Continuar el juego
    startGameLoop();
}

function restartGame() {
    // Cerrar modal
    const modal = document.querySelector('.reward-ad-death-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
    
    // Reiniciar juego
    gameState.distance = 0;
    gameState.coins = 0;
    gameState.gameActive = false;
    startGame();
}

// Interstitial ads estratégicos
function showInterstitialAd() {
    const lastAdTime = parseInt(localStorage.getItem('lastInterstitialAd') || '0');
    const currentTime = Date.now();
    const adInterval = 3 * 60 * 1000; // 3 minutos
    
    if (currentTime - lastAdTime > adInterval) {
        const modal = document.createElement('div');
        modal.className = 'interstitial-ad-modal';
        modal.innerHTML = `
            <div class="interstitial-ad-content">
                <h3>📺 Anuncio</h3>
                <div class="ad-banner">
                    <p>Anuncio de 30 segundos</p>
                    <div class="ad-timer">30</div>
                </div>
                <button onclick="closeInterstitialAd()" class="btn">Continuar</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('show'), 100);
        
        // Timer del anuncio
        let timeLeft = 30;
        const timer = setInterval(() => {
            timeLeft--;
            modal.querySelector('.ad-timer').textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                modal.querySelector('button').disabled = false;
            }
        }, 1000);
        
        localStorage.setItem('lastInterstitialAd', currentTime.toString());
    }
}

function closeInterstitialAd() {
    const modal = document.querySelector('.interstitial-ad-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
}

// ========================================
// 2. SHARING VIRAL SIMPLE
// ========================================

function shareScoreFixed() {
    const distance = gameState.distance || 0;
    const coins = gameState.coins || 0;
    
    // Capturar momento épico
    captureEpicMoment();
    
    // Mostrar modal de sharing
    showShareModal(distance, coins);
}

function captureEpicMoment() {
    const canvas = document.getElementById('gameCanvas');
    if (!canvas) return;
    
    const dataURL = canvas.toDataURL('image/png');
    
    // Crear elemento temporal para descarga
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
            <h3>🎉 ¡Momento Épico Capturado!</h3>
            <p>¡Comparte tu carrera de ${Math.floor(distance)}m y ${coins} monedas!</p>
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
// 3. ESTILOS CSS SIMPLES
// ========================================

const simpleStyles = `
<style>
/* Modales de sharing */
.share-modal, .instagram-modal, .reward-ad-death-modal, .interstitial-ad-modal {
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

.share-modal.show, .instagram-modal.show, .reward-ad-death-modal.show, .interstitial-ad-modal.show {
    opacity: 1;
}

.share-content, .instagram-content, .reward-ad-death-content, .interstitial-ad-content {
    background: linear-gradient(135deg, #FF0080, #00FFFF);
    padding: 2rem;
    border-radius: 20px;
    text-align: center;
    color: white;
    max-width: 500px;
    width: 90%;
    position: relative;
}

.share-buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin: 1.5rem 0;
}

.share-btn {
    padding: 1rem;
    border: none;
    border-radius: 15px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 1.1rem;
}

.share-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.share-btn.twitter { background: #1da1f2; color: white; }
.share-btn.facebook { background: #4267b2; color: white; }
.share-btn.whatsapp { background: #25d366; color: white; }
.share-btn.instagram { background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); color: white; }

/* Anuncios simulados */
.ad-simulation {
    background: #000;
    border-radius: 15px;
    padding: 1.5rem;
    margin: 1.5rem 0;
}

.ad-progress {
    height: 6px;
    background: #333;
    border-radius: 3px;
    margin-bottom: 1rem;
    overflow: hidden;
}

.ad-progress::after {
    content: '';
    display: block;
    height: 100%;
    background: linear-gradient(90deg, #FF0080, #00FFFF);
    width: 0%;
    transition: width 0.1s;
}

.ad-banner {
    background: #000;
    color: white;
    padding: 2rem;
    border-radius: 15px;
    text-align: center;
    margin: 1.5rem 0;
}

.ad-timer {
    font-size: 2.5rem;
    font-weight: bold;
    color: #00FFFF;
    margin: 1rem 0;
}

.revive-btn {
    background: linear-gradient(135deg, #ff6b6b, #ee5a24);
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 10px;
    font-weight: bold;
    cursor: pointer;
    font-size: 1.2rem;
    margin: 0.5rem;
}

.revive-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);
}

.close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
}
</style>
`;

// Inyectar estilos simples
document.head.insertAdjacentHTML('beforeend', simpleStyles);
