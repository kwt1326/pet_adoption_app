import { useQuery, gql } from "@apollo/client";
import styles from "./event.module.scss";
import Header from "../../components/Header/index";

export default function Event() {
  const BANNER_QUERY = gql`
    query Banner {
      getBanners {
        content {
          title
          detailContent
        }
        thumbnailUri
      }
    }
  `;
  const { data } = useQuery(BANNER_QUERY);
  console.log(data);
  return (
    <div>
      <Header children={"이벤트"} />
      <div className={styles.container}>
        {data?.getBanners?.map((element) => {
          return (
            <div className={styles.bannerBox}>
              <img src={element.thumbnailUri} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
