import React from "react";
import { storiesOf } from "@storybook/react";
import {Nav} from './Nav';

storiesOf(`Navs`, module).add(`default`, () => (
  <Nav>Hello</Nav>
));
