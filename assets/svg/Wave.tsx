import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg viewBox="0 0 1440 320" {...props}>
      <Path
        fill="#f3f4f5"
        d="M0 160l24 21.3C48 203 96 245 144 234.7c48-10.7 96-74.7 144-101.4 48-26.3 96-16.3 144 16C480 181 528 235 576 224s96-85 144-90.7c48-5.3 96 58.7 144 74.7s96-16 144-5.3c48 10.3 96 64.3 144 58.6 48-5.3 96-69.3 144-90.6 48-21.7 96 .3 120 10.6l24 10.7V0H0z"
      />
    </Svg>
  )
}

export default SvgComponent
