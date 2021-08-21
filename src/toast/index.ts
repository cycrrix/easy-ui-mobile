import Toast from './Toast';

export default function toast(
  msg: string,
  duration: number = 1500,
  parent: Element | HTMLElement = document.body,
) {
  const t = new Toast(msg, parent);
  t.show();
  setTimeout(() => {
    t.hide();
  }, duration);
}
