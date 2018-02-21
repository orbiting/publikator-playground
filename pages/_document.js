import Document, {
  Head,
  Main,
  NextScript
} from 'next/document'
import { fontFaces } from '@project-r/styleguide'
import { renderStatic } from 'glamor/server'

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const page = renderPage()
    const styles = renderStatic(() => page.html)
    return {
      ...page,
      ...styles
    }
  }
  constructor(props) {
    super(props)
    const { __NEXT_DATA__, env } = props
    if (typeof window !== 'undefined') {
      window.__NEXT_DATA__.env = env
    }
  }
  render() {
    const { css } = this.props
    return (
      <html>
        <Head>
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1"
          />
          <meta
            httpEquiv="X-UA-Compatible"
            content="IE=edge"
          />
          {css ? (
            <style
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ) : null}
          <style
            dangerouslySetInnerHTML={{
              __html: fontFaces()
            }}
          />
          <meta name="author" content="Republik" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
