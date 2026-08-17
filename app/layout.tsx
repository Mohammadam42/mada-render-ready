import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "مَدى | مكتبة الطلاب الرقمية",
  description: "مكتبة عربية رقمية واضحة وسهلة للطلاب من الصف الأول حتى التوجيهي، تضم كتبًا مجانية موثوقة في القصة والأدب والتاريخ والعلوم.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
