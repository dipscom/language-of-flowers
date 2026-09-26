export default function ResetScroller(el: string): void {
  const target = document.querySelector<HTMLElement>("#" + el + " > div");
  if (target) target.scrollTop = 0;
}
