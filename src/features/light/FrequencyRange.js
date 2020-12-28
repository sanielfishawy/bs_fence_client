import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import RangeSlider from 'react-bootstrap-range-slider';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {setFrequency, saveFrequency} from './lightSlice'

export const FrequencyRange = () => {

  const frequency = useSelector( state => state.light.frequency )
  const minFreq = useSelector( state => state.light.min_frequency )
  const maxFreq = useSelector( state => state.light.max_frequency )
  const defaultFreq = useSelector( state => state.light.default_frequency )

  const buttonVisibility =  frequency !== defaultFreq  ? '' : 'd-none'

  const dispatch = useDispatch()
  const onFrequencyChange = async (freq) => {
    dispatch(setFrequency(freq))
    await dispatch(saveFrequency(freq))
  }

  return (
    <Form>
        <Form.Label>Frequency <small>{frequency}Hz</small></Form.Label>
        <RangeSlider
            value={frequency}
            onChange={e => onFrequencyChange(e.target.value)}
            min={minFreq}
            max={maxFreq}
            tooltipLabel={frequency => `${frequency}Hz`}
        />
        <Button
            onClick={() => onFrequencyChange(defaultFreq)}
            className={buttonVisibility}>
                {`Set ${defaultFreq}Hz`}
        </Button>
    </Form>
  )};