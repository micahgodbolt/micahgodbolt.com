import React from "react";
import { graphql } from "gatsby";
import { WorkList, IWorkListProps } from "./WorkList";

interface IAboutProps {
  data: {
    allAirtable: {
      edges: {
        node: {
          data: {
            Link: string;
            Name: string;
          };
        };
      }[];
    };
  };
}

export const WorkItems =  (props: IAboutProps) => {
  const { data } = props;
  const entries: IWorkListProps["items"] = data.allAirtable.edges.map(i => ({
    text: i.node.data.Name,
    url: i.node.data.Link
  }));
  return <WorkList items={entries} />;
};


