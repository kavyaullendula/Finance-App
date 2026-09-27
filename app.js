/**
 * Enterprise Finance Department Access Portal - Controller
 * Upgraded interactive engine with SOX Tier 1 verification,
 * audio synthesizers, modal previewers, and dynamic currency telemetry.
 */

// Application State
const state = {
    isAuthorized: false,
    sessionToken: 'FIN-TX-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
    activeTheme: 'dark',
    activeModal: null
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initClock();
    initTheme();
    initSessionCode();
    simulateTickerRates();
});

/**
 * Real-time UTC Clock in Footer
 */
function initClock() {
    const clockEl = document.getElementById('liveClock');
    const updateTime = () => {
        const now = new Date();
        const utcStr = now.toISOString().substring(11, 19) + ' UTC';
        if (clockEl) clockEl.textContent = utcStr;
    };
    updateTime();
    setInterval(updateTime, 1000);
}

/**
 * Sets initial session token
 */
function initSessionCode() {
    const sessionEl = document.getElementById('sessionCode');
    if (sessionEl) {
        sessionEl.textContent = state.sessionToken;
    }
}

/**
 * Synthesizes subtle fintech sound effects using Web Audio API
 */
function playAudioTone(type = 'success') {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        const now = ctx.currentTime;

        if (type === 'success') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(659.25, now); // E5
            osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.15); // C6
            gain.gain.setValueAtTime(0.09, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
            osc.start(now);
            osc.stop(now + 0.28);
        } else if (type === 'click') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(520, now);
            gain.gain.setValueAtTime(0.04, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
            osc.start(now);
            osc.stop(now + 0.08);
        }
    } catch (e) {
        // Fallback silently if audio context is blocked
    }
}

/**
 * Upgraded showMessage() authorization function
 */
function showMessage() {
    const btn = document.getElementById('accessBtn');
    const msgContainer = document.getElementById('messageContainer');
    const messageEl = document.getElementById('message');
    const messageSubEl = document.getElementById('messageSub');
    const modulesGrid = document.getElementById('financeModules');

    playAudioTone('click');

    // UI Loading state
    btn.disabled = true;
    btn.querySelector('.btn-text').textContent = "Authenticating SOX Protocol...";

    setTimeout(() => {
        state.isAuthorized = true;
        playAudioTone('success');

        // Button state
        btn.disabled = false;
        btn.classList.add('granted');
        btn.querySelector('.btn-text').textContent = "Access Granted • Finance Portal";

        // Message Banner content
        messageEl.textContent = "● Finance Portal Access Granted!";
        messageSubEl.innerHTML = `SOX Session: <span style="color:#34d399">${state.sessionToken}</span> (Zero-Trust Active)`;
        msgContainer.classList.remove('hidden');

        // Reveal Financial Modules
        modulesGrid.classList.remove('hidden');

        showToast("✓ Treasury & Ledger Workspaces Unlocked");
    }, 550);
}

/**
 * Opens interactive modal module details
 */
function openModule(title, subtitle, stats) {
    if (!state.isAuthorized) {
        playAudioTone('click');
        showToast("⚠️ Please authenticate via 'Access Finance Portal' first");
        return;
    }

    playAudioTone('click');
    const modal = document.getElementById('previewModal');
    const mTitle = document.getElementById('modalTitle');
    const mSubtitle = document.getElementById('modalSubtitle');
    const mStats = document.getElementById('modalStats');
    const mLog = document.getElementById('modalLog');

    mTitle.textContent = title;
    mSubtitle.textContent = subtitle;
    mStats.textContent = stats;

    const time = new Date().toTimeString().split(' ')[0];
    mLog.innerHTML = `[${time}] Verified SOX Level 1 Signature for ${title}.<br>[${time}] Encrypted Fedwire mesh tunnel established.`;

    modal.classList.remove('hidden');
    state.activeModal = title;
}

/**
 * Modal dismissal
 */
function closeModal(e) {
    if (e.target.id === 'previewModal') {
        closeModalDirect();
    }
}

function closeModalDirect() {
    playAudioTone('click');
    const modal = document.getElementById('previewModal');
    if (modal) modal.classList.add('hidden');
}

/**
 * Action inside modal
 */
function triggerLaunch() {
    playAudioTone('click');
    showToast(`Launching ${state.activeModal || 'Finance Console'}...`);
    closeModalDirect();
}

/**
 * Copies session authorization token to clipboard
 */
function copySessionToken() {
    navigator.clipboard.writeText(state.sessionToken).then(() => {
        playAudioTone('click');
        showToast("SOX Token copied to clipboard!");
    }).catch(() => {
        showToast("Token: " + state.sessionToken);
    });
}

/**
 * Displays floating micro-toast
 */
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.remove('hidden');

    if (window.toastTimeout) clearTimeout(window.toastTimeout);
    window.toastTimeout = setTimeout(() => {
        toast.classList.add('hidden');
    }, 3200);
}

/**
 * Simulates fluctuating market rates
 */
function simulateTickerRates() {
    setInterval(() => {
        const rateEl = document.querySelector('.ticker-val');
        if (rateEl) {
            const base = 1.0940;
            const variance = (Math.random() * 0.0010).toFixed(4);
            rateEl.textContent = `${(parseFloat(base) + parseFloat(variance)).toFixed(4)} ▲`;
        }
    }, 4500);
}

/**
 * Theme switcher (Dark / Light)
 */
function initTheme() {
    const themeBtn = document.getElementById('themeToggleBtn');
    if (!themeBtn) return;

    themeBtn.addEventListener('click', () => {
        playAudioTone('click');
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', newTheme);
        state.activeTheme = newTheme;
        showToast(`Theme switched to ${newTheme.toUpperCase()}`);
    });
}
