import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast"; // <-- Import කරන්න

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Code Snippet Vault",
  description: "Your personal code library, built with Next.js.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Toaster එක මෙතනට දාන්න */}
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              background: '#334155', // bg-slate-700
              color: '#F1F5F9', // text-slate-100
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}