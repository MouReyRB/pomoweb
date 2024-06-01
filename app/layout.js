import {Inter as FontSans} from 'next/font/google'
import './global.css'

import {ThemeProvider} from "@/components/theme-provider";
import {cn} from "@/lib/utils";

export const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})
export const metadata = {
    title: 'PomoWeb',
    description: 'PomoWeb',
}

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
        )}>
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
        >
            {children}
            {/*<ThemeSwitcher/>*/}
        </ThemeProvider>
        </body>
        </html>
    )
}
