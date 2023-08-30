import { Button, Row, Row as Row_Component, Spacer } from "@nextui-org/react";
import { Modal, Text, Card } from "@nextui-org/react";
import { useCallback, useEffect, useReducer, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { I_SolutionTableModel, PhasesData } from "../../../utils/db/interfaces";
import EditPhasingDragAndDrop from "./edit-phasing";
import { useDispatch } from "react-redux";
const dragReducer = (state, action) => {
  return state;
};

export default function EditPhasing(props: {
  visible: boolean;
  setVisible: any;
  data?: I_SolutionTableModel;
  setData: (data: I_SolutionTableModel) => void;
  phaseData;
  phases;
}) {
  let { visible, setVisible, data, setData, phaseData, phases } = props;
  const handler = () => setVisible(true);
  let [_phases, _setPhases] = useState(phases);
  let [_phaseData, _setPhaseData] = useState(phaseData);

  useEffect(() => {
    _setPhases(phases);
    _setPhaseData(phaseData);
  }, [phases, phaseData]);
  useEffect(() => {
    _setPhases(phases);
    _setPhaseData(phaseData);
  }, []);
  return (
    <Row_Component justify="flex-end">
      <EditPhaseModal
        setData={setData}
        data={data}
        visible={visible}
        setVisible={setVisible}
        phaseData={_phaseData}
        phases={_phases}
        setPhases={_setPhases}
        setPhaseData={_setPhaseData}
      />
      <Button color="secondary" ghost onPress={handler}>
        Edit Phasing
      </Button>
    </Row_Component>
  );
}

export function EditPhaseModal(props: {
  phaseData: PhasesData[];
  phases;
  setVisible: (val: boolean) => void;
  visible: boolean;
  data: I_SolutionTableModel;
  setData: (data: I_SolutionTableModel) => void;
  setPhases;
  setPhaseData;
}) {
  let { setVisible, visible, data, setData, phaseData, phases } = props;
  const [newPhase, setNewPhase] = useState("");
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const [_phases, setPhases] = useState(phases);
  const [_phaseData, setPhasesData] = useState(phaseData);
  useEffect(() => {
    setNewPhase("");
    setIndex(0);
  }, [visible]);
  const closeHandler = () => {
    setVisible(false);
  };
  useEffect(() => {
    setPhases(phases);
  }, [visible]);
  useEffect(() => {
    setIndex(0);
    setNewPhase("");
  }, [JSON.stringify(data)]);
  return (
    <div>
      <Modal
        scroll
        noPadding
        open={visible}
        onClose={closeHandler}
        width={`${Math.max(phases?.length, 2) * 200 + 50}px`}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Modal.Header>
          <Card
            onClick={() => setIndex(0)}
            isPressable
            isHoverable
            style={{ backgroundColor: index == 0 ? "Highlight" : "Background" }}
            variant="bordered"
            css={{ mw: "350px", borderRadius: "0", width: "50vw" }}
          >
            <Card.Body>
              <Row justify="center">Edit</Row>
            </Card.Body>
          </Card>

          <Card
            onClick={() => setIndex(1)}
            isPressable
            style={{ backgroundColor: index == 1 ? "Highlight" : "Background" }}
            isHoverable
            variant="bordered"
            css={{ mw: "400px", borderRadius: "0", width: "50vw" }}
          >
            <Card.Body>
              <Row justify="center">Create</Row>
            </Card.Body>
          </Card>
        </Modal.Header>
        <Modal.Body>
          <Row_Component justify="center">
            <EditPhasingDragAndDrop
              newPhase={newPhase}
              phaseData={_phaseData}
              phases={_phases}
              setNewPhase={setNewPhase}
              index={index}
              data={data}
            />
          </Row_Component>
        </Modal.Body>
        <Modal.Footer>
          <Button auto light color="error" onPress={() => setVisible(false)}>
            Close
          </Button>
          <Button
            auto
            disabled={index == 1 && newPhase.length == 0}
            onPress={async () => {
              if (index == 0) {
                // save phasing
                props.setPhases(_phases);
                setVisible(false);
              } else {
                await setData({
                  ...data,
                  phases: {
                    list: [..._phases, { name: newPhase }],
                    data: _phaseData,
                  },
                });
                setPhases([
                  ..._phases.filter((e) => e.name != newPhase),
                  { name: newPhase },
                ]);
              }
            }}
          >
            {index == 0 ? "Save" : "Create New"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
