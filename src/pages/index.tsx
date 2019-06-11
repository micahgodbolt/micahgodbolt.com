import React from "react";
import { Link, graphql } from "gatsby";

interface IIndexProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
    allMdx: {
      edges: {
        node: {
          excerpt: string;
          frontmatter: {
            date: string;
            title: string;
            path: string;
          };
        };
      }[];
    };
  };
}

export default (props: IIndexProps) => {
  const { data } = props;
  const posts = data.allMdx.edges;
  return (
    <div>
      <h1>Welcome to {data.site.siteMetadata.title}</h1>
      <ul><li><Link to={'/'}>Home</Link></li><li><Link to={'about'}>About</Link></li></ul>
      <ul>
        {posts.map((post, i) => {
          const {
            node: {
              frontmatter: { title, date, path },
              excerpt
            }
          } = post;
          return (
            <li key={i}>
              <h3>
                <Link to={path}>{title}</Link>
              </h3>
              <small>{date}</small>
              <p> {excerpt} </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            path
          }
        }
      }
    }
  }
`;
