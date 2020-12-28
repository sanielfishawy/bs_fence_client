import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import RangeSlider from 'react-bootstrap-range-slider';
import Form from 'react-bootstrap/Form'

export const Zero255Range = (props) => {

  const value = useSelector(state => state.light[props.stateName])

  const dispatch = useDispatch()
  const onChange = async (value) => {
    dispatch(props.setMethod(value))
    await dispatch(props.saveMethod(value))
  }

  return (
    <Form>
        <Form.Label>{props.name} <small>{value}</small></Form.Label>
        <RangeSlider
            value={value}
            onChange={e => onChange(e.target.value)}
            min={0}
            max={255}
        />
    </Form>
  )};