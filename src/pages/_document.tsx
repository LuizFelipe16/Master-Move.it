// Equiparado ao index de public antes
// Main equiparado ao root
// Document porque assim o user vai ver e vai ser carregado apenas uma vez
// NextScripts são scripts do next

import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Como por favi: */}
          <link rel="shortcut icon" href="favicon.png" type="image/png"/>
          
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rajdhani:wght@600&family=Nunito:wght@200;300;400;600;700;800;900&display=swap" rel="stylesheet" />
        </Head>
        
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}