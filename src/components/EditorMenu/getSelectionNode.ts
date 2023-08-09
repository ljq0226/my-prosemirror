import { NodeType } from "prosemirror-model";
import { EditorState, TextSelection } from "prosemirror-state";

export const getSelectionNode = (state: EditorState, nodeType: NodeType) => {
  if (state.selection instanceof TextSelection && state.selection.$cursor) {
    const node = state.selection.$cursor.parent;
    if (node.type === nodeType) {
      return node;
    }
    return undefined;
  }

  const node = state.selection.$from.parent;
  return node.type === nodeType ? node : undefined;
};
