import React from "react";
import { CommentOutlined, CustomerServiceOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import styles from "styles/Footer.module.scss";
import LinkedInLogo from "../../../public/in.png";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaYoutube,
  FaPhoneAlt,
  FaFacebookMessenger,
} from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { CgMail } from "react-icons/cg";
import { IoIosSend } from "react-icons/io";

const Footer = () => {
  return (
    <>
      <footer
        className={`${styles["footer"]} ${styles["ipt-md-12"]} ${styles["position-relative"]}`}
      >
        <div
          className={`${styles["container-xxl"]} ${styles["p-0"]} ${styles["imb-12"]}`}
        >
          <div
            className={`${styles["row"]} ${styles["d-flex"]} ${styles["justify-content-md-between"]} ${styles["justify-content-center"]} ${styles["m-0"]} ${styles["ipt-17"]} ${styles["ipt-md-0"]}`}
            id="accordionFooter"
          >
            <div className={'$styles["collg3"]'}>
              <div className={'$styles["footer-logo"]'}>
                <div
                  className={`${styles["footer-slogan"]} ${styles["mx-auto"]} ${styles["ipt-2"]} ${styles["text-md-start"]} ${styles["text-center"]}`}
                >
                  <img
                    height="90"
                    className={'$styles["logo-itviec"]'}
                    alt="logo-itviec"
                    src="./public/Logo.png"
                  />
                  <p
                    className={`${styles["normal-text"]} ${styles["pe-none"]}`}
                  >
                    Ít nhưng mà chất
                  </p>
                </div>
                <div
                  className={`${styles["footer-logo-icons"]} ${styles["d-flex"]} ${styles["justify-content-md-start"]} ${styles["justify-content-center"]} ${styles["imt-8"]}`}
                >
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.linkedin.com/company/itviec/"
                  >
                    <div
                      className={`${styles["icon"]} ${styles["rounded-circle"]} ${styles["d-flex"]} ${styles["justify-content-center"]} ${styles["align-items-center"]} ${styles["ime-4"]}`}
                    >
                      <FaLinkedinIn />
                    </div>
                  </a>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.facebook.com/ITviec/"
                  >
                    <div
                      className={`${styles["icon"]} ${styles["rounded-circle"]} ${styles["d-flex"]} ${styles["justify-content-center"]} ${styles["align-items-center"]} ${styles["ime-4"]}`}
                    >
                      <FaFacebookF />
                    </div>
                  </a>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.youtube.com/itviec"
                  >
                    <div
                      className={`${styles["icon"]} ${styles["rounded-circle"]} ${styles["d-flex"]} ${styles["justify-content-center"]} ${styles["align-items-center"]}`}
                    >
                      <FaYoutube />
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div
              className={`${styles["col-12"]} ${styles["col-lg-2"]} ${styles["ipx-5"]} ${styles["ipx-md-0"]}`}
            >
              <h4
                aria-controls="about"
                className={`${styles["footer-header"]} ${styles["text-silver-grey"]} ${styles["footer-accordion"]} ${styles["accordion-button"]} ${styles["collapsed"]} ${styles["bg-transparent"]}`}
                data-bs-target="#about"
                data-bs-toggle="collapse"
              >
                Về ITJob
              </h4>
              <div
                className={`${styles["accordion-collapse"]} ${styles["collapse"]}`}
                data-bs-parent="#accordionFooter"
                id="about"
              >
                <div
                  className={`${styles["accordion-body"]} ${styles["d-flex"]} ${styles["flex-column"]} ${styles["small-text"]} ${styles["imx-md-0"]}`}
                >
                  <span>
                    <a data-controller="utm-tracking" href="/">
                      Trang Chủ
                    </a>
                  </span>
                  <span>
                    <a
                      target="_blank"
                      rel="canonical"
                      data-controller="utm-tracking"
                      href="/"
                    >
                      Về ITjob.com
                    </a>
                  </span>
                  <span>
                    <a
                      target="_blank"
                      rel="canonical"
                      data-controller="utm-tracking"
                      href="/"
                    >
                      Dịch vụ gợi ý ứng viên
                    </a>
                  </span>
                  <span>
                    <a
                      target="_blank"
                      rel="canonical"
                      data-controller="utm-tracking"
                      href="/"
                    >
                      Liên Hệ
                    </a>
                  </span>
                  <span>
                    <a data-controller="utm-tracking" href="/job">
                      Việc Làm IT
                    </a>
                  </span>
                  <span>
                    <a
                      target="_blank"
                      rel="canonical"
                      href="https://itviec.com/blog/faq-cac-cau-hoi-thuong-gap/"
                    >
                      Câu hỏi thường gặp
                    </a>
                  </span>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-2 ipx-5 ipx-md-0">
              <h4
                aria-controls="campaign"
                className={`${styles["footer-header"]} ${styles["text-silver-grey"]} ${styles["footer-accordion"]} ${styles["accordion-button"]} ${styles["collapsed"]} ${styles["bg-transparent"]}`}
                data-bs-target="#campaign"
                data-bs-toggle="collapse"
              >
                Chương trình
              </h4>
              <div
                className={`${styles["accordion-collapse"]} ${styles["collapse"]}`}
                data-bs-parent="#accordionFooter"
                id="campaign"
              >
                <div
                  className={`${styles["accordion-body"]} ${styles["d-flex"]} ${styles["flex-column"]} ${styles["small-text"]} ${styles["imx-md-0"]}`}
                >
                  <span>
                    <a target="_blank" data-controller="utm-tracking" href="/">
                      Chuyện IT
                    </a>
                  </span>
                  <span>
                    <a
                      target="_blank"
                      rel="canonical"
                      data-controller="utm-tracking"
                      href="/cuoc-thi-viet"
                    >
                      Cuộc thi viết
                    </a>
                  </span>
                </div>
              </div>
            </div>

            <div
              className={`${styles["col-12"]} ${styles["col-lg-2"]} ${styles["ipx-5"]} ${styles["ipx-md-0"]}`}
            >
              <h4
                aria-controls="policy"
                className={`${styles["footer-header"]} ${styles["text-silver-grey"]} ${styles["footer-accordion"]} ${styles["accordion-button"]} ${styles["collapsed"]} ${styles["bg-transparent"]}`}
                data-bs-target="#policy"
                data-bs-toggle="collapse"
              >
                Điều khoản chung
              </h4>
              <div
                className={`${styles["accordion-collapse"]} ${styles["collapse"]}`}
                data-bs-parent="#accordionFooter"
                id="policy"
              >
                <div
                  className={`${styles["accordion-body"]} ${styles["d-flex"]} ${styles["flex-column"]} ${styles["small-text"]} ${styles["imx-md-0"]}`}
                >
                  <span>
                    <a
                      target="_blank"
                      href="https://itviec.com/blog/chinh-sach-bao-mat/"
                    >
                      Quy định bảo mật
                    </a>
                  </span>
                  <span>
                    <a
                      target="_blank"
                      href="https://itviec.com/blog/quy-che-hoat-dong-cua-itviec/"
                    >
                      Quy chế hoạt động
                    </a>
                  </span>
                  <span>
                    <a
                      target="_blank"
                      href="https://itviec.com/blog/chinh-sach-giai-quyet-khieu-nai/"
                    >
                      Giải quyết khiếu nại
                    </a>
                  </span>
                  <span>
                    <a
                      target="_blank"
                      href="https://itviec.com/blog/terms-conditions-vn/"
                    >
                      Thoả thuận sử dụng
                    </a>
                  </span>
                  <span>
                    <a
                      target="_blank"
                      rel="canonical"
                      href="https://itviec.com/blog/press/"
                    >
                      Thông cáo báo chí
                    </a>
                  </span>
                </div>
              </div>
            </div>

            <div
              className={`${styles["col-12"]} ${styles["collg3"]} ${styles["p-0"]} `}
            >
              <h4
                className={`${styles["footer-header"]} ${styles["imx-md-0"]} ${styles["imx-5"]} ${styles["text-silver-grey"]} ${styles["ipy-4"]} ${styles["pe-none"]}`}
              >
                Liên hệ để đăng tin tuyển dụng tại:
              </h4>
              <div
                className={`${styles["d-flex"]} ${styles["flex-column"]} ${styles["imx-md-0"]} ${styles["imx-5"]} ${styles["small-text"]} ${styles["text-dark-grey"]}`}
              >
                <div
                  className={`${styles["d-flex"]} ${styles["align-items-center"]} ${styles["ipb-3"]} ${styles["pe-none"]}`}
                >
                  <svg
                    className={`${styles["feather-icon"]} ${styles["icon-sm"]}`}
                  >
                    <FaPhoneAlt />
                  </svg>
                  <p className={`${styles["ims-2"]}`}>
                    Hồ Chí Minh: (+84) 977 460 519
                  </p>
                </div>
                <div
                  className={`${styles["d-flex"]} ${styles["align-items-center"]} ${styles["ipb-3"]} ${styles["pe-none"]}`}
                >
                  <svg
                    className={`${styles["feather-icon"]} ${styles["icon-sm"]}`}
                  >
                    <FaPhoneAlt />
                  </svg>
                  <p className={`${styles["ims-2"]}`}>
                    Hà Nội: (+84) 983 131 351
                  </p>
                </div>
                <div
                  className={`${styles["d-flex"]} ${styles["align-items-center"]} ${styles["ipb-3"]} ${styles["pe-none"]}`}
                >
                  <svg
                    className={`${styles["feather-icon"]} ${styles["icon-sm"]}`}
                  >
                    <CgMail />
                  </svg>
                  <p className={`${styles["ims-2"]}`}>Email: love@itjob.com</p>
                </div>
                <div
                  className={`${styles["d-flex"]} ${styles["align-items-center"]} ${styles["ipb-3"]}`}
                >
                  <svg
                    className={`${styles["feather-icon"]} ${styles["icon-sm"]}`}
                  >
                    <IoIosSend />
                  </svg>
                  <p className={`${styles["ims-2"]}`}>
                    <a target="_blank" href="/contact-form">
                      Gửi thông tin liên hệ
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className={`${styles["my-0"]} ${styles["opacity-25"]}`} />

        <div
          className={`${styles["container-xxl"]} ${styles["p-0"]} ${styles["ipy-5"]} ${styles["d-flex"]} ${styles["justify-content-center"]} ${styles["footer-copyright"]}`}
        >
          <p
            className={`${styles["normal-text"]} ${styles["tiny-text"]} ${styles["text-dark-grey"]} ${styles["ipe-4"]}`}
          >
            Copyright © IT JOB JSC
          </p>
          <p className={styles["footer-copyright-line"]}></p>
          <p
            className={`${styles["normal-text"]} ${styles["tiny-text"]} ${styles["text-dark-grey"]} ${styles["ips-4"]}`}
          >
            MST: 0312192258
          </p>
        </div>

        <div
          className={`${styles["footer-image"]} ${styles["position-absolute"]}`}
        >
          <img
            src="https://itviec.com/assets/footer-image-35f866330436404820ee462153a6b32edebdbdd90869eedacf2205b45fcc9f4a.svg"
            alt="Footer Decorative Image"
          />
        </div>
      </footer>
      <FloatButton.Group
        trigger="click"
        type="primary"
        tooltip="Liên hệ admin"
        style={{ right: 25, bottom: 70, width: 50, height: 50 }}
        icon={<MdOutlineMail />}
      >
        <a href="https://m.me/312676968596878" target="_blank">
          <FloatButton
            icon={<FaFacebookMessenger />}
            tooltip="Liên hệ qua messenger"
            style={{
              width: 50,
              height: 50,
            }}
          />
        </a>
      </FloatButton.Group>
    </>
  );
};

export default Footer;
