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
    // currency theme
    const currentTheme = getInitialColorMode();
    const element = document.documentElement;
    element.style.setProperty('color-scheme', currentTheme);
    element.classList.add(currentTheme);
  }

  return `(function() {
    const tis = ${setInitialColorMode.toString()}
    tis();
  })()
  `;
}
