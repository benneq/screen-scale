import React from "react"

const loremIpsum = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.";

const fontSizes = [6, 7, 8, 9, 10, 11, 12, 14, 16, 18, 21, 24, 36, 48, 60, 72];

type Props = {
    zoom: number
}

export const Result: React.FC<Props> = ({zoom}) => {
  return (
    <div style={{ zoom, overflow: 'hidden' }}>
      {fontSizes.map(fontSize =>
        <div key={fontSize} style={{ fontSize: `${fontSize}px`, whiteSpace: 'nowrap' }}>{fontSize}px: {loremIpsum}</div>  
      )}
    </div>
  );
}