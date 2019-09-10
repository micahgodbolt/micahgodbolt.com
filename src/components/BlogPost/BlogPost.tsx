import React from 'react';
import './BlogPost.scss';
import { MDXRenderer } from 'gatsby-plugin-mdx';
export interface IBlogPostProps {
  title: string;
  date: string;
  body: string;
}

export const BlogPost = (props: IBlogPostProps) => {
  const { title, date, body } = props;
  return (
    <article className="BlogPost">
      <h1 className="post-title">{title}</h1>
      <p className="post-date">{date}</p>
      <MDXRenderer>{body}</MDXRenderer>
    </article>
  );
};
