import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Form from 'react-bootstrap/Form'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import {setBlink, saveBlink} from './lightSlice'

export const BlinkSwitch = () => {

    const blink = useSelector(state => state.light.blink)
    const dispatch = useDispatch()

    const onBlinkChange = async (checked) => {
        dispatch(setBlink(checked))
        await dispatch(saveBlink(checked))
    }

    return (
        <Form>
            <Form.Label>Blink</Form.Label><br/>
            <BootstrapSwitchButton
                checked={blink}
                onlabel='On'
                offlabel='Off'
                onChange={onBlinkChange}
            />
        </Form>
    )
}