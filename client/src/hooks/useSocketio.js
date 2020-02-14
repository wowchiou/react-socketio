import socketio from 'socket.io-client';

const useSocketio = () => {
  const url = 'http://localhost:9000';
  const socket = socketio(url);
  return socket;
};

export default useSocketio;
