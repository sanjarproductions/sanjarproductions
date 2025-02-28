import "./globals.css";


export const metadata = {
  title: "Sanjar Productions",
  description: "Blog by Sanjar Productions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-X3YJFF994R`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-X3YJFF994R');
            `,
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
