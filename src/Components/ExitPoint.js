import React from 'react'
import { Card, Col, Row, Button, CardBody, Label } from 'reactstrap';
import Form from './Form/Form';

function ExitPoint(props) {
    return (
        <Card>
            <CardBody>
                <Row>
                    <>
                        <Form setPointData={props.setExitPointData}
                            pointData={props.exitPointData}
                            interChangePoints={props.interChangePoints} />
                    </>
                    <Col sm='6'>
                        <Row>
                            <Label>Break Down of cost:</Label>
                            <Col sm='6'>Base Rate:</Col>
                            <Col sm='6'>{props.fareCalculation.BaseRate}</Col>
                            <Col sm='6'>Distance Cost Breakdown:</Col>
                            <Col sm='6'>{props.fareCalculation.DistanceCostBreakdown}</Col>
                            <Col sm='6'>Sub-Total:</Col>
                            <Col sm='6'>{props.fareCalculation.SubTotal}</Col>
                            <Col sm='6'>Discount/Other:</Col>
                            <Col sm='6'>{props.fareCalculation.Discount}%</Col>
                            <Col sm='6'>TOTAL TO BE CHARGED:</Col>
                            <Col sm='6'>{props.fareCalculation.Total}</Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={e => props.calculate(e)} style={{ backgroundColor: 'green' }}>Calculate</Button></Col>
                </Row>
            </CardBody>
        </Card>
    )
}

export default ExitPoint