const SECTIONS_PROGRESS_UPDATED = 'sections-progress-updated';

export function notifySectionsProgressUpdated() {
  window.dispatchEvent(new CustomEvent(SECTIONS_PROGRESS_UPDATED));
}

export function subscribeSectionsProgressUpdated(callback: () => void) {
  window.addEventListener(SECTIONS_PROGRESS_UPDATED, callback);

  return () => {
    window.removeEventListener(SECTIONS_PROGRESS_UPDATED, callback);
  };
}
