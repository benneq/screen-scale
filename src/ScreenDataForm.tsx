export type ScreenData = {
  diagonal: number
  width: number
  height: number
}

type Props = {
    value: ScreenData
    onChange: (value: ScreenData) => void
}

export const ScreenDataForm: React.FC<Props> = ({value, onChange}) => {

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