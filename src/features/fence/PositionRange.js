import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import RangeSlider from 'react-bootstrap-range-slider';
import Form from 'react-bootstrap/Form'
import {setPosition, savePosition} from './fenceSlice'
const convert = require('convert-units')

export const PositionRange = (props) => {
  const units = props.units


  const position = useSelector( state => state.fence.position )
  const conv = convert(position).from('in')
  const local_pos = conv.to(units)

  // const [local_pos, set_local_pos] = useState(conv.to(units))

  const max_pos = useSelector(state => state.fence.max_position)
  const min_pos = useSelector(state => state.fence.min_position)
  const local_min_pos = convert(min_pos).from('in').to(units)
  const local_max_pos = convert(max_pos).from('in').to(units)

  const dispatch = useDispatch()
  const onPositionChange = (slider_pos) => {
    const loc_pos = num_from_slider(slider_pos)
    const standard_position = convert(loc_pos).from(units).to('in')
    dispatch(setPosition(standard_position))
    dispatch(savePosition(standard_position))
  }

  const num_for_slider = (num) => {
    return num * 100
  }

  const num_from_slider = (num) => {
    return num / 100
  }

  return (
    <Form>
        <RangeSlider
            value={num_for_slider(local_pos)}
            onChange={e => onPositionChange(e.target.value)}
            min={num_for_slider(local_min_pos)}
            max={num_for_slider(local_max_pos)}
            tooltipLabel={pos => `${num_from_slider(pos).toFixed(2)} ${conv.destination.abbr}`}
        />
    </Form>
  )};