import "./globals.css"; // ensure Tailwind loads

export const metadata = {
  title: "HomiFi – Apple-style Smart Home",
  description: "Seamless Apple-first smart home integration.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-gray-50 to-white min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
