export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-transparent">
      {/* Floating NavBar (import in layout for global use) */}
      <div className="mb-24" />
      {/* Home Section Placeholder */}
      <main className="flex flex-col items-center justify-center gap-6 p-8 rounded-xl shadow-lg backdrop-blur-lg border border-white/20 bg-white/30 dark:border-black/20 dark:bg-black/30 transition-all">
        <h1 className="text-5xl font-baloo text-accent text-center mb-4">
          Home
        </h1>
        <p className="text-base text-center text-gray-700 dark:text-gray-300">
          This is the Home section.
          <br />
          You can start building your personal portfolio here.
        </p>
        <span className="text-xs text-gray-400 dark:text-gray-500 mt-2">
          (Placeholder content – update as needed)
        </span>
      </main>
    </div>
  );
}
