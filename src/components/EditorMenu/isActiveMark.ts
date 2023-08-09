import { EditorState } from "prosemirror-state";
import { TextSelection } from "prosemirror-state";
import { MarkType } from "prosemirror-model";

//用于检查编辑器状态中的选定文本是否具有指定的标记类型（markType）
export const isActiveMark = (state: EditorState, markType: MarkType) => {
  // 参考: https://github.com/ProseMirror/prosemirror-commands/blob/1.3.1/src/commands.ts#L510-L534
  if (state.selection instanceof TextSelection && state.selection.$cursor) {
     // 检查光标所在位置的标记是否属于指定的标记类型
    return markType.isInSet(
      state.storedMarks || state.selection.$cursor.marks()
    )
      ? true
      : false;
  }

  const { ranges } = state.selection;
  for (let i = 0; i < ranges.length; i++) {
     // 检查每个选区范围内的文本是否具有指定的标记类型
    if (
      state.doc.rangeHasMark(ranges[i].$from.pos, ranges[i].$to.pos, markType)
    ) {
      return true;
    }
  }
  return false;
};
