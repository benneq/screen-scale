import React from "react"

type Props = {
    presets: Array<string>
    value: string
    onChange: (value: string) => void
}

export const FontSelect: React.FC<Props> = ({presets, value, onChange}) => {

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if(!!e.target.value) {
      onChange(e.target.value);
    }
  }

  return (
    <label>
      Font:
      <select value={value} onChange={handleFontChange}>
        {presets.map((preset, i) =>
          <option key={i} value={preset}>{preset}</option>  
        )}
      </select>
    </label>
  );
}