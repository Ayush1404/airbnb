import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";
import ToastProvider from "./providers/ToastProvider";
import LoginModal from "./components/modals/LoginModal";
import { getCurrentUser } from "./actions/getCurrentUser";
import RentModal from "./components/modals/RentModal";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser= await getCurrentUser()
  return (
    <html lang="en"> 
      <body className={nunito.className}>
      
        <LoginModal />
        <RegisterModal />
        <RentModal />
        <Navbar currentUser={currentUser}/>
        <ToastProvider />
      
      <div className="pb-20 pt-28">
        {children}
      </div>
      </body>
    </html>
  );
}
