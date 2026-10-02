import ParagraphDecoration from "./ParagraphDecoration";

interface PageHeaderProps {
  title: string;
}

export default function PageHeader({ title }: PageHeaderProps) {
  return (
    <header>
      <h1>{title}</h1>
      <ParagraphDecoration />
    </header>
  );
}
