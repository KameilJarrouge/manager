import "./globals.css";

export const metadata = {
  title: "Manager",
  description: "No Description Yet",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
