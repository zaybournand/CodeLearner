import ws from 'k6/ws';
import http from 'k6/http';
import { check } from 'k6';

export const options = {
  stages: [
    { duration: '15s', target: 200 },  
    { duration: '30s', target: 1000 },
    { duration: '20s', target: 1000 }, 
    { duration: '10s', target: 0 },   
  ],
};

export default function () {
  const BASE_URL = 'http://localhost:8080';
  
  const WS_URL = 'ws://localhost:8080/ws/websocket'; 

  const loginRes = http.post(`${BASE_URL}/api/v1/auth/login`, JSON.stringify({
    email: 'test@gmail.com',
    password: 'password123',
  }), { headers: { 'Content-Type': 'application/json' } });

  check(loginRes, { 'logged in successfully': (r) => r.status === 200 });

  const wsParams = {
    headers: {
      'Cookie': loginRes.headers['Set-Cookie'] || ''
    }
  };

  const res = ws.connect(WS_URL, wsParams, function (socket) {
    
    
    socket.on('open', function () {
      socket.send("CONNECT\naccept-version:1.1,1.0\n\n\0");
    });


    socket.on('message', function (msg) {
      
     
      if (msg.includes('CONNECTED')) {
        
        const subscribeFrame = "SUBSCRIBE\nid:sub-0\ndestination:/topic/public\n\n\0";
        socket.send(subscribeFrame);

 
        const chatPayload = JSON.stringify({
          sender: 'testuser',
          content: 'Hello from k6 load test!',
          type: 'CHAT'
        });
        
        const sendFrame = `SEND\ndestination:/app/chat.sendMessage\ncontent-type:application/json\n\n${chatPayload}\0`;
        socket.send(sendFrame);
      }
    });

    socket.setTimeout(function () {
      socket.close();
    }, 10000);
  });

  check(res, { 'websocket upgraded successfully': (r) => r && r.status === 101 });
}