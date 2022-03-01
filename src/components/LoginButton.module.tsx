import { Col, Row } from "antd";
import styles from "./LoginButton.module.css";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { logout as logoutSaga } from "../redux/modules/auth";
import useToken from "../hooks/useToken";
import { useState } from "react";

function LoginButton() {
  const dispatch = useDispatch();
  const [token, setToken] = useState<string | null>(useToken());

  if (token !== null) {
  }
  const logout = useCallback(() => {
    dispatch(logoutSaga());
  }, [dispatch]);

  function logoutClick() {
    setToken(null);
    dispatch(logout());
  }

  return (
    <div>
      <br />
      <Row>
        <Col span={24}>
          <Row>
            <Col span={20}> </Col>
            {token !== null ? (
              <Col span={4}>
                <div className="btn">
                  <button className={styles.btn} onClick={logoutClick}>
                    로그아웃
                  </button>
                </div>
              </Col>
            ) : (
              <Col span={4}>
                <a href={"/signin"} className="btn">
                  <button className={styles.btn} onClick={undefined}>
                    로그인/회원가입
                  </button>
                </a>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default LoginButton;