export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>Client Header</div>
      {children}
      <div>Footer</div>
    </div>
  );
}
