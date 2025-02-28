import "./globals.css";
import "./_customCSS/DateTimePicker.css";
import "./_customCSS/Calendar.css";
import "react-tooltip/dist/react-tooltip.css";
import ToolTipInitializer from "./_components/ToolTipInitializer";
import { ToastContainer } from "react-toastify";
import UserSection from "./_sections/UserSection";
import SearchSection from "./_sections/SearchSection";
import NavigationSection from "./_sections/NavigationSection";

export const metadata = {
  title: "Manager",
  description: "No Description Yet",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <StoreInitializer isLoggedIn={!!(await cookies()).get(cookieName)} /> */}
      <body
        id="body"
        className="h-screen w-full bg-primary  bg-[radial-gradient(#4B4F58aa_1px,transparent_1px)] bg-[size:1rem_1rem] text-foreground"
      >
        <ToolTipInitializer />
        <ToastContainer
          theme="dark"
          autoClose={2000}
          position="top-left"
          toastClassName={"bg-input_prefix_bg"}
          progressClassName={"bg-accent"}
        />
        <div className="w-full h-full flex flex-col ">
          <div className="w-full flex flex-col h-fit  items-center justify-start">
            <UserSection />
            <SearchSection />
          </div>
          <div className="w-full flex h-full pt-4 2xl:pt-8 ">
            <NavigationSection />
            <div className="w-full h-full pl-2 pt-2">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
