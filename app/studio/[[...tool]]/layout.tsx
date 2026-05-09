// Studio gets its own full-screen layout — no nav or footer
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-screen">{children}</div>;
}
