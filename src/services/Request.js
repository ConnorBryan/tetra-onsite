import axios from 'axios';
import { logout } from 'src/utils/Auth';

const axiosRequest = axios.create({
  baseURL: CONFIG.API_BASE_URL,
  timeout: 10000,
});

let userJwt: string | null = null;
export function setUserJwt(jwt: string | null) {
  userJwt = jwt;
}

type RequestArguments = {
  url: string,
  method?: string,
  data?: {},
  params?: {},
  token?: string,
};

export default function request(
  {
    url,
    method = 'get',
    data,
    params = {},
    token = userJwt || '',
  }: RequestArguments = {}
) {
  const headers = {};

  if (userJwt != null) {
    headers.Authorization = `JWT ${token}`;
  }

  return axiosRequest({
    url,
    method,
    data,
    params,
    headers,
  }).catch(e => {
    if (e.response && e.response.status === 403) logout();
    throw e;
  });
}
