import { Table, useCollator, Container, useAsyncList, Button, Row, Spacer } from "@nextui-org/react";
import { I_MembersModel } from "../../../utils/db/interfaces";
import { useState } from "react";

export default function SelectMemberTableComponent({ members, addMemberFunc }: { addMemberFunc: any, members: I_MembersModel[] }) {
    const [key, setKey] = useState(null);
    return (
        <Container> <Table
            bordered={false}
            aria-label="Example static collection table"
            css={{
                overflow: 'scroll',
                height: "auto",
                minWidth: "100%",
                background: "inherit"
            }}
            selectionMode="single"
            selectedKeys={[key]}
            onSelectionChange={(props: any) => setKey(props.currentKey)}
        >
            <Table.Header>
                <Table.Column>NAME</Table.Column>
                <Table.Column>ROLE</Table.Column>
                <Table.Column>CTC</Table.Column>
            </Table.Header>
            <Table.Body>
                {members.map((member, index) => <Table.Row key={index}>
                    <Table.Cell>{member.name}</Table.Cell>
                    <Table.Cell>{member.role}</Table.Cell>
                    <Table.Cell>{member.ctc ?? 0}</Table.Cell>
                </Table.Row>)}
            </Table.Body>
        </Table>
            <Spacer />
            <Row justify="flex-end">
                <Button shadow={true} color={'success'} disabled={!key}
                    onClick={() => {
                        addMemberFunc(members[key]);
                    }}
                >Add</Button>
            </Row>
            <Spacer />
        </Container>
    );
}
