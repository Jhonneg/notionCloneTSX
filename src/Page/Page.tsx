import { useState } from "react";
import { NodeData } from "../utils/types";
import useFocusedNodeIndex from "./useFocusedNodeIndex";
import Cover from "./Cover";
import Spacer from "./Spacer";
import { Title } from "./Title";
import BasicNode from "../Node/BasicNode";
import { nanoid } from "nanoid";

export default function Page() {
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [title, setTitle] = useState("Default Title");
  const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({
    nodes,
  });

  function addNode(node: NodeData, index: number) {
    const newNodes = [...nodes];
    newNodes.splice(index, 0, node);
    setNodes(newNodes);
  }

  function removeNodeByIndex(index: number) {
    const newNodes = [...nodes];
    newNodes.splice(index, 1);
    setNodes(newNodes);
  }

  function changeNodeValue(index: number, value: string) {
    const newNodes = [...nodes];
    newNodes[index].value = value;
    setNodes(newNodes);
  }

  return (
    <>
      <Cover />
      <div>
        <Title addNode={addNode} title={title} changePageTitle={setTitle} />
        {nodes.map((node, index) => (
          <BasicNode
            key={node.id}
            node={node}
            isFocused={focusedNodeIndex === index}
            updateFocusedIndex={setFocusedNodeIndex}
            index={index}
            addNode={addNode}
            removeNodeByIndex={removeNodeByIndex}
            changeNodeValue={changeNodeValue}
          />
        ))}
        <Spacer
          showHint={!nodes.length}
          handleClick={() => {
            addNode({ type: "text", value: "", id: nanoid() }, nodes.length);
          }}
        />
      </div>
    </>
  );
}
