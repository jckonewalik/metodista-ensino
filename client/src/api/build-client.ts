import axios from 'axios';
import { GetServerSidePropsContext } from 'next';

interface Props {
  ctx?: GetServerSidePropsContext<any>;
}
const buildClient = ({ ctx }: Props) => {
  if (typeof window === 'undefined') {
    return axios.create({
      baseURL: process.env.INTERNAL_API_URL,
      //@ts-ignore
      headers: ctx.req.headers,
    });
  } else {
    return axios.create({
      baseURL: process.env.EXTERNAL_API_URL,
    });
  }
};

export default buildClient;
