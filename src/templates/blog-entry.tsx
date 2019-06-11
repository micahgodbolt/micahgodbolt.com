import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import { MDXRenderer } from "gatsby-mdx";

export const BlogEntry = (props: any) => {
  console.log(props.data.mdx);
  const post = props.data.mdx;
  const { previous, next } = props.pageContext;

  return (
    <div className="blog-post-container">
      <div className="blog-post">
        <MDXRenderer>{post.code.body}</MDXRenderer>
      </div>
    </div>
  );
};

export default BlogEntry;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    mdx(frontmatter: { path: { eq: $slug } }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
      code {
        body
      }
    }
  }
`;
