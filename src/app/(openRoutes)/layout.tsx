const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="h-[100px]"></div>

      <main className="min-h-[calc(100vh-200px)] container mx-auto">
        {" "}
        {children}
      </main>

    </div>
  );
};

export default CommonLayout;
