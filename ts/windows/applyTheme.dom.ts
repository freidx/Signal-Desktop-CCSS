// Copyright 2021 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

const CUSTOM_CSS_STYLE_ID = 'signal-client-custom-css';

function sanitizeCustomCss(css: string): string {
  return css.replace(/<\/style>/gi, '');
}

export function applyCustomCssToDOM(css: string): void {
  let styleEl = document.getElementById(
    CUSTOM_CSS_STYLE_ID
  ) as HTMLStyleElement | null;
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = CUSTOM_CSS_STYLE_ID;
    document.head.appendChild(styleEl);
  }

  if (css) {
    styleEl.textContent = sanitizeCustomCss(css);
  } else {
    styleEl.textContent = '';
  }
}

async function applyTheme() {
  const theme = await window.SignalContext.Settings.themeSetting.getValue();
  const customCss =
    (await window.SignalContext.Settings.customCss.getValue()) || '';

  document.body.classList.remove('light-theme');
  document.body.classList.remove('dark-theme');
  document.body.classList.add(
    `${
      theme === 'system'
        ? window.SignalContext.nativeThemeListener.getSystemTheme()
        : theme
    }-theme`
  );

  applyCustomCssToDOM(customCss);
}

async function applyThemeLoop() {
  // oxlint-disable-next-line no-constant-condition
  while (true) {
    // oxlint-disable-next-line no-await-in-loop
    await window.SignalContext.Settings.waitForChange();

    // oxlint-disable-next-line no-await-in-loop
    await applyTheme();
  }
}

void applyTheme();
void applyThemeLoop();

window.SignalContext.nativeThemeListener.subscribe(() => {
  void applyTheme();
});

export {};
