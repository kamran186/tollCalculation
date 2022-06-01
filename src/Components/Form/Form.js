import React from 'react'
import { Col, Input, FormGroup } from "reactstrap";


function Form(props) {
    return (
        <>
            <Col sm="6">
                <FormGroup>
                    <Input id="EntryPoint" type="select" value={props.pointData.Interchange}
                        onChange={e => {
                            props.setPointData({
                                ...props.pointData,
                                Interchange: e.target.value
                            })
                        }}
                        placeholder="InterChange (Default)" >
                        {
                            props.interChangePoints.map((opt, index) => {
                                return (
                                    <option key={index} value={opt.value}>
                                        {opt.label}
                                    </option>
                                )
                            })
                        }

                    </Input>
                </FormGroup>
                <FormGroup>
                    <Input placeholder="Number-Plate"
                        onChange={e => props.setPointData({
                            ...props.pointData,
                            NumberPlate: e.target.value
                        })} />
                </FormGroup>
                <FormGroup>
                    <Input value={props.pointData.Date}
                        onChange={e => props.setPointData({
                            ...props.pointData,
                            Date: e.target.value
                        })} placeholder="Date Time" />
                </FormGroup>
            </Col>
        </>
    )
}

export default Form