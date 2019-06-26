import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import { MDXRenderer } from "gatsby-mdx";

export const BlogEntry = (props: any) => {
  const post = props.data.contentfulPost;

  return (
    <div className="blog-post-container">
      <div className="blog-post">
        <MDXRenderer>{post.text.childMdx.code.body}</MDXRenderer>
      </div>
    </div>
  );
};

export default BlogEntry;

export const pageQuery = graphql`
  query ContentfulPostById($id: String!) {
    contentfulPost(id: { eq: $id }) {
      text {
        childMdx {
          code {
            body
          }
        }
      }
      title
    }
  }
`;
