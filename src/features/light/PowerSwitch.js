import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import Form from 'react-bootstrap/Form'
import {setPower, savePower} from './lightSlice'

export const PowerSwitch = () => {

    const power = useSelector(state => state.light.power)
    const dispatch = useDispatch()

    const onPowerChange = async (checked) => {
        dispatch(setPower(checked))
        await dispatch(savePower(checked))
    }

    return (
        <Form>
            <Form.Label>Power</Form.Label><br/>
            <BootstrapSwitchButton
                checked={power}
                onlabel='On'
                offlabel='Off'
                onChange={onPowerChange}
            />
        </Form>
    )
}
