import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { hideRisen, playRisen } from "./elementReveal";

gsap.registerPlugin(SplitText);

const WORD_STAGGER = 0.15;

// Fades a heading in word by word. `hide()` splits the heading and must run
// before it is shown; `play()` returns the timeline. The heading stays split
// afterwards: putting it back together would re-shape the text (kerning
// around the spaces changes) and make the letters jump sideways at the end.
export default function createHeadingReveal(heading: Element) {
  let split: SplitText | undefined;

  return {
    hide() {
      split = SplitText.create(heading, { type: "words", aria: "none" });
      hideRisen(split.words);
    },

    play: () => playRisen(split!.words, WORD_STAGGER),
  };
}
