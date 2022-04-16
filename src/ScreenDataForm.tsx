import React from "react"

export type ScreenData = {
  diagonal: number
  width: number
  height: number
}

type Props = {
    presets: Array<ScreenData>
    value: ScreenData
    onChange: (value: ScreenData) => void
}

export const ScreenDataForm: React.FC<Props> = ({presets, value, onChange}) => {

  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if(!!e.target.value) {
      onChange(presets[Number(e.target.value)]);
    }
  }

  const handleDiagonalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({...value, diagonal: Number(e.target.value)});
  }

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({...value, width: Number(e.target.value)});
  }

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({...value, height: Number(e.target.value)});
  }

  return (
    <>
      <label>
        Presets:
        <select value="" onChange={handlePresetChange}>
          <option value="">- Select -</option>
          {presets.map((preset, i) =>
            <option key={i} value={i}>{preset.diagonal}" {preset.width}x{preset.height}</option>  
          )}
        </select>
      </label>

      <label>
        Diagonal:
        <input type="number" value={value.diagonal} onChange={handleDiagonalChange} />
      </label>
      <label>
        Width:
        <input type="number" value={value.width} onChange={handleWidthChange} />
      </label>
      <label>
        Height:
        <input type="number" value={value.height} onChange={handleHeightChange} />
      </label>
    </>
  );
}