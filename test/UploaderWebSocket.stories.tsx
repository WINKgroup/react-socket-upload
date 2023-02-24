import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Uploader from '../src/UploaderWebSocket';
import { io } from 'socket.io-client';

const socket = io("http://127.0.0.1:8080/upload")

export default {
  title: 'Uploader',
  component: Uploader,
  parameters:{
    controls:{
        exclude:'socket'
    }
  }
} as ComponentMeta<typeof Uploader>;

const Template: ComponentStory<typeof Uploader> = (args) => <Uploader
  {...args}
  socket={ socket }
/>;

export const TestUpload = Template.bind({});
TestUpload.args = {
};
