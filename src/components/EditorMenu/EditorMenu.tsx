import { FC } from "react";
import { EditorView } from "prosemirror-view";
import { toggleMark, setBlockType } from "prosemirror-commands";
import { schema } from "../../schema";
import { isActiveMark } from "./isActiveMark";
import {
  MenuItemColor,
  MenuItemFontSize,
  MenuItemTextAlign,
  MenuItemLink
} from "./MenuItem";
import { addMark, removeMark } from "../../commands";

export type EditorMenuProps = {
  editorView: EditorView;
};

export const EditorMenu: FC<EditorMenuProps> = ({ editorView }) => {
  return (
    <div className="border">
      <button
        className="w-6 h-6 bg-[#efefef] border border-black"
        style={{
          fontWeight: isActiveMark(editorView.state, schema.marks.strong)
            ? "bold"
            : undefined
        }}
        onClick={() => {
          toggleMark(schema.marks.strong)(
            editorView.state,
            editorView.dispatch,
            editorView
          );
          editorView.focus();
        }}
      >
        B
      </button>
      <button
        className="w-6 h-6 bg-[#efefef] border border-black"
        style={{
          fontWeight: isActiveMark(editorView.state, schema.marks.em)
            ? "bold"
            : undefined
        }}
        onClick={() => {
          toggleMark(schema.marks.em)(
            editorView.state,
            editorView.dispatch,
            editorView
          );
          editorView.focus();
        }}
      >
        I
      </button>
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
      <MenuItemColor
        editorState={editorView.state}
        onSetColor={(color) => {
          addMark(schema.marks.color, { color })(
            editorView.state,
            editorView.dispatch,
            editorView
          );
          editorView.focus();
        }}
        onResetColor={() => {
          removeMark(schema.marks.color)(
            editorView.state,
            editorView.dispatch,
            editorView
          );
          editorView.focus();
        }}
      />
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
      <MenuItemTextAlign
        editorState={editorView.state}
        onSetTextAlign={(align) => {
          setBlockType(schema.nodes.paragraph, { align })(
            editorView.state,
            editorView.dispatch,
            editorView
          );
          editorView.focus();
        }}
      />
      <MenuItemLink
        editorState={editorView.state}
        onSetLink={(url) => {
          addMark(schema.marks.link, { href: url })(
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
