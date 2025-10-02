// 🏆 LIPA STUDIOS - DAILY LEADERBOARD SYSTEM
// Sistema de clasificación diaria para todos los juegos

class DailyLeaderboard {
    constructor(gameName) {
        this.gameName = gameName;
        this.storageKey = `lipa_leaderboard_${gameName}`;
        this.userKey = `lipa_user_${gameName}`;
        this.today = this.getTodayString();
        this.leaderboard = this.loadLeaderboard();
        this.currentUser = this.loadCurrentUser();
    }

    getTodayString() {
        return new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    }

    loadLeaderboard() {
        try {
            const data = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
            if (data.date !== this.today) {
                // Nuevo día - reiniciar leaderboard
                return { date: this.today, scores: [] };
            }
            return data;
        } catch (e) {
            return { date: this.today, scores: [] };
        }
    }

    loadCurrentUser() {
        try {
            return JSON.parse(localStorage.getItem(this.userKey) || 'null');
        } catch (e) {
            return null;
        }
    }

    saveLeaderboard() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.leaderboard));
        } catch (e) {
            console.error('Error saving leaderboard:', e);
        }
    }

    saveCurrentUser() {
        try {
            localStorage.setItem(this.userKey, JSON.stringify(this.currentUser));
        } catch (e) {
            console.error('Error saving user:', e);
        }
    }

    setUserName(name) {
        this.currentUser = {
            name: name.trim().substring(0, 15), // Máximo 15 caracteres
            joinDate: this.currentUser?.joinDate || new Date().toISOString(),
            totalGames: this.currentUser?.totalGames || 0,
            bestScore: this.currentUser?.bestScore || 0
        };
        this.saveCurrentUser();
    }

    submitScore(score, level = 1, combo = 0) {
        if (!this.currentUser) {
            // Guardar envío pendiente y pedir nombre
            this._pendingSubmission = { score, level, combo };
            this.showNamePrompt(true);
            return false;
        }

        const scoreData = {
            name: this.currentUser.name,
            score: score,
            level: level,
            combo: combo,
            timestamp: Date.now(),
            game: this.gameName
        };

        // Añadir score al leaderboard
        this.leaderboard.scores.push(scoreData);
        
        // Ordenar por score descendente
        this.leaderboard.scores.sort((a, b) => b.score - a.score);
        
        // Mantener solo top 50
        this.leaderboard.scores = this.leaderboard.scores.slice(0, 50);
        
        this.saveLeaderboard();

        // Actualizar stats del usuario
        this.currentUser.totalGames++;
        if (score > this.currentUser.bestScore) {
            this.currentUser.bestScore = score;
        }
        this.saveCurrentUser();

        // Mostrar ranking
        this.showRanking(scoreData);
        
        return true;
    }

    getRanking() {
        return this.leaderboard.scores.slice(0, 10); // Top 10
    }

    getUserRank() {
        if (!this.currentUser) return null;
        
        const userIndex = this.leaderboard.scores.findIndex(
            entry => entry.name === this.currentUser.name
        );
        
        return userIndex >= 0 ? userIndex + 1 : null;
    }

    showNamePrompt(autoSubmitAfter = false) {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.9); z-index: 100000; display: flex;
            align-items: center; justify-content: center; font-family: system-ui;
        `;
        
        overlay.innerHTML = `
            <div style="background: linear-gradient(135deg, #1a1a2e, #16213e); 
                        border: 2px solid #00ffff; border-radius: 15px; padding: 30px; 
                        text-align: center; max-width: 400px; width: 90%;">
                <h2 style="color: #00ffff; margin-bottom: 20px;">🏆 ¡Únete al Ranking Diario!</h2>
                <p style="color: #fff; margin-bottom: 20px;">Elige tu nombre para competir en la clasificación diaria</p>
                <input type="text" id="username-input" placeholder="Tu nombre (máx 15 caracteres)" 
                       style="width: 100%; padding: 12px; margin-bottom: 20px; border: 2px solid #00ffff; 
                              background: rgba(0,0,0,0.5); color: #fff; border-radius: 8px; font-size: 16px;"
                       maxlength="15">
                <div style="display: flex; gap: 10px; justify-content: center;">
                    <button id="save-name" style="background: #00ffff; color: #000; padding: 12px 24px; 
                            border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">GUARDAR</button>
                    <button id="skip-name" style="background: #666; color: #fff; padding: 12px 24px; 
                            border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">SALTAR</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        const input = overlay.querySelector('#username-input');
        const saveBtn = overlay.querySelector('#save-name');
        const skipBtn = overlay.querySelector('#skip-name');
        
        input.focus();
        
        saveBtn.onclick = () => {
            const name = input.value.trim();
            if (name.length >= 2) {
                this.setUserName(name);
                document.body.removeChild(overlay);
                // Si hay envío pendiente, publicarlo ahora
                if (autoSubmitAfter && this._pendingSubmission) {
                    const { score, level, combo } = this._pendingSubmission;
                    this._pendingSubmission = null;
                    this.submitScore(score, level, combo);
                }
            } else {
                alert('El nombre debe tener al menos 2 caracteres');
            }
        };
        
        skipBtn.onclick = () => {
            // Asignar un nombre temporal si el usuario decide saltar
            if (!this.currentUser) {
                this.setUserName('Anónimo');
            }
            document.body.removeChild(overlay);
            if (autoSubmitAfter && this._pendingSubmission) {
                const { score, level, combo } = this._pendingSubmission;
                this._pendingSubmission = null;
                this.submitScore(score, level, combo);
            }
        };
        
        input.onkeypress = (e) => {
            if (e.key === 'Enter') saveBtn.click();
        };
    }

    showRanking(scoreData) {
        const ranking = this.getRanking();
        const userRank = this.getUserRank();
        
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.9); z-index: 100000; display: flex;
            align-items: center; justify-content: center; font-family: system-ui;
        `;
        
        let rankingHTML = '';
        ranking.forEach((entry, index) => {
            const isCurrentUser = entry.name === this.currentUser.name;
            const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🏅';
            const rankClass = isCurrentUser ? 'current-user' : '';
            
            rankingHTML += `
                <div class="rank-item ${rankClass}" style="
                    display: flex; justify-content: space-between; align-items: center;
                    padding: 8px 12px; margin: 4px 0; border-radius: 8px;
                    background: ${isCurrentUser ? 'rgba(0,255,255,0.2)' : 'rgba(255,255,255,0.1)'};
                    border: ${isCurrentUser ? '2px solid #00ffff' : '1px solid #333'};
                ">
                    <span style="color: #fff; font-weight: bold;">${medal} #${index + 1}</span>
                    <span style="color: ${isCurrentUser ? '#00ffff' : '#fff'}; font-weight: bold;">${entry.name}</span>
                    <span style="color: #ffff00; font-weight: bold;">${entry.score.toLocaleString()}</span>
                </div>
            `;
        });
        
        overlay.innerHTML = `
            <div style="background: linear-gradient(135deg, #1a1a2e, #16213e); 
                        border: 2px solid #00ffff; border-radius: 15px; padding: 30px; 
                        text-align: center; max-width: 500px; width: 90%; max-height: 80vh; overflow-y: auto;">
                <h2 style="color: #00ffff; margin-bottom: 20px;">🏆 Ranking Diario - ${this.gameName}</h2>
                <p style="color: #fff; margin-bottom: 20px;">Tu posición: #${userRank || 'No clasificado'}</p>
                
                <div style="margin-bottom: 20px;">
                    ${rankingHTML}
                </div>
                
                <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                    <button id="share-ranking" style="background: #1da1f2; color: #fff; padding: 10px 20px; 
                            border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">📱 Compartir</button>
                    <button id="close-ranking" style="background: #00ffff; color: #000; padding: 10px 20px; 
                            border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">Cerrar</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        const shareBtn = overlay.querySelector('#share-ranking');
        const closeBtn = overlay.querySelector('#close-ranking');
        
        shareBtn.onclick = () => {
            this.shareRanking(scoreData, userRank);
        };
        
        closeBtn.onclick = () => {
            document.body.removeChild(overlay);
        };
    }

    shareRanking(scoreData, userRank) {
        const gameNames = {
            'stack-tower-neon': 'Stack Tower Neon',
            'neon-runner-wow': 'Neon Runner WOW',
            'neon-beat-wow': 'Neon Beat WOW',
            'neon-lab-physics-wow': 'Neon Lab Physics WOW',
            'neon-runner-lipastudios': 'Neon Runner',
            'neon-beat-stage': 'Neon Beat Stage',
            'neon-lab-physics': 'Neon Lab Physics'
        };
        
        const gameName = gameNames[this.gameName] || this.gameName;
        const rankText = userRank ? `#${userRank}` : 'No clasificado';
        
        const shareText = `🏆 ¡He conseguido ${scoreData.score.toLocaleString()} puntos en ${gameName}! 
Posición en el ranking diario: ${rankText}

¿Puedes superarme? Juega gratis en: https://lipastudios.com

#LIPAStudios #JuegosNeon #Gaming`;

        // Intentar compartir nativo
        if (navigator.share) {
            navigator.share({
                title: `Ranking ${gameName}`,
                text: shareText,
                url: 'https://lipastudios.com'
            });
        } else {
            // Fallback - copiar al clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                alert('¡Texto copiado! Pégalo en tus redes sociales');
            }).catch(() => {
                // Fallback manual
                const textArea = document.createElement('textarea');
                textArea.value = shareText;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                alert('¡Texto copiado! Pégalo en tus redes sociales');
            });
        }
    }

    getStats() {
        if (!this.currentUser) return null;
        
        return {
            name: this.currentUser.name,
            totalGames: this.currentUser.totalGames,
            bestScore: this.currentUser.bestScore,
            currentRank: this.getUserRank(),
            joinDate: this.currentUser.joinDate
        };
    }
}

// 🎮 INTEGRACIÓN CON JUEGOS
window.LipaLeaderboard = DailyLeaderboard;

// Función helper para integrar fácilmente
window.initLeaderboard = function(gameName) {
    return new DailyLeaderboard(gameName);
};

// Función para mostrar ranking desde cualquier parte
window.showLeaderboard = function(gameName) {
    const lb = new DailyLeaderboard(gameName);
    const ranking = lb.getRanking();
    const userRank = lb.getUserRank();
    // Si no hay usuario aún, pedir nombre (opcional)
    if (!lb.currentUser) {
        lb.showNamePrompt(false);
    }
    // Mostrar ranking aunque esté vacío (invita a ser el primero)
    lb.showRanking({ name: lb.currentUser?.name || 'Anónimo', score: 0 });
};

console.log('🏆 LIPA Leaderboard System loaded!');
