import React from 'react';
import {graphql} from 'gatsby';
import {BlogPost, IBlogPostProps} from '../components/BlogPost';
import { Nav } from '../components/Nav';

export default function Template({data}) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;

  const BlogPostProps: IBlogPostProps = {
    date: frontmatter.date,
    html: html,
    title: frontmatter.title
  }
  return (
    <div>
      <Nav />
      <BlogPost {...BlogPostProps} >hello </BlogPost>
    </div>
  );
}

export const pageQuery = graphql`
  query BlogPostByPath($title: String!) {
    markdownRemark(frontmatter: { title: { eq: $title } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
      }
    }
  }
`;