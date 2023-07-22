import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import {
  Col,
  Grid,
  Row,
  Spacer,
  Text,
  Card as CardComponent,
  Button,
  Input,
} from "@nextui-org/react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  I_SolutionTableModel,
  PhasesData,
} from "../../../../utils/db/interfaces";
const List = ({ listTitle, cards, moveCard }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "CARD",
    drop: (item: any) => moveCard(item.id, listTitle),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        border: "1px solid black",
        padding: "10px",
        background: isOver ? "#f0f0f0" : "white",
        minHeight: "100px",
        minWidth: "200px",
      }}
    >
      <h3>{listTitle}</h3>
      {cards
        .filter((card) => card.name.toLowerCase() === listTitle.toLowerCase())
        .map((card) => (
          <Card key={card.id} card={card} />
        ))}
    </div>
  );
};

const Card = ({ card }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { id: card.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  return (
    <div
      ref={drag}
      style={{
        border: "1px solid gray",
        padding: "5px",
        marginBottom: "5px",
        background: isDragging ? "#f0f0f0" : "white",
      }}
    >
      {card.week}
    </div>
  );
};
const EditPhasingDragAndDrop = ({
  data,
  index,
  newPhase,
  phaseData,
  phases,
  setNewPhase,
}: {
  data: I_SolutionTableModel;
  index: number;
  newPhase;
  phaseData;
  phases;
  setNewPhase;
}) => {
  const [cards, setCards] = React.useState<any[]>(phaseData || []);
  const [_phases, setPhases] = React.useState(phases);
  let ref_phases = useRef(null);
  let ref2 = useRef(null);
  const moveCard = (id, newphase) => {
    const updatedCards = cards.map((card) =>
      card.id === id ? { ...card, phase: newphase.toLowerCase() } : card
    );
    setCards(updatedCards);
  };
  useEffect(() => {
    setPhases(phases);
    ref_phases.current = phases;
  }, [phases]);
  useEffect(() => {
    setPhases(phases?.list?.map((phase) => phase.name));
    ref_phases.current = phases;
    ref2.current = phaseData;
    setCards(phaseData);
  }, []);
  return (
    <DndProvider backend={HTML5Backend}>
      <Spacer />
      <Row>
        {index == 0 && (
          <>
            {ref_phases && ref_phases?.current?.length == 0 && (
              <Col>
                <Spacer />
                <Spacer />
                <Row justify="center">
                  <Text> No phases to show </Text>
                </Row>
                <Spacer />
                <Spacer />
              </Col>
            )}
            {ref_phases &&
              ref_phases.current?.map((phase: PhasesData, index) => (
                <>
                  <List
                    key={index}
                    listTitle={phase.name}
                    cards={cards}
                    moveCard={moveCard}
                  />
                </>
              ))}
          </>
        )}
        {index == 1 && (
          <Col>
            <Spacer />
            <Spacer />
            <Row justify="center">
              <Input
                width="200px"
                bordered
                clearable
                labelPlaceholder="New Phase"
                initialValue=""
                value={newPhase}
                onChange={(e) => {
                  setNewPhase(e.target.value);
                }}
              />
            </Row>
            <Spacer />
            <Spacer />
          </Col>
        )}
      </Row>
    </DndProvider>
  );
};

export default EditPhasingDragAndDrop;
