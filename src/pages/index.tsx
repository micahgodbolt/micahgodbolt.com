import React from "react";
import { Link, graphql } from "gatsby";

interface IIndexProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
    allMarkdownRemark: {
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
  const posts = data.allMarkdownRemark.edges;
  return (
    <div>
      <h1>Welcome to {data.site.siteMetadata.title}</h1>
      <ul>
        {posts.map((post, i) => {
          const { node } = post;
          const title = node.frontmatter.title;
          return (
            <li key={i}>
              <h3>
                <Link to={node.frontmatter.path}>{node.frontmatter.title}</Link>
              </h3>
              <small>{node.frontmatter.date}</small>
              <p> {node.excerpt} </p>
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
