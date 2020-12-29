import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import RangeSlider from 'react-bootstrap-range-slider';
import Form from 'react-bootstrap/Form'
import {setPosition, savePosition} from './fenceSlice'
import PositionHelper from './PositionHelper';

export const PositionRange = () => {
  const position = useSelector( state => state.fence.position )
  const slider_position = PositionHelper.position_for_slider(position)
  const minPos = PositionHelper.position_for_slider(useSelector( state => state.fence.min_position ))
  const maxPos = PositionHelper.position_for_slider(useSelector( state => state.fence.max_position ))

  const dispatch = useDispatch()
  const onPositionChange = async (pos) => {
    const position = PositionHelper.position_from_slider(pos)
    dispatch(setPosition(position))
    await dispatch(savePosition(position))
  }

  return (
    <Form>
        <RangeSlider
            value={slider_position}
            onChange={e => onPositionChange(e.target.value)}
            min={minPos}
            max={maxPos}
            tooltipLabel={position => `${PositionHelper.position_from_slider(position)} in.`}
        />
    </Form>
  )};