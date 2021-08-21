export default class Toast {
  private parent: HTMLElement | Element;
  private toastNode: HTMLElement;

  constructor(msg: string, parent: HTMLElement | Element) {
    this.parent = parent || document.body;
    this.toastNode = document.createElement('div');
    this.toastNode.className = 'easy-ui-toast';
    this.toastNode.innerText = msg;
  }

  public show() {
    this.parent.append(this.toastNode);
  }

  public hide() {
    this.toastNode.className = 'easy-ui-toast hidden';
    setTimeout(() => {
      this.parent.removeChild(this.toastNode);
    }, 300);
  }
}
