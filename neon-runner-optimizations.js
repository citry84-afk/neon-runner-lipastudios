// NEON RUNNER - OPTIMIZACIONES VIRAL + RETENCIÓN + MONETIZACIÓN
// v2.0 - Social Media Revenue Optimization

// ========================================
// 1. VIRAL FEATURES PARA SOCIAL MEDIA
// ========================================

// Captura automática de momentos épicos para TikTok/Instagram
function captureEpicMoment() {
    const canvas = document.getElementById('gameCanvas');
    if (!canvas) return;
    
    const dataURL = canvas.toDataURL('image/png');
    
    // Crear elemento temporal para descarga
    const link = document.createElement('a');
    link.download = `neon-runner-epic-${Date.now()}.png`;
    link.href = dataURL;
    link.click();
    
    // Mostrar prompt de sharing mejorado
    showSocialSharePrompt();
}

// Prompt de sharing específico para cada red social
function showSocialSharePrompt() {
    const modal = document.createElement('div');
    modal.className = 'social-share-modal';
    modal.innerHTML = `
        <div class="social-share-content">
            <h3>🎉 ¡Momento Épico Capturado!</h3>
            <p>¡Comparte tu carrera increíble en redes sociales!</p>
            <div class="social-buttons">
                <button onclick="shareToTikTok()" class="social-btn tiktok">🎵 TikTok</button>
                <button onclick="shareToInstagram()" class="social-btn instagram">📷 Instagram</button>
                <button onclick="shareToYouTube()" class="social-btn youtube">🎥 YouTube</button>
                <button onclick="shareToFacebook()" class="social-btn facebook">📘 Facebook</button>
                <button onclick="shareToTwitter()" class="social-btn twitter">🐦 X (Twitter)</button>
            </div>
            <div class="hashtag-suggestions">
                <h4>Hashtags sugeridos:</h4>
                <div class="hashtags">
                    <span class="hashtag">#NeonRunner</span>
                    <span class="hashtag">#EndlessRunner</span>
                    <span class="hashtag">#CyberpunkGame</span>
                    <span class="hashtag">#Gaming</span>
                    <span class="hashtag">#LIPAStudios</span>
                </div>
            </div>
            <button onclick="closeSocialShareModal()" class="close-btn">✕</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 100);
}

// Sharing específico para TikTok
function shareToTikTok() {
    const distance = gameState.distance || 0;
    const coins = gameState.coins || 0;
    const text = `🚀 ¡Acabo de correr ${distance}m y recogí ${coins} monedas en Neon Runner! #NeonRunner #EndlessRunner #Gaming #TikTokGaming`;
    const url = window.location.href;
    
    // Abrir TikTok con el texto pre-formateado
    const shareUrl = `https://www.tiktok.com/upload?text=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank');
    
    // Tracking
    window.trackEvent('tiktok_share_attempt', {
        distance: distance,
        coins: coins
    });
    
    closeSocialShareModal();
}

// Sharing específico para Instagram
function shareToInstagram() {
    const distance = gameState.distance || 0;
    const coins = gameState.coins || 0;
    
    // Crear imagen optimizada para Instagram Stories
    const canvas = document.getElementById('gameCanvas');
    if (canvas) {
        const dataURL = canvas.toDataURL('image/png');
        
        // Crear imagen con overlay para Instagram
        const img = new Image();
        img.onload = function() {
            const canvas2 = document.createElement('canvas');
            const ctx2 = canvas2.getContext('2d');
            
            // Tamaño optimizado para Instagram Stories (1080x1920)
            canvas2.width = 1080;
            canvas2.height = 1920;
            
            // Dibujar el juego escalado
            ctx2.drawImage(img, 0, 0, 1080, 1920);
            
            // Añadir overlay con estadísticas
            ctx2.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx2.fillRect(0, 0, 1080, 1920);
            
            ctx2.fillStyle = '#00FFFF';
            ctx2.font = 'bold 60px Arial';
            ctx2.textAlign = 'center';
            ctx2.fillText(`🚀 ${distance}m`, 540, 800);
            ctx2.fillText(`💰 ${coins} monedas`, 540, 900);
            ctx2.fillText(`#NeonRunner`, 540, 1000);
            
            // Descargar imagen optimizada
            const link = document.createElement('a');
            link.download = `neon-runner-instagram-${Date.now()}.png`;
            link.href = canvas2.toDataURL('image/png');
            link.click();
        };
        img.src = dataURL;
    }
    
    // Mostrar instrucciones para Instagram
    showInstagramInstructions();
}

function showInstagramInstructions() {
    const modal = document.createElement('div');
    modal.className = 'instagram-instructions-modal';
    modal.innerHTML = `
        <div class="instagram-instructions-content">
            <h3>📷 Compartir en Instagram</h3>
            <div class="steps">
                <div class="step">
                    <span class="step-number">1</span>
                    <p>La imagen optimizada se ha descargado</p>
                </div>
                <div class="step">
                    <span class="step-number">2</span>
                    <p>Abre Instagram Stories</p>
                </div>
                <div class="step">
                    <span class="step-number">3</span>
                    <p>Sube la imagen descargada</p>
                </div>
                <div class="step">
                    <span class="step-number">4</span>
                    <p>Añade los hashtags: #NeonRunner #EndlessRunner #Gaming</p>
                </div>
            </div>
            <button onclick="closeInstagramInstructions()" class="btn">✅ Entendido</button>
        </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 100);
}

// Sharing específico para YouTube
function shareToYouTube() {
    const distance = gameState.distance || 0;
    const coins = gameState.coins || 0;
    const text = `🚀 ¡Increíble carrera de ${distance}m en Neon Runner! Recogí ${coins} monedas. ¿Puedes superar mi récord? #NeonRunner #EndlessRunner #Gaming #YouTubeGaming`;
    const url = window.location.href;
    
    // Abrir YouTube con el texto pre-formateado
    const shareUrl = `https://www.youtube.com/upload?text=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank');
    
    closeSocialShareModal();
}

// Sharing específico para Facebook
function shareToFacebook() {
    const distance = gameState.distance || 0;
    const coins = gameState.coins || 0;
    const text = `🚀 ¡Acabo de correr ${distance}m y recogí ${coins} monedas en Neon Runner! ¿Puedes superar mi récord?`;
    const url = window.location.href;
    
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank');
    
    closeSocialShareModal();
}

// Sharing específico para X (Twitter)
function shareToTwitter() {
    const distance = gameState.distance || 0;
    const coins = gameState.coins || 0;
    const text = `🚀 ¡Acabo de correr ${distance}m y recogí ${coins} monedas en Neon Runner! ¿Puedes superar mi récord? #NeonRunner #EndlessRunner #Gaming #XGaming`;
    const url = window.location.href;
    
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank');
    
    closeSocialShareModal();
}

function closeSocialShareModal() {
    const modal = document.querySelector('.social-share-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
}

function closeInstagramInstructions() {
    const modal = document.querySelector('.instagram-instructions-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
}

// ========================================
// 2. RETENCIÓN & ENGAGEMENT MEJORADO
// ========================================

// Sistema de logros específico para endless runner
const runnerAchievements = {
    firstRun: { unlocked: false, name: "Primera Carrera", reward: 100, description: "Completa tu primera carrera" },
    tenMeters: { unlocked: false, name: "10 Metros", reward: 200, description: "Corre 10 metros" },
    fiftyMeters: { unlocked: false, name: "50 Metros", reward: 500, description: "Corre 50 metros" },
    hundredMeters: { unlocked: false, name: "100 Metros", reward: 1000, description: "Corre 100 metros" },
    firstCoin: { unlocked: false, name: "Primera Moneda", reward: 50, description: "Recoge tu primera moneda" },
    tenCoins: { unlocked: false, name: "10 Monedas", reward: 300, description: "Recoge 10 monedas" },
    perfectRun: { unlocked: false, name: "Carrera Perfecta", reward: 800, description: "Corre 50m sin chocar" },
    speedDemon: { unlocked: false, name: "Demonio de la Velocidad", reward: 600, description: "Mantén velocidad máxima por 10s" }
};

// Sistema de power-ups específico para endless runner
const runnerPowerUps = {
    shield: { name: "Escudo", cost: 200, duration: 10000, description: "Protección contra 1 choque" },
    magnet: { name: "Imán", cost: 150, duration: 15000, description: "Atrae monedas automáticamente" },
    doubleCoins: { name: "Monedas Dobles", cost: 300, duration: 20000, description: "Duplica las monedas recogidas" },
    slowMotion: { name: "Cámara Lenta", cost: 250, duration: 12000, description: "Ralentiza el tiempo" },
    extraLife: { name: "Vida Extra", cost: 500, description: "Te da una segunda oportunidad" }
};

// Monedas del juego
let runnerCoins = parseInt(localStorage.getItem('neonRunnerCoins') || '0');

// Mostrar notificación de logro
function showRunnerAchievement(achievement) {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
        <div class="achievement-content">
            <div class="achievement-icon">🏆</div>
            <div class="achievement-text">
                <h4>¡Logro Desbloqueado!</h4>
                <p>${achievement.name}</p>
                <span class="reward">+${achievement.reward} monedas</span>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
    
    // Añadir monedas
    runnerCoins += achievement.reward;
    localStorage.setItem('neonRunnerCoins', runnerCoins.toString());
    updateRunnerCoinsDisplay();
}

// Verificar logros específicos del runner
function checkRunnerAchievements() {
    const distance = gameState.distance || 0;
    const coins = gameState.coins || 0;
    
    if (distance >= 1 && !runnerAchievements.firstRun.unlocked) {
        runnerAchievements.firstRun.unlocked = true;
        showRunnerAchievement(runnerAchievements.firstRun);
    }
    
    if (distance >= 10 && !runnerAchievements.tenMeters.unlocked) {
        runnerAchievements.tenMeters.unlocked = true;
        showRunnerAchievement(runnerAchievements.tenMeters);
    }
    
    if (distance >= 50 && !runnerAchievements.fiftyMeters.unlocked) {
        runnerAchievements.fiftyMeters.unlocked = true;
        showRunnerAchievement(runnerAchievements.fiftyMeters);
    }
    
    if (distance >= 100 && !runnerAchievements.hundredMeters.unlocked) {
        runnerAchievements.hundredMeters.unlocked = true;
        showRunnerAchievement(runnerAchievements.hundredMeters);
    }
    
    if (coins >= 1 && !runnerAchievements.firstCoin.unlocked) {
        runnerAchievements.firstCoin.unlocked = true;
        showRunnerAchievement(runnerAchievements.firstCoin);
    }
    
    if (coins >= 10 && !runnerAchievements.tenCoins.unlocked) {
        runnerAchievements.tenCoins.unlocked = true;
        showRunnerAchievement(runnerAchievements.tenCoins);
    }
}

// ========================================
// 3. MONETIZACIÓN MEJORADA PARA SOCIAL MEDIA
// ========================================

// Reward ads más agresivos para usuarios de social media
function showSocialRewardAd(powerUpType, callback) {
    const modal = document.createElement('div');
    modal.className = 'social-reward-ad-modal';
    modal.innerHTML = `
        <div class="social-reward-ad-content">
            <h3>🎬 Ver Anuncio para ${runnerPowerUps[powerUpType].name}</h3>
            <p>Mira un anuncio de 30 segundos para obtener este power-up gratis</p>
            <div class="ad-simulation">
                <div class="ad-video">
                    <div class="ad-progress"></div>
                    <p>Anuncio en reproducción...</p>
                    <div class="ad-brand">LIPA Studios</div>
                </div>
            </div>
            <button onclick="completeSocialRewardAd('${powerUpType}', ${callback})" class="btn">✅ Obtener Power-up</button>
            <button onclick="closeSocialRewardAd()" class="btn secondary">❌ Cancelar</button>
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
            modal.querySelector('button').disabled = false;
        }
    }, 100);
}

function completeSocialRewardAd(powerUpType, callback) {
    if (callback) callback();
    
    const modal = document.querySelector('.social-reward-ad-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
    
    showNotification(`¡${runnerPowerUps[powerUpType].name} activado!`, 'success');
}

function closeSocialRewardAd() {
    const modal = document.querySelector('.social-reward-ad-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
}

// Interstitial ads más frecuentes para usuarios de social media
function showSocialInterstitialAd() {
    const lastAdTime = parseInt(localStorage.getItem('lastSocialInterstitialAd') || '0');
    const currentTime = Date.now();
    const adInterval = 3 * 60 * 1000; // 3 minutos (más agresivo)
    
    if (currentTime - lastAdTime > adInterval) {
        const modal = document.createElement('div');
        modal.className = 'social-interstitial-ad-modal';
        modal.innerHTML = `
            <div class="social-interstitial-ad-content">
                <h3>📺 Anuncio</h3>
                <div class="ad-banner">
                    <p>Anuncio de 30 segundos</p>
                    <div class="ad-timer">30</div>
                    <div class="ad-brand">LIPA Studios</div>
                </div>
                <button onclick="closeSocialInterstitialAd()" class="btn">Continuar</button>
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
        
        localStorage.setItem('lastSocialInterstitialAd', currentTime.toString());
    }
}

function closeSocialInterstitialAd() {
    const modal = document.querySelector('.social-interstitial-ad-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
}

// ========================================
// 4. UI MEJORADA PARA SOCIAL MEDIA
// ========================================

// Actualizar display de monedas
function updateRunnerCoinsDisplay() {
    let coinsDisplay = document.getElementById('runnerCoinsDisplay');
    if (!coinsDisplay) {
        coinsDisplay = document.createElement('div');
        coinsDisplay.id = 'runnerCoinsDisplay';
        coinsDisplay.className = 'runner-coins-display';
        document.querySelector('.ui').appendChild(coinsDisplay);
    }
    coinsDisplay.innerHTML = `💰 ${runnerCoins}`;
}

// Mostrar notificación
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========================================
// 5. ESTILOS CSS ESPECÍFICOS PARA SOCIAL MEDIA
// ========================================

const socialMediaStyles = `
<style>
/* Modales de sharing para social media */
.social-share-modal, .instagram-instructions-modal, .social-reward-ad-modal, .social-interstitial-ad-modal {
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

.social-share-modal.show, .instagram-instructions-modal.show, .social-reward-ad-modal.show, .social-interstitial-ad-modal.show {
    opacity: 1;
}

.social-share-content, .instagram-instructions-content, .social-reward-ad-content, .social-interstitial-ad-content {
    background: linear-gradient(135deg, #FF0080, #00FFFF);
    padding: 2rem;
    border-radius: 20px;
    text-align: center;
    color: white;
    max-width: 500px;
    width: 90%;
    position: relative;
}

.social-buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin: 1.5rem 0;
}

.social-btn {
    padding: 1rem;
    border: none;
    border-radius: 15px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 1.1rem;
}

.social-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.social-btn.tiktok { background: #000; color: white; }
.social-btn.instagram { background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); color: white; }
.social-btn.youtube { background: #FF0000; color: white; }
.social-btn.facebook { background: #4267b2; color: white; }
.social-btn.twitter { background: #1da1f2; color: white; }

.hashtag-suggestions {
    margin: 1.5rem 0;
    text-align: left;
}

.hashtag-suggestions h4 {
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
}

.hashtags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.hashtag {
    background: rgba(255, 255, 255, 0.2);
    padding: 0.25rem 0.5rem;
    border-radius: 15px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s;
}

.hashtag:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
}

.instagram-instructions .steps {
    text-align: left;
    margin: 1.5rem 0;
}

.step {
    display: flex;
    align-items: center;
    margin: 1rem 0;
    gap: 1rem;
}

.step-number {
    background: #00FFFF;
    color: #000;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
}

/* Display de monedas del runner */
.runner-coins-display {
    position: fixed;
    top: 20px;
    left: 20px;
    background: rgba(0, 0, 0, 0.8);
    color: #00FFFF;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-weight: bold;
    z-index: 100;
    font-size: 1.1rem;
}

/* Notificaciones de logros */
.achievement-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #FF0080, #00FFFF);
    color: white;
    padding: 1rem;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 0.3s;
    max-width: 300px;
}

.achievement-notification.show {
    transform: translateX(0);
}

.achievement-content {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.achievement-icon {
    font-size: 2rem;
}

.achievement-text h4 {
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
}

.achievement-text p {
    margin: 0 0 0.5rem 0;
    font-weight: bold;
}

.reward {
    color: #FFD700;
    font-weight: bold;
    font-size: 1.1rem;
}

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

.ad-brand {
    font-size: 0.9rem;
    opacity: 0.7;
    margin-top: 0.5rem;
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

/* Notificaciones generales */
.notification {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #333;
    color: white;
    padding: 1rem 2rem;
    border-radius: 15px;
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.3s;
    font-weight: bold;
}

.notification.show {
    opacity: 1;
}

.notification.success { background: linear-gradient(135deg, #00FF00, #00CC00); }
.notification.error { background: linear-gradient(135deg, #FF0000, #CC0000); }
.notification.warning { background: linear-gradient(135deg, #FFD700, #FFA500); }
</style>
`;

// Inyectar estilos específicos para social media
document.head.insertAdjacentHTML('beforeend', socialMediaStyles);
