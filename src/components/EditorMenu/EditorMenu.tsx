import { FC } from "react";
import { EditorView } from "prosemirror-view";
import { toggleMark } from "prosemirror-commands";
import { schema } from "../../schema";
import { isActiveMark } from "./isActiveMark";
import {
  MenuItemFontSize,
} from "./MenuItem";
import { addMark, removeMark } from "../../commands";

export type EditorMenuProps = {
  editorView: EditorView;
};

export const EditorMenu: FC<EditorMenuProps> = ({editorView}) => {
  return (
    <div className="border">
      <button
        className="w-6 h-6 bg-[#efefef] border border-black"
        style={{
          fontWeight: isActiveMark(
            editorView.state,
            schema.marks.underline
          )
            ? "bold"
            : undefined
        }}
        onClick={() => {
          toggleMark(schema.marks.underline)(
            editorView.state,
            editorView.dispatch,
            editorView
          );
          editorView.focus();
        }}
      >
        U
      </button>
      <MenuItemFontSize
        editorState={editorView.state}
        onSetFontSize={(fontSize) => {
          addMark(schema.marks.size, { fontSize })(
            editorView.state,
            editorView.dispatch,
            editorView
          );
          editorView.focus();
        }}
        onResetFontSize={() => {
          removeMark(schema.marks.size)(
            editorView.state,
            editorView.dispatch,
            editorView
          );
          editorView.focus();
        }}
      />
    </div>
  );
};
