import "./globals.css";
import StoreInitializer from "./_components/StoreInitializer";
import { cookies } from "next/headers";
import "./_customCSS/DateTimePicker.css";
import "./_customCSS/Calendar.css";

export const metadata = {
  title: "Manager",
  description: "No Description Yet",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <StoreInitializer isLoggedIn={!!cookies().get("authToken")} />

      <body>{children}</body>
    </html>
  );
}
