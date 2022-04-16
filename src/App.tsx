import React, { useState } from 'react';
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
  createScreenData(24, 1920, 1080),
  createScreenData(27, 2560, 1440),
  createScreenData(32, 3840, 2160),
  createScreenData(34, 3440, 1440),
  createScreenData(42, 3840, 2160)
];

const calcPPI = (value: ScreenData): number => {
  return Math.sqrt(Math.pow(value.width, 2) + Math.pow(value.height, 2)) / value.diagonal;
};

export default function App() {
  const [src, setSrc] = useState<ScreenData>(presets[0]);
  const [dest, setDest] = useState<ScreenData>(presets[2]);
  const [displayMode, setDisplayMode] = useState<DisplayMode>(DisplayMode.disabled);

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

      <div style={{ display: 'flex' }}>
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