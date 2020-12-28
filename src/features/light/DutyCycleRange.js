import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import RangeSlider from 'react-bootstrap-range-slider';
import Form from 'react-bootstrap/Form'
import {setDutyCycle, saveDutyCycle} from './lightSlice'

export const DutyCycleRange = () => {

  const dutyCycle = useSelector( state => state.light.duty_cycle )
  const minDutyCycle = useSelector( state => state.light.min_duty_cycle )
  const maxDutyCycle = useSelector( state => state.light.max_duty_cycle )

  const dispatch = useDispatch()
  const onDutyCycleChange = async (dutyCycle) => {
    dispatch(setDutyCycle(dutyCycle))
    await dispatch(saveDutyCycle(dutyCycle))
  }

  return (
    <Form>
        <Form.Label>Duty cycle <small>{dutyCycle}%</small></Form.Label>
        <RangeSlider
            value={dutyCycle}
            onChange={e => onDutyCycleChange(e.target.value)}
            min={minDutyCycle}
            max={maxDutyCycle}
            tooltipLabel={dutyCycle => `${dutyCycle}%`}
        />
    </Form>
  )};