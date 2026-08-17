export default function PostLayout({
  children,
  comments,
}: {
  children: React.ReactNode;
  comments: React.ReactNode;
}) {
  return (
    <div>
      <div className="container mx-auto">
        {children}
      </div>
      <div className="container mx-auto">
        {comments}
      </div>
    </div>
  );
}
