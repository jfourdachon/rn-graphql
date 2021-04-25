import React from 'react'
import { TouchableOpacity } from 'react-native'

type Iprops = {
    children: React.ReactNode
    style?: {},
    onPress: () => {}
}

const Touchable = ({children, style, onPress}: Iprops) => {
    return (
        <TouchableOpacity style={style} onPress={onPress}>
            {children}
        </TouchableOpacity>
    )
}

export default Touchable
