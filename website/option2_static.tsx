// OPCIÓN 2: Background estático ultra-minimalista
// Reemplaza todo el div del background por esto:

<div className="fixed inset-0 z-0">
  <div
    className="absolute inset-0"
    style={{
      background:
        theme === "dark"
          ? `
            radial-gradient(ellipse 150% 100% at 50% 0%, rgba(15, 15, 15, 1) 0%, rgba(0, 0, 0, 1) 50%),
            radial-gradient(ellipse 100% 100% at 20% 80%, rgba(59, 130, 246, 0.03) 0%, transparent 50%),
            radial-gradient(ellipse 100% 100% at 80% 20%, rgba(168, 85, 247, 0.02) 0%, transparent 50%),
            #000000
          `
          : `
            radial-gradient(ellipse 150% 100% at 50% 0%, rgba(250, 250, 250, 1) 0%, rgba(255, 255, 255, 1) 50%),
            radial-gradient(ellipse 100% 100% at 20% 80%, rgba(59, 130, 246, 0.015) 0%, transparent 50%),
            radial-gradient(ellipse 100% 100% at 80% 20%, rgba(168, 85, 247, 0.01) 0%, transparent 50%),
            #ffffff
          `,
    }}
  />
</div>;
