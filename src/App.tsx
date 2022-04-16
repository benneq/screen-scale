import React, { useState } from 'react';
import { ScreenData, ScreenDataForm } from './ScreenDataForm';

const loremIpsum = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.";

const fontSizes = [6, 7, 8, 9, 10, 11, 12, 14, 16, 18, 21, 24, 36, 48, 60, 72];

const calcPPI = (value: ScreenData): number => {
  return Math.sqrt(Math.pow(value.width, 2) + Math.pow(value.height, 2)) / value.diagonal;
};

export default function App() {

  const [src, setSrc] = useState<ScreenData>({
    diagonal: 24,
    width: 1920,
    height: 1080
  });

  const [dest, setDest] = useState<ScreenData>({
    diagonal: 32,
    width: 3840,
    height: 2160
  });

  const [enabled, setEnabled] = useState(false);

  const handleEnabledChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnabled(e.target.checked);
  }

  const srcPPI = calcPPI(src);
  const destPPI = calcPPI(dest);
  const scaleFactor = enabled ? srcPPI / destPPI : 1;

  return (
    <div>
      <fieldset>
        <legend>Source:</legend>
        <ScreenDataForm
          value={src}
          onChange={setSrc}
        />
        PPI: {srcPPI}
      </fieldset>

      <fieldset>
        <legend>Destination:</legend>
        <ScreenDataForm
          value={dest}
          onChange={setDest}
        />
        PPI: {destPPI}
      </fieldset>

      <label>
        Enabled:
        <input type="checkbox" checked={enabled} onChange={handleEnabledChange} />
      </label>

      Scale:
      {scaleFactor}

      <div style={{ zoom: scaleFactor, overflow: 'hidden' }}>
        {fontSizes.map(fontSize =>
          <div key={fontSize} style={{ fontSize: `${fontSize}px`, whiteSpace: 'nowrap' }}>{fontSize}px: {loremIpsum}</div>  
        )}
      </div>
    </div>
  );
}