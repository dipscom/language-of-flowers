interface ParagraphDecorationProps {
  reflected?: boolean;
}

export default function ParagraphDecoration({
  reflected,
}: ParagraphDecorationProps) {
  return (
    <svg
      className={
        reflected ? "doubleline-decoration reflected" : "doubleline-decoration"
      }
      viewBox="0 0 1400 40"
      preserveAspectRatio="xMidYMid"
    >
      <path
        className="segment"
        d="M0 0.5 H660 Q690 0.5, 700 20.5 Q710 0.5, 740 0.5 H1400"
      />
      <path
        className="segment"
        d="M0 8.5 H660 Q690 8.5, 700 28 Q710 8.5, 740 8.5 H1400"
      />
    </svg>
  );
}
