import React from 'react';

export interface IBlogPostProps {
  title: string;
  date: string;
  html: string;
}

export const BlogPost = (props: IBlogPostProps) => {
  const { title, date, html } = props;
  return (
    <article>
      <h1 className="post-title">{title}</h1>
      <span>{date}</span>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
};
