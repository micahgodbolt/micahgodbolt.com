import React from "react";
import { storiesOf } from "@storybook/react";
import {Button} from './Button';

storiesOf(`Buttons`, module).add(`default`, () => (
  <Button>Hello</Button>
));
