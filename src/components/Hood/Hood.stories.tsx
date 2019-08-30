import React from "react";
import { storiesOf } from "@storybook/react";
import {Hood} from './Hood';

storiesOf(`Hoods`, module).add(`default`, () => (
  <Hood>Hello</Hood>
));
