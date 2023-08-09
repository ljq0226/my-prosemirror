import { MarkType } from "prosemirror-model";
import { Command, TextSelection } from "prosemirror-state";
import { markApplies } from "./markApplies";

/**
 * https://github.com/ProseMirror/prosemirror-commands/blob/1.3.1/src/commands.ts#L505-L538
 */
export const removeMark = (markType: MarkType): Command => {
  return (state, dispatch) => {
    const { empty, $cursor, ranges } = state.selection as TextSelection;
    if ((empty && !$cursor) || !markApplies(state.doc, ranges, markType))
      return false;

    if (dispatch) {
      if ($cursor) {
        dispatch(state.tr.removeStoredMark(markType));
      } else {
        let tr = state.tr;
        for (let i = 0; i < ranges.length; i++) {
          const { $from, $to } = ranges[i];
          tr = tr.removeMark($from.pos, $to.pos, markType);
        }
        dispatch(tr.scrollIntoView());
      }
    }
    return true;
  };
};
