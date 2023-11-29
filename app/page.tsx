'use client';
import Script from "next/script";
import Container from "./components/Container";

export default function Home() {
  return (
    <main>
      <Script id="google-analytics">
        {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-W67MJ95D');
          `}
      </Script>
      <Container />
    </main>
  );
}
