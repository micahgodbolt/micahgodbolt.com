import React from 'react';

export interface IFooterProps extends React.HTMLAttributes<HTMLElement> {}

export const Footer = (props: IFooterProps) => {
  return (
    <footer>
      <h2>Follow Along:</h2>
      <nav>
        <ul>
          <li>
            <a href="http://www.twitter.com/micahgodbolt">Twitter</a>
          </li>
          <li>
            <a href="http://www.github.com/micahgodbolt/micahgodbolt.com">Github</a>
          </li>
          <li>
            <a href="https://library.micahgodbolt.com">Pattern Library</a>
          </li>
          <li>
            <a href="/rss.xml">RSS</a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};
