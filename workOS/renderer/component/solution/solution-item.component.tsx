import { Grid, Card, Button, Row, Text } from "@nextui-org/react";
import React from "react";
import { I_SolutionsModel } from "../../utils/db/interfaces";
import { useRouter } from "next/router";

function SolutionItemComponent({
  solution,
  setIsModalOpen,
  setSolution,
}: {
    setSolution: any;
  solution: I_SolutionsModel;
  setIsModalOpen: any;
}) {
  const router = useRouter();
  return (
    <>
      <Grid style={{ padding: "0px" }}>
        <Card
          variant="shadow"
          onClick={() =>
            router.push(`${router.asPath}/solution/${solution.id}`)
          }
          isPressable
          isHoverable
        >
          <Card.Header>
            <Text b>{solution.title || "Title"}</Text>
          </Card.Header>
          <Card.Divider />
          <Card.Body>
            <Text>
              {solution.overvew
                ? solution.overvew
                : `Some quick example text to build on the card title and make up the
                        bulk of the card's content.`}
            </Text>
          </Card.Body>
          <Card.Footer>
            <Row justify="flex-end">
              <Button
                color={"secondary"}
                ghost
                onPress={() => {
                  setIsModalOpen(true);
                  setSolution();
                }}
                size="sm"
              >
                Edit
              </Button>
            </Row>
          </Card.Footer>
        </Card>
      </Grid>
    </>
  );
}

export default SolutionItemComponent;
