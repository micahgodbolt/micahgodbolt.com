import React from 'react';
import { graphql } from 'gatsby';
import { BlogPost, IBlogPostProps } from '../components/BlogPost';
import { Page } from '../components/Page';
import { Hood } from '../components/Hood';

export default function Template({ data }) {
  const { mdx } = data;
  const { frontmatter, body, excerpt } = mdx;

  const BlogPostProps: IBlogPostProps = {
    date: frontmatter.date,
    title: frontmatter.title,
    body: body
  };

  return (
    <Page>
      <Hood title={frontmatter.title} description={excerpt} />
      <BlogPost {...BlogPostProps} />
    </Page>
  );
}

export const pageQuery = graphql`
  query BlogPostByPath($title: String!) {
    mdx(frontmatter: { title: { eq: $title } }) {
      excerpt
      body
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
      }
    }
  }
`;
