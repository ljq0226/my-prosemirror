import { FC, useMemo } from "react";
import { EditorState } from "prosemirror-state";
import { getSelectionNode } from "../getSelectionNode";
import { schema } from "../../../schema";

export type MenuItemTextAlignProps = {
  editorState: EditorState;
  onSetTextAlign: (textAlign: string) => void;
};

const ALIGN_LIST = ["left", "center", "right"];

export const MenuItemTextAlign: FC<MenuItemTextAlignProps> = (props) => {
  const align = useMemo(() => {
    const node = getSelectionNode(props.editorState, schema.nodes.paragraph);
    return node ? node.attrs.align : "left";
  }, [props.editorState]);

  return (
    <select
      value={align}
      onChange={(event) => {
        props.onSetTextAlign(event.currentTarget.value);
      }}
    >
      {ALIGN_LIST.map((ALIGN) => (
        <option key={ALIGN} value={ALIGN}>
          {ALIGN}
        </option>
      ))}
    </select>
  );
};
