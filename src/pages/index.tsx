import React from 'react';
import { Link, graphql } from 'gatsby';
import { BlogTeaser } from '../components/BlogTeaser';
import { Page } from '../components/Page';
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
          fields: {
            slug: string;
          };
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
    <Page>
      <ul style={{ padding: 0, listStyle: 'none' }}>
        {posts.map((post, i) => {
          const {
            node: {
              fields: { slug },
              frontmatter: { title, date },
              excerpt
            }
          } = post;

          return (
            <li key={i}>
              <BlogTeaser {...{ slug, title, date, excerpt }} />
            </li>
          );
        })}
      </ul>
    </Page>
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
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`;
