import React from 'react';
import { Nav } from '../Nav';
import { Footer } from '../Footer';
import '../../scss/root.scss';

export interface IPageProps extends React.HTMLAttributes<HTMLElement> {}

export const Page = (props: IPageProps) => {
  return (
    <div {...props}>
      <Nav />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
};
