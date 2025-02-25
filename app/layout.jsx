import "./globals.css";
import "./_customCSS/DateTimePicker.css";
import "./_customCSS/Calendar.css";
import "react-tooltip/dist/react-tooltip.css";
import ToolTipInitializer from "./_components/ToolTipInitializer";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "Manager",
  description: "No Description Yet",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <StoreInitializer isLoggedIn={!!(await cookies()).get(cookieName)} /> */}
      <body className="h-screen w-full bg-primary  bg-[radial-gradient(#4B4F58aa_1px,transparent_1px)] bg-[size:1rem_1rem] text-foreground">
        <ToolTipInitializer />
        <ToastContainer
          theme="dark"
          autoClose={2000}
          position="top-left"
          toastClassName={"bg-input_prefix_bg"}
          progressClassName={"bg-accent"}
        />

        {children}
      </body>
    </html>
  );
}
