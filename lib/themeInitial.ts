export function themeInitial(): string {
  function setInitialColorMode() {
    function getInitialColorMode() {
      const persistedPreferenceMode = window.localStorage.getItem('theme');
      if (persistedPreferenceMode && persistedPreferenceMode !== 'system') {
        return persistedPreferenceMode;
      }

      const preference = window.matchMedia('(prefers-color-scheme: dark)');
      return preference.matches ? 'dark' : 'light';
    }

    const currentTheme = getInitialColorMode();
    const element = document.documentElement;
    element.classList.remove('light', 'dark');
    element.classList.add(currentTheme);
    element.style.setProperty('color-scheme', currentTheme);
  }

  return `(function() {
    const tis = ${setInitialColorMode.toString()}
    tis();
  })()
  `;
}
