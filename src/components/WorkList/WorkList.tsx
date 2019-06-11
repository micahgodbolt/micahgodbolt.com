import React from "react";
import { Link, graphql } from "gatsby";

export interface IWorkItemProps {
  text: string;
  url?: string;
}

export interface IWorkListProps {
  items: IWorkItemProps[];
}

let WorkItems: JSX.Element[] = [];

export const WorkList = (props: IWorkListProps) => {
  props.items.forEach((v, i) => {
    WorkItems.push(<WorkItem {...v} key={i} />);
  });
  return <ul children={WorkItems} />;
};

const WorkItem = (props: IWorkItemProps) => {
  const { text, url } = props;
  if (url) {
    return (
      <li>
        <a href={url}>{text}</a>
      </li>
    );
  }
  return <li>{text}</li>;
};
