import React from 'react';
import { Nav } from '../Nav';
import { Footer } from '../Footer';
import '../../scss/root.scss';
import { MDXProvider } from '@mdx-js/react';
import Highlight, { defaultProps } from 'prism-react-renderer';

export interface IPageProps extends React.HTMLAttributes<HTMLElement> {}

const HighlightHOC = p => {
  return (
    <Highlight {...defaultProps} code={p.children} language="jsx">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

const HighlightInlineHOC = p => {
  return (
    <Highlight {...defaultProps} code={p.children} language="jsx">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <span className={className} style={style}>
          {tokens.map((line, i) => (
            <span {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </span>
          ))}
        </span>
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
