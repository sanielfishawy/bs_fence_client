import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import Button from 'react-bootstrap/Button'
import { clearErrors } from './fenceSlice'

export const Errors = (props) => {

    const errors = useSelector(state => state.fence.error)

    const dispatch = useDispatch()
    const handle_click = () => {
        dispatch(clearErrors())
    }

    return errors?.length > 0 && (
        <div className='mt-4'>
            <h2>Errors</h2>
            <ul className='mt-2 mb=2'>
                {errors.map((err, index) => ( <li key={index}>{err}</li> ))}
            </ul>
            <Button onClick={handle_click}>Clear Errors</Button>
        </div>
    )
}