const KEY = 'cp-consent';
const SIX_MONTHS = 1000 * 60 * 60 * 24 * 182;

/** true = accepté, false = refusé, null = pas encore de choix (ou choix expiré). */
export function getConsent(): boolean | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const { maps, date } = JSON.parse(raw);
    if (Date.now() - date > SIX_MONTHS) return null;
    return Boolean(maps);
  } catch {
    return null;
  }
}

export function setConsent(maps: boolean) {
  try { localStorage.setItem(KEY, JSON.stringify({ maps, date: Date.now() })); } catch { /* navigation privée */ }
  window.dispatchEvent(new CustomEvent('cp:consent', { detail: { maps } }));
}
