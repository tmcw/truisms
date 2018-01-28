// ./pages/_document.js
import Document, { Head, Main, NextScript } from "next/document";
import flush from "styled-jsx/server";

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage();
    const styles = flush();
    return { html, head, errorHtml, chunks, styles };
  }

  render() {
    return (
      <html>
        <Head>
          <style>{`.futura { font-family: Futura; }`}</style>
          <link
            href="https://unpkg.com/tachyons@4.9.1/css/tachyons.min.css"
            rel="stylesheet"
          />
          <meta
            name="viewport"
            content="width=device-width; initial-scale=1; maximum-scale=1"
          />
        </Head>
        <body className="sans-serif bg-black white w-100">
          {this.props.customValue}
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
