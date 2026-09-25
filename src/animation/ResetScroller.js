export default function ResetScroller(el) {
  const target = document.querySelector("#" + el + " > div");
  if (target) target.scrollTop = 0;
}
