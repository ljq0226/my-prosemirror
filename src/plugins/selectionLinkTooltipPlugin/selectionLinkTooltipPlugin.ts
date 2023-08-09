import { Plugin } from "prosemirror-state";
import { SelectionLinkTooltipView } from "./SelectionLinkTooltipView";

export const selectionLinkTooltipPlugin = () => {
  return new Plugin({
    view(editorView) {
      return new SelectionLinkTooltipView(editorView);
    }
  });
};
