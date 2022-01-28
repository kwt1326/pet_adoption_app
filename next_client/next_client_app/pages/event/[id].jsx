import { useQuery, gql } from "@apollo/client";
import Header from "../../components/Header/index";
import { withRouter } from "next/router";

const BANNER_CONTENT_QUERY = gql`
  query BannerContent($id: Float!) {
    getBannerContent(id: $id) {
      title
      detailContent
    }
  }
`;
function event({ router: { query } }) {
  const { loading, error, data } = useQuery(BANNER_CONTENT_QUERY, {
    variables: { id: parseFloat(query.id) },
  });
  if (loading) return "Loading...";
  if (error) return "Error";
  let bannerInfo = data.getBannerContent;

  return (
    <div>
      <Header children={bannerInfo.title} />
      <div>{bannerInfo.detailContent}</div>
    </div>
  );
}

export default withRouter(event);
