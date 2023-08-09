import { FC } from "react";
import { EditorState } from "prosemirror-state";

export type MenuItemLinkProps = {
  editorState: EditorState;
  onSetLink: (url: string) => void;
};

export const MenuItemLink: FC<MenuItemLinkProps> = (props) => {
  return (
    <button
      onClick={() => {
        const url = window.prompt("URL");
        if (url) {
          props.onSetLink(url);
        }
      }}
    >
      link
    </button>
  );
};
