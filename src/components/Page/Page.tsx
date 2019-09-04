import React from 'react';
import { Nav } from '../Nav';
import { Footer } from '../Footer';
import '../../scss/root.scss';
import { MDXProvider } from '@mdx-js/react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import darkTheme from 'prism-react-renderer/themes/nightOwl';

export interface IPageProps extends React.HTMLAttributes<HTMLElement> {}

const HighlightHOC = p => {
  return (
    <Highlight {...defaultProps} theme={darkTheme} code={p.children} language="jsx">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div className={className} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </div>
      )}
    </Highlight>
  );
};

const HighlightInlineHOC = p => {
  return (
    <Highlight {...defaultProps} theme={darkTheme} code={p.children} language="jsx">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <code className={className} style={style}>
          {tokens.map((line, i) => (
            <span {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </span>
          ))}
        </code>
      )}
    </Highlight>
  );
};

export const Page = (props: IPageProps) => {
  return (
    <MDXProvider
      components={{
        code: HighlightHOC,
        inlineCode: HighlightInlineHOC
      }}
    >
      <div {...props}>
        <Nav />
        <main>{props.children}</main>
        <Footer />
      </div>
    </MDXProvider>
  );
};
