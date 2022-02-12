import { useQuery, gql } from "@apollo/client";
import styles from "./event.module.scss";
import Header from "../../components/Header/index";
import Link from "next/link";
const BANNER_QUERY = gql`
  query Banner {
    getBanners {
      content {
        title
        detailContent
      }
      thumbnailUri
      id
    }
  }
`;
export default function Event() {
  const { data } = useQuery(BANNER_QUERY);

  return (
    <div>
      <Header children={"이벤트"} />
      <div className={styles.container}>
        {data?.getBanners?.map((element) => {
          return (
            <Link
              href={{
                pathname: `event/${element.id}`,
                query: { id: element.id },
              }}
              key={element.id}
            >
              <div className={styles.bannerBox} key={element.id}>
                <img src={element.thumbnailUri} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
