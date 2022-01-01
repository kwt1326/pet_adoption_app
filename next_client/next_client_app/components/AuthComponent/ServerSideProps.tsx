import { GetServerSidePropsContext } from "next";

// get API userinfo
const getUserInfo = async () => { return { count: 100 } }

export function AuthServerSideProps(callback?: Function) {
  return async (ctx: GetServerSidePropsContext) => {
    const userauth = await getUserInfo();
    const data = await callback(ctx);
    return {
      // basic getServerSideProps export props
      props: {
        auth: userauth,
        data: data || {},
      }
    }
  }
}