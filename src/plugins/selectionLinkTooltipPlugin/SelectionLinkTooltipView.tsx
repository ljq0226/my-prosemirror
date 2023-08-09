import { createRoot } from "react-dom/client";
import { PluginView, EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { LinkTooltip } from "./LinkTooltip";

// 参考: https://prosemirror.net/examples/tooltip/
export class SelectionLinkTooltipView implements PluginView {
  private dom: HTMLElement;
  // 型が分からないので一旦any
  private reactRoot: any;

  constructor(view: EditorView) {
    this.dom = document.createElement("div");
    this.reactRoot = createRoot(this.dom);

    if (view.dom.parentNode) {
      view.dom.parentNode.appendChild(this.dom);
    }
  }

  update(view: EditorView, prevState: EditorState) {
    const state = view.state;
    // Don't do anything if the document/selection didn't change
    if (
      prevState &&
      prevState.doc.eq(state.doc) &&
      prevState.selection.eq(state.selection)
    ) {
      return;
    }

    if (this.dom.offsetParent == null) {
      return;
    }

    const box = this.dom.offsetParent.getBoundingClientRect();
    this.reactRoot.render(<LinkTooltip editorView={view} box={box} />);
  }

  destroy() {
    this.dom.remove();
    // 以下の警告が出てしまうのでワンサイクル置いてからunmountする
    // Attempted to synchronously unmount a root while React was already rendering.
    // React cannot finish unmounting the root until the current render has completed, which may lead to a race condition.
    // @see https://stackoverflow.com/questions/73459382/react-18-async-way-to-unmount-root
    setTimeout(() => {
      this.reactRoot.unmount();
    }, 0);
  }
}
