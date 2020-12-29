import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { setPosition, savePosition } from './fenceSlice'
import PositionHelper from './PositionHelper'

export const NumberInput = () => {
    const position = useSelector( state => state.fence.position )
    const display_position = PositionHelper.display_position_inches(position)
    const max_postion = useSelector( state => state.fence.max_postion )
    const min_postion = useSelector( state => state.fence.min_postion )

    const dispatch = useDispatch()
    const onPositionChange = async (pos) => {
        const position = PositionHelper.position_from_slider(pos)
        dispatch(setPosition(position))
        await dispatch(savePosition(position))
    }

    return (
        <input
            type='number'
            class="form-control form-control-lg"
            placeholder={display_position}
            min={min_postion}
            max={max_postion}
            step=".1"
            onChange={e => onPositionChange(e.target.value)}
            />
    )
}