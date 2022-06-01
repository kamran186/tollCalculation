import React from 'react'
import { Card, Col, Row, Button, CardBody } from 'reactstrap';
import axios from 'axios';
import Form from './Form/Form';

function EntryPoint(props) {
    return (
        <Card>
            <CardBody>
                <>
                    <Form setPointData={props.setEntryPointData}
                        interChangePoints={props.interChangePoints}
                        pointData={props.entryPointData} />
                </>
                <Row>
                    <Col>
                        <Button onClick={e => {
                            axios.post('https://crudcrud.com/api/0de6f86092554f1a984f644dc24fb0f5/trips', JSON.stringify(props.entryPointData)
                            ).then(res => {
                                console.log(res)
                                console.log('Success')
                            }).catch(err => {
                                console.log(err.message)
                                props.setSubmitResponse("Data is saved locally but API is not working: " + err.message)
                            })
                        }
                        } style={{ backgroundColor: 'green' }}>Submit (API is not working)</Button>
                    </Col>
                    <Col>{props.submitResponse}</Col>
                </Row>
            </CardBody>
        </Card>
    )
}

export default EntryPoint