import { Button, Divider, Form, Input, message, notification } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { callLogin, callLoginGoogle } from "config/api";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserLoginInfo } from "@/redux/slice/accountSlide";
import styles from "styles/login.module.scss";
import { useAppSelector } from "@/redux/hooks";
import video_bg from "../../../public/video_bg.mp4";
import { FaCheck } from "react-icons/fa";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
const LoginPage = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const isAuthenticated = useAppSelector(
    (state) => state.account.isAuthenticated
  );

  let location = useLocation();
  let params = new URLSearchParams(location.search);
  const callback = params?.get("callback");

  useEffect(() => {
    //đã login => redirect to '/'
    if (isAuthenticated) {
      // navigate('/');
      window.location.href = "/";
    }
  }, []);

  const onFinish = async (values: any) => {
    const { username, password } = values;
    setIsSubmit(true);
    const res = await callLogin(username, password);
    setIsSubmit(false);
    if (res?.data) {
      localStorage.setItem("access_token", res.data.access_token);
      dispatch(setUserLoginInfo(res.data.user));
      message.success("Đăng nhập tài khoản thành công!");
      window.location.href = callback ? callback : "/";
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description:
          res.message && Array.isArray(res.message)
            ? res.message[0]
            : res.message,
        duration: 5,
      });
    }
  };
  const loginGoogle = useGoogleLogin({
    onSuccess: async (data) => {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${data.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
            Accept: "application/json",
          },
        }
      );

      const res = await callLoginGoogle(
        response.data.name,
        response.data.name,
        "logingoogle",
        response.data.email
      );

      if (res?.data) {
        localStorage.setItem("access_token", res.data.access_token);
        dispatch(setUserLoginInfo(res.data.user));
        message.success("Đăng nhập tài khoản thành công!");
        window.location.href = callback ? callback : "/";
      } else {
        notification.error({
          message: "Có lỗi xảy ra",
          description:
            res.message && Array.isArray(res.message)
              ? res.message[0]
              : res.message,
          duration: 5,
        });
      }
    },
  });

  return (
    <div
      className={`${styles["d-flex"]} ${styles["flex-column"]} ${styles["min-vh-main"]}`}
    >
      <div className={`${styles["flex-grow-1"]}`}>
        <div
          className={`${styles["main"]} ${styles["bg-white"]} ${styles["sign-in-up-container"]}`}
        >
          <div className={`${styles["icontainer"]}`}>
            <div
              className={`${styles["d-flex"]} ${styles["flex-column"]} ${styles["bg-white"]}`}
            >
              <div className={`${styles["user-authentication"]}`}>
                <div className={`${styles["headline"]} ${styles["my-4"]}`}>
                  <div
                    className={`${styles["d-flex"]} ${styles["align-items-center"]}`}
                  >
                    <h3
                      className={`${styles["fs-5"]} ${styles["mb-0"]} ${styles["text-it-black"]}`}
                    >
                      Chào mừng bạn đến với
                      <img
                        className={`${styles["px-1"]}`}
                        src="../../../public/Logo.png"
                        // width="80"
                        height="80"
                        alt="ITviec Logo"
                      />
                    </h3>
                  </div>
                </div>
                <div className={`${styles["leftside"]}`}>
                  <div
                    className={`${styles["mb-4"]} ${styles["text-rich-grey"]}`}
                  >
                    Bằng việc đăng nhập, bạn đồng ý với các
                    <a
                      href="https://itviec.com/blog/terms-conditions-vn/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles["hyperlink"]}`}
                    >
                      Điều khoản dịch vụ
                    </a>{" "}
                    và
                    <a
                      href="https://itviec.com/blog/chinh-sach-bao-mat/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles["hyperlink"]}`}
                    >
                      Chính sách quyền riêng tư
                    </a>{" "}
                    của ITviec liên quan đến thông tin riêng tư của bạn.
                  </div>
                  <Button
                    danger
                    type="primary"
                    onClick={() => loginGoogle()}
                    style={{
                      borderRadius: "20px",
                      width: "100%",
                      paddingTop: "4px",
                      paddingBottom: "4px",
                    }}
                  >
                    Đăng nhập Google
                  </Button>
                  <div
                    className={`${styles["d-flex"]} ${styles["align-items-center"]} ${styles["py-3"]}`}
                  >
                    <div
                      className={`${styles["border-top-solid"]} ${styles["flex-grow-1"]}`}
                    ></div>

                    <div
                      className={`${styles["px-2"]} ${styles["fw-medium"]} ${styles["text-it-black"]}`}
                    >
                      hoặc
                    </div>
                    <div
                      className={`${styles["border-top-solid"]} ${styles["flex-grow-1"]}`}
                    ></div>
                  </div>
                  {/* <form
                    role="form"
                    data-controller="bootstrap_validation"
                    data-turbo="false"
                    action="/sign_in"
                    acceptCharset="UTF-8"
                    method="post"
                    noValidate
                  > */}
                  <Form
                    name="basic"
                    // style={{ maxWidth: 600, margin: '0 auto' }}
                    onFinish={onFinish}
                    autoComplete="off"
                  >
                    <Form.Item
                      label={
                        <span>
                          Địa chỉ Email{" "}
                          <abbr className={`${styles["text-danger"]}`}></abbr>
                        </span>
                      }
                      labelCol={{ span: 24 }}
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Email không được để trống!",
                        },
                      ]}
                    >
                      <Input
                        id="user_email"
                        placeholder="Địa chỉ Email"
                        style={{ borderRadius: ".25rem", padding: "10px 11px" }}
                      />
                    </Form.Item>

                    <div
                      className={`${styles["mb-1"]} ${styles["d-flex"]} ${styles["justify-content-between"]}`}
                    >
                      <label htmlFor="user_password">
                        <abbr className={`${styles["text-danger"]}`}>*</abbr>
                        <span className={`${styles["text-it-black"]}`}>
                          Mật khẩu
                        </span>
                      </label>
                      <a
                        className={`${styles["normal-text"]} ${styles["hyperlink"]}`}
                        rel="nofollow"
                        data-controller="utm-tracking"
                        href="/forgotaccount"
                      >
                        Quên mật khẩu?
                      </a>
                    </div>
                    <Form.Item
                      labelCol={{ span: 24 }} //whole column
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Mật khẩu không được để trống!",
                        },
                      ]}
                    >
                      <Input.Password
                        placeholder="Mật khẩu"
                        style={{ borderRadius: ".25rem", padding: "10px 11px" }}
                      />
                    </Form.Item>

                    <Form.Item
                    // wrapperCol={{ offset: 6, span: 16 }}
                    >
                      <Button
                        // type="hidden"
                        htmlType="submit"
                        loading={isSubmit}
                        style={{ padding: "23px 11px", color: "white" }}
                        className={`${styles["ibtn"]} ${styles["ibtn-md"]} ${styles["ibtn-pri"]} ${styles["w-100"]}`}
                      >
                        Đăng nhập bằng Email
                      </Button>
                    </Form.Item>
                    <div className={`${styles["mb-3"]}`}>
                      <div
                        className={`${styles["normal-text"]} ${styles["text-it-black"]} ${styles["text-center"]}`}
                      >
                        Bạn chưa có tài khoản?
                        <a
                          className={`${styles["normal-text"]} ${styles["hyperlink"]}`}
                          data-controller="utm-tracking"
                          href="/register"
                        >
                          Đăng ký ngay
                        </a>
                      </div>
                    </div>
                  </Form>
                  {/* </form> */}
                </div>
                <div className={`${styles["rightside"]}`}>
                  <h2
                    className={`${styles["text-it-black"]} ${styles["mt-3"]} ${styles["mt-md-0"]} ${styles["mb-3"]}`}
                    style={{ fontSize: "22px", fontWeight: "700" }}
                  >
                    Đăng nhập để truy cập ngay vào hàng ngàn đánh giá và dữ liệu
                    lương thị trường IT
                  </h2>
                  <ul className={`${styles["list-unstyled"]}`}>
                    <li
                      className={`${styles["d-flex"]} ${styles["align-items-start"]} ${styles["pb-3"]}`}
                    >
                      <svg
                        className={`${styles["feather-icon"]} ${styles["icon-md"]} ${styles["text-success-color"]} ${styles["imt-1"]} ${styles["flex-shrink-0"]}`}
                      >
                        <FaCheck />
                      </svg>
                      <div
                        className={`${styles["ms-1"]} ${styles["normal-text"]} ${styles["text-it-black"]}`}
                      >
                        Xem trước mức lương để có thể lợi thế khi thoả thuận
                        lương
                      </div>
                    </li>
                    <li
                      className={`${styles["d-flex"]} ${styles["align-items-start"]} ${styles["pb-3"]}`}
                    >
                      <svg
                        className={`${styles["feather-icon"]} ${styles["icon-md"]} ${styles["text-success-color"]} ${styles["imt-1"]} ${styles["flex-shrink-0"]}`}
                      >
                        <FaCheck />
                      </svg>
                      <div
                        className={`${styles["ms-1"]} ${styles["normal-text"]} ${styles["text-it-black"]}`}
                      >
                        Tìm hiểu về phúc lợi, con người, văn hóa công ty qua các
                        đánh giá chân thật
                      </div>
                    </li>
                    <li
                      className={`${styles["d-flex"]} ${styles["align-items-start"]} ${styles["pb-3"]}`}
                    >
                      <svg
                        className={`${styles["feather-icon"]} ${styles["icon-md"]} ${styles["text-success-color"]} ${styles["imt-1"]} ${styles["flex-shrink-0"]}`}
                      >
                        <FaCheck />
                      </svg>
                      <div
                        className={`${styles["ms-1"]} ${styles["normal-text"]} ${styles["text-it-black"]}`}
                      >
                        Dễ dàng ứng tuyển chỉ với một thao tác
                      </div>
                    </li>
                    <li
                      className={`${styles["d-flex"]} ${styles["align-items-start"]} ${styles["pb-3"]}`}
                    >
                      <svg
                        className={`${styles["feather-icon"]} ${styles["icon-md"]} ${styles["text-success-color"]} ${styles["imt-1"]} ${styles["flex-shrink-0"]}`}
                      >
                        <FaCheck />
                      </svg>
                      <div
                        className={`${styles["ms-1"]} ${styles["normal-text"]} ${styles["text-it-black"]}`}
                      >
                        Quản lý hồ sơ và quyền riêng tư của bạn
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          aria-atomic="true"
          aria-live="assertive"
          className={`${styles["toast"]} ${styles["toast-info"]} ${styles["box-shadow-medium"]} ${styles["toast-timed-out"]}`}
          data-bs-animation="true"
          data-bs-delay="4000"
          data-controller="toast-timed-out"
          data-toast-timed-out-target="toast"
          role="alert"
        >
          <div className={`${styles["toast-icon"]}`}>
            <svg
              fill="none"
              height="20"
              viewBox="0 0 20 20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_2058_1057)" id="state-info">
                <path
                  clipRule="evenodd"
                  d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM10.0001 8.91669C10.5984 8.91669 11.0834 9.40171 11.0834 10V14.1667C11.0834 14.765 10.5984 15.25 10.0001 15.25C9.40177 15.25 8.91675 14.765 8.91675 14.1667V10C8.91675 9.40171 9.40177 8.91669 10.0001 8.91669ZM10.0001 5.58331C9.40177 5.58331 8.91675 6.06834 8.91675 6.66665C8.91675 7.26495 9.40177 7.74998 10.0001 7.74998H10.0084C10.6067 7.74998 11.0917 7.26495 11.0917 6.66665C11.0917 6.06834 10.6067 5.58331 10.0084 5.58331H10.0001Z"
                  fillRule="evenodd"
                  fill="#085BDD"
                  id="Subtract"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_2058_1057">
                  <rect fill="white" height="20" width="20"></rect>
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className={`${styles["toast-body"]}`}>
            <div className={`${styles["toast-title"]}`}>
              <h6
                className={`${styles["fw-normal"]}`}
                data-toast-timed-out-target="message"
              ></h6>
            </div>
          </div>

          <div
            aria-label="Close"
            className={`${styles["toast-close-icon"]}`}
            data-bs-dismiss="toast"
            // type="button"
          >
            <svg className={`${styles["feather-icon"]} ${styles["icon-md"]}`}>
              <use href="https://itviec.com/assets/feather-icons-sprite-520cd3770a1002f7c87bd1ba253464228ad112abb4c34d81c8cda9f937487a49.svg#x"></use>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
