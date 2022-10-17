import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:1554');

export const useSocket = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      const engine = socket.io.engine;
      engine.on('message', message => {
        setMessage(message);
      });
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return { message };
};
