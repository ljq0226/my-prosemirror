import { MarkType } from "prosemirror-model";
import { EditorState, TextSelection } from "prosemirror-state";

export const getSelectionMark = (state: EditorState, markType: MarkType) => {
  // 参考: https://github.com/ProseMirror/prosemirror-commands/blob/1.3.1/src/commands.ts#L510-L534
  if (state.selection instanceof TextSelection && state.selection.$cursor) {
    return markType.isInSet(
      state.storedMarks || state.selection.$cursor.marks()
    );
  }

  const { $from } = state.selection;
  return $from.nodeAfter ? markType.isInSet($from.nodeAfter.marks) : undefined;
};
