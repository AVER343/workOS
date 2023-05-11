import React from 'react'
import ScaleWrapper from '../wrapper/scale'
import { v4 as uuidv4 } from 'uuid';
import { Card, Col, Row, Button, Text } from '@nextui-org/react';
import { I_ProjectModel } from '../../utils/db/interfaces';
function ProjectComponent(props: { project: I_ProjectModel }) {
    return (
        <Card isPressable isHoverable css={{ w: "250px", h: "350px" }}>
            <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                <Col>
                    <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                        New
                    </Text>
                    <Text h3 color="black">
                        Acme camera
                    </Text>
                </Col>
            </Card.Header>
            <Card.Body css={{ p: 0 }}>
                <Card.Image
                    src="https://nextui.org/images/card-example-6.jpeg"
                    width="100%"
                    height="100%"
                    objectFit="cover"
                    alt="Card example background"
                />
            </Card.Body>
            <Card.Footer
                isBlurred
                css={{
                    position: "absolute",
                    bgBlur: "#ffffff66",
                    borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                    bottom: 0,
                    zIndex: 1,
                }}
            >
                <Row>
                    <Col>
                        <Text color="#000" size={12}>
                            Available soon.
                        </Text>
                        <Text color="#000" size={12}>
                            Get notified.
                        </Text>
                    </Col>
                    <Col>
                        {/* <Row justify="flex-end">
                                <Button flat auto rounded color="secondary">
                                    <Text
                                        css={{ color: "inherit" }}
                                        size={12}
                                        weight="bold"
                                        transform="uppercase"
                                    >
                                        Notify Me
                                    </Text>
                                </Button>
                            </Row> */}
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
    )
}

export default ProjectComponent
