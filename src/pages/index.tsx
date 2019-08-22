import React from "react";
import { Link, graphql } from "gatsby";
const kebabCase = string => string.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).map(x => x.toLowerCase()).join('-');
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
      <ul><li><Link to={'/'}>Home</Link></li><li><Link to={'about'}>About</Link></li></ul>
      <ul>
        {posts.map((post, i) => {
          const {
            node: {
              frontmatter: { title, date },
              excerpt,
            }
          } = post;
          return (
            <li key={i}>
              <h3>
                <Link to={'blog/' + kebabCase(title)}>{title}</Link>
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`;