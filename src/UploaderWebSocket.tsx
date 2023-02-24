import _ from 'lodash'
import Upload, { UploadProps } from "@winkgroup/react-upload/dist/Upload";
import React, { useEffect } from 'react';
import { Socket } from 'socket.io-client'

export interface UploaderWebSocketProps extends Omit<UploadProps, 'url' | 'uploader'> {
    socket: Socket
}

export default function UploaderWebSocket(props:UploaderWebSocketProps) {
    const simpleUploaderProps:UploadProps = {
        url: '',
        ...props
    }

    const socket = props.socket
    
    async function uploader(url: string, files: File[]) {
        const responses = await Promise.all(
            files.map( async file => socket.emitWithAck('upload', files[0]) )
        )
    }

    useEffect(() => {
        socket.on('connect', () => {
          console.log('connected')
        });
    
        socket.on('disconnect', () => {
            console.log('disconnected')
        });
    
        return () => {
          socket.off('connect');
          socket.off('disconnect');
        };
      }, []);

    return (
        <Upload
            { ...simpleUploaderProps }
            uploader={ uploader }
        />
    )
}