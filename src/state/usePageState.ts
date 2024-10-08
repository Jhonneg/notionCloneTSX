import { NodeData, NodeType, Page } from "../utils/types";
import { arrayMove } from "@dnd-kit/sortable";
import { useSyncedState } from "./useSyncedState";
import { updatePage } from "../utils/updatePage";

export default function usePageState(initialState: Page) {
  const [page, setPage] = useSyncedState(initialState, updatePage);

  function addNode(node: NodeData, index: number) {
    setPage((draft) => {
      draft.nodes.splice(index, 0, node);
    });
  }

  function removeNodeByIndex(nodeIndex: number) {
    setPage((draft) => {
      draft.nodes.splice(nodeIndex, 1);
    });
  }

  function changeNodeValue(nodeIndex: number, value: string) {
    setPage((draft) => {
      draft.nodes[nodeIndex].value = value;
    });
  }

  function changeNodeType(nodeIndex: number, type: NodeType) {
    setPage((draft) => {
      draft.nodes[nodeIndex].type = type;
      draft.nodes[nodeIndex].value = "";
    });
  }

  function setNodes(nodes: NodeData[]) {
    setPage((draft) => {
      draft.nodes = nodes;
    });
  }

  function setTitle(title: string) {
    setPage((draft) => {
      draft.title = title;
    });
  }
  function setCoverImage(coverImage: string) {
    setPage((draft) => {
      draft.cover = coverImage;
    });
  }

  function reorderNodes(id1: string, id2: string) {
    setPage((draft) => {
      const index1 = draft.nodes.findIndex((node) => node.id === id1);
      const index2 = draft.nodes.findIndex((node) => node.id === id2);
      draft.nodes = arrayMove(draft.nodes, index1, index2);
    });
  }

  return {
    nodes: page.nodes,
    title: page.title,
    cover: page.cover,
    changeNodeType,
    changeNodeValue,
    addNode,
    removeNodeByIndex,
    setTitle,
    setCoverImage,
    setNodes,
    reorderNodes,
  };
}
