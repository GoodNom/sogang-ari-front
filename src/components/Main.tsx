import React, { useEffect, useState } from "react";
import { ClubResType, LoginReqType, WishResType } from "../types";
import useAccessToken from "../hooks/useAccessToken";
import { Col, Container, Row } from "react-bootstrap";

import RightSideBar from "./RightSideBar";
import PageSideBar from "./PageSideBar";
import FilterClub from "./FilterClub";

import styles from "./Main.module.scss";
import ClubList from "./ClubList";

interface MainProps {
  wishs: WishResType[] | null;
  wish_error: Error | null;
  wish_loading: boolean;
  auth_error: Error | null;
  auth_loading: boolean;
  getWishs: () => void;
  deleteWish: (clubId: string) => void;
  addWish: (clubId: string) => void;
  logout: () => void;
  login: ({ userId, password }: LoginReqType) => void;
}

const Main: React.FC<MainProps> = ({
  wishs,
  wish_error,
  wish_loading,
  auth_error,
  auth_loading,
  getWishs,
  deleteWish,
  addWish,
  logout,
  login,
}) => {
  const token = useAccessToken();
  useEffect(() => {
    if (token) {
      getWishs();
    }
  }, [token, getWishs]);

  useEffect(() => {
    if (wish_error) {
      console.log(wish_error);
      // logout();
    }
  }, [wish_error, logout]);

  const [clubs, setClubs] = useState<ClubResType[]>([]);

  return (
    <>
      <Container fluid className={styles.main_container}>
        <Row>
          <Col className="col-3">
            <PageSideBar
              getWishs={getWishs}
              deleteWish={deleteWish}
            ></PageSideBar>
          </Col>
          <Col>
            <Container className={styles.logo_wrap}>
              <div>
                <div className={styles.logo}>SogangAri</div>
                <br />
                <img
                  className={styles.logo_img}
                  src="/images/sogang_ari_logo.png"
                  alt="logo"
                ></img>
              </div>
              <div className={styles.description}>
                Platform for club activities at
                <br />
                Sogang University
              </div>
            </Container>
            <Container>
              <FilterClub setClubs={setClubs} />
            </Container>
            <Container>
              <ClubList clubs={clubs}></ClubList>
            </Container>
          </Col>
          <Col className="col-3">
            <RightSideBar
              logout={logout}
              login={login}
              error={auth_error}
              loading={auth_loading}
            ></RightSideBar>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Main;
