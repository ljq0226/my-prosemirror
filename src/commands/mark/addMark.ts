import { MarkType, Attrs } from "prosemirror-model";
import { Command, TextSelection } from "prosemirror-state";
import { markApplies } from "./markApplies";

/**
 * https://github.com/ProseMirror/prosemirror-commands/blob/1.3.1/src/commands.ts#L505-L538
 */
export const addMark = (
  markType: MarkType,
  attrs: Attrs | null = null
): Command => {
  return (state, dispatch) => {
    const { empty, $cursor, ranges } = state.selection as TextSelection;
    if ((empty && !$cursor) || !markApplies(state.doc, ranges, markType))
      return false;

    if (dispatch) {
      if ($cursor) {
        dispatch(state.tr.addStoredMark(markType.create(attrs)));
      } else {
        let tr = state.tr;
        for (let i = 0; i < ranges.length; i++) {
          const { $from, $to } = ranges[i];
          let from = $from.pos,
            to = $to.pos
           const start = $from.nodeAfter,
            end = $to.nodeBefore;
          const spaceStart =
            start && start.isText ? /^\s*/.exec(start.text!)![0].length : 0;
          const spaceEnd =
            end && end.isText ? /\s*$/.exec(end.text!)![0].length : 0;
          if (from + spaceStart < to) {
            from += spaceStart;
            to -= spaceEnd;
          }
          tr = tr.addMark(from, to, markType.create(attrs));
        }
        dispatch(tr.scrollIntoView());
      }
    }
    return true;
  };
};
