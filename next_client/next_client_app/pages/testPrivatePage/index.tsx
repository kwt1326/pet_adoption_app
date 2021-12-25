import React from "react"
import HeadComponent from "../../components/Head";
import PrivateComponent from "../../components/AuthComponent/PrivateComponent"
import { AuthServerSideProps } from "../../components/AuthComponent/ServerSideProps";

const TestPrivatePage = (props: { auth: any, data: { count: number } }) => {
  return (
    <div>
      <HeadComponent title={"Test Private Page"} />
      <div>비공개 페이지 테스트</div>
      <div>{`카운트:ㅣ${props.auth.count}`}</div>
      <div>{`빈 데이터:ㅣ${props.data?.count}`}</div>
    </div>
  )
}

export const getServerSideProps = AuthServerSideProps(() => console.info('pre-fetching 콜백 함수 호출 (데이터 서버 요청)'));

export default PrivateComponent(TestPrivatePage)