import React, { useState } from 'react';
import { FontSelect } from './FontSelect';
import { Result } from './Result';
import { ScreenData, ScreenDataForm } from './ScreenDataForm';

enum DisplayMode {
  enabled,
  disabled,
  sideBySide
}

const createScreenData = (diagonal: number, width: number, height: number): ScreenData => {
  return { diagonal, width, height };
}

const presets = [
  createScreenData(13, 1440, 900),
  createScreenData(24, 1920, 1080),
  createScreenData(27, 2560, 1440),
  createScreenData(32, 3840, 2160),
  createScreenData(34, 3440, 1440),
  createScreenData(42, 3840, 2160)
];

const fonts = [
  "Arial, sans-serif",
  "Verdana, sans-serif",
  "Helvetica, sans-serif",
  "Tahoma, sans-serif",
  "'Trebuchet MS', sans-serif",
  "'Times New Roman', serif",
  "Georgia, serif",
  "Garamond, serif",
  "'Courier New', monospace",
  "'Brush Script MT', cursive"
];

const calcPPI = (value: ScreenData): number => {
  return Math.sqrt(Math.pow(value.width, 2) + Math.pow(value.height, 2)) / value.diagonal;
};

export default function App() {
  const [src, setSrc] = useState<ScreenData>(presets[0]);
  const [dest, setDest] = useState<ScreenData>(presets[2]);
  const [font, setFont] = useState<string>(fonts[0]);
  const [fontWeightBold, setFontWeightBold] = useState<boolean>(false);
  const [fontStyleItalic, setFontStyleItalic] = useState<boolean>(false);
  const [displayMode, setDisplayMode] = useState<DisplayMode>(DisplayMode.disabled);

  const handleFontWeightBoldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFontWeightBold(e.target.checked);
  }

  const handleFontStyleItalicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFontStyleItalic(e.target.checked);
  }

  const handleDisplayModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayMode(Number(e.target.value));
  }

  const srcPPI = calcPPI(src);
  const destPPI = calcPPI(dest);
  const scaleFactor = srcPPI / destPPI;

  return (
    <div>
      <fieldset>
        <legend>Source</legend>
        <ScreenDataForm
          presets={presets}
          value={src}
          onChange={setSrc}
        />
        <span style={{ display: 'inline-block' }}>
          PPI: {srcPPI}
        </span>
      </fieldset>

      <fieldset>
        <legend>Destination</legend>
        <ScreenDataForm
          presets={presets}
          value={dest}
          onChange={setDest}
        />
        <span style={{ display: 'inline-block' }}>
          PPI: {destPPI}
        </span>
      </fieldset>

      <fieldset>
        <legend>Font</legend>
        <FontSelect
          presets={fonts}
          value={font}
          onChange={setFont}
        />
        <label>
          <input
            type="checkbox"
            checked={fontWeightBold}
            onChange={handleFontWeightBoldChange}
          />
          Bold
        </label>
        <label>
          <input
            type="checkbox"
            checked={fontStyleItalic}
            onChange={handleFontStyleItalicChange}
          />
          Italic
        </label>
      </fieldset>

      <fieldset>
        <legend>Display Mode</legend>
        <label>
          <input
            type="radio"
            name="displayMode"
            value={DisplayMode.enabled}
            checked={displayMode === DisplayMode.enabled}
            onChange={handleDisplayModeChange}
          />
          Enabled
        </label>
        <label>
          <input
            type="radio"
            name="displayMode"
            value={DisplayMode.disabled}
            checked={displayMode === DisplayMode.disabled}
            onChange={handleDisplayModeChange}
          />
          Disabled
        </label>
        <label>
          <input
            type="radio"
            name="displayMode"
            value={DisplayMode.sideBySide}
            checked={displayMode === DisplayMode.sideBySide}
            onChange={handleDisplayModeChange}
          />
          Side-by-Side
        </label>
      </fieldset>

      <div style={{
        display: 'flex',
        fontFamily: font,
        fontWeight: fontWeightBold ? 'bold' : 'normal',
        fontStyle: fontStyleItalic ? 'italic' : 'normal'
      }}>
        {displayMode !== DisplayMode.enabled && (
          <div style={{ flex: '1', width: 'calc(100vw - (100vw - 50%))' }}>
            Scale: 1
            <Result zoom={1} />
          </div>
        )}
        {displayMode !== DisplayMode.disabled && (
          <div style={{ flex: '1', width: 'calc(100vw - (100vw - 50%))' }}>
            Scale: {scaleFactor}
            <Result zoom={scaleFactor} />
          </div>
        )}
      </div>

    </div>
  );
}