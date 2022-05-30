import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { ClubResType } from "../types";
import ClubDetail from "./ClubDetail";
import styles from "./ClubList.module.scss";

interface ClubListProps {
  clubs: ClubResType[];
}

const ClubList: React.FC<ClubListProps> = ({ clubs }) => {
  const [isDetailFormShow, setDetailFormShow] = useState(false);

  const handleDetailFormShow = () => setDetailFormShow(true);
  const handleDetailFormClose = () => setDetailFormShow(false);

  const [selectedClub, setSelectedClub] = useState<ClubResType>();

  const showDetailForm = (club: ClubResType) => {
    setSelectedClub(club);
    handleDetailFormShow();
  };

  const clubContainer = (club: ClubResType) => {
    return (
      <>
        <div className={styles.club}>
          <Row className="row-cols-2">
            <Col>
              <Row>
                <Image
                  className={styles.logo}
                  src={`${process.env.REACT_APP_URL}/api/club/${club.id}/logo`}
                ></Image>
              </Row>
              <Row>
                <Container>
                  {club.recruiting ? (
                    <div className={styles.recruit}>recruit</div>
                  ) : (
                    <div className={styles.recruit_end}>recruit end</div>
                  )}
                </Container>
              </Row>
            </Col>
            <Col>
              <Row>
                <Container className={styles.name}> {club.name}</Container>
              </Row>
              <Row>
                <Container className={styles.detail}> {club.detail}</Container>
              </Row>
              <Container>
                <FontAwesomeIcon
                  className={styles.wish_star}
                  icon={faStar}
                  size="lg"
                />
              </Container>
            </Col>
          </Row>
        </div>
      </>
    );
  };

  return (
    <>
      <Container>
        <Row className="row-cols-auto justify-content-around ">
          {clubs &&
            clubs.map((club: ClubResType) => (
              <Col key={club.id} className="py-3">
                {clubContainer(club)}
              </Col>
            ))}
        </Row>
      </Container>
      {selectedClub !== undefined ? (
        <ClubDetail
          show={isDetailFormShow}
          handleCloseForm={handleDetailFormClose}
          club={selectedClub}
        ></ClubDetail>
      ) : null}
    </>
  );
};

export default ClubList;
