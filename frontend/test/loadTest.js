import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
      { duration: '25s', target: 500 }, 
      { duration: '30s', target: 1000 }, 
      { duration: '20s', target: 1000 }, 
      { duration: '10s', target: 0 },
    ],
  };
export default function () {
  const BASE_URL = 'http://localhost:8080';


  const loginPayload = JSON.stringify({
    email: 'test@gmail.com', 
    password: 'password123',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };


  const loginRes = http.post(`${BASE_URL}/api/v1/auth/login`, loginPayload, params);


  check(loginRes, {
    'logged in successfully': (r) => r.status === 200,
  });

  const chatRes = http.get(`${BASE_URL}/api/v1/chat/java`);

  check(chatRes, {
    'chat loaded successfully': (r) => r.status === 200,
    'response time is < 200ms': (r) => r.timings.duration < 200,
  });

  sleep(1);
}