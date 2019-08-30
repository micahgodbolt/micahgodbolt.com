import React from "react";

interface ILinkProps extends React.HTMLAttributes<HTMLElement> {}

export const Link = (props: ILinkProps) => {
  return <div {...props}> {props.children} </div>;
};
