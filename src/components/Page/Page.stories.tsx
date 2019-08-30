import React from "react";
import { storiesOf } from "@storybook/react";
import {Page} from './Page';

storiesOf(`Pages`, module).add(`default`, () => (
  <Page>Hello</Page>
));
