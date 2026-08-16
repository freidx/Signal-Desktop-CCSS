import type { JSX } from 'react';
import type { LocalizerType } from '../types/I18N.std.ts';

export type PropsType = {
  i18n: LocalizerType;
  customCss: string;
  onCustomCssChange: (css: string) => void;
};

export function CustomCssPage({
  i18n,
  customCss,
  onCustomCssChange,
}: PropsType): JSX.Element {
  return (
    <div className="CustomCssPage">
      <div className="CustomCssPage__header">
        <h2>{i18n('icu:Preferences__customCss')}</h2>
        <p>{i18n('icu:CustomThemes__customCssSubtitle')}</p>
      </div>
      <textarea
        className="CustomCssPage__textarea"
        placeholder={i18n('icu:CustomThemes__editorPlaceholder')}
        value={customCss}
        onChange={e => onCustomCssChange(e.target.value)}
        spellCheck={false}
      />
    </div>
  );
}