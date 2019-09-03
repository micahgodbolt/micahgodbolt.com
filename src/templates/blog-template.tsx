import React from 'react';
import { graphql } from 'gatsby';
import { BlogPost, IBlogPostProps } from '../components/BlogPost';
import { Page } from '../components/Page';
import { Hood } from '../components/Hood';

export default function Template({ data }) {
  const { markdownRemark } = data;
  const { frontmatter, html, excerpt } = markdownRemark;

  const BlogPostProps: IBlogPostProps = {
    date: frontmatter.date,
    html: html,
    title: frontmatter.title
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
    markdownRemark(frontmatter: { title: { eq: $title } }) {
      excerpt
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
      }
    }
  }
`;
