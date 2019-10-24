import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';

interface INavProps extends React.HTMLAttributes<HTMLElement> {}

export const Nav = (props: INavProps) => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const { ...rest } = props;
  return (
    <header {...rest}>
      <h1>
        <Link className="title" to="/">
          {data.site.siteMetadata.title}
        </Link>
      </h1>
      <nav>
        <ul>
          <li>
            <Link to={'about'}>About</Link>
          </li>
          <li>
            <a target="_blank" href={'http://fea.pub/'}>
              My Book
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
