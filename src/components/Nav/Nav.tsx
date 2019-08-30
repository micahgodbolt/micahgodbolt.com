import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";

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
  `)

  const {...rest} = props;
  return (
    <header {...rest}>
      <h1>{data.site.siteMetadata.title}</h1>
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"about"}>About</Link>
        </li>
        <li>
          <a href={"http://fea.pub/"}>Book</a>
        </li>
      </ul>
    </header>
  );
};
