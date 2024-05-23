import {
  Button,
  Divider,
  Form,
  Input,
  Row,
  Select,
  message,
  notification,
} from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { callRegister } from "config/api";
import styles from "styles/login.module.scss";
import { IUser } from "@/types/backend";
const { Option } = Select;

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);

  const onFinish = async (values: IUser) => {
    const { name, email, password, age, gender, address } = values;
    setIsSubmit(true);
    const res = await callRegister(
      name,
      email,
      password as string,
      +age,
      gender,
      address
    );
    setIsSubmit(false);
    if (res?.data?._id) {
      message.success("Đăng ký tài khoản thành công!");
      navigate("/login");
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
                        className="px-1"
                        src="../../../public/Logo.png"
                        // width="80"
                        height="80"
                        alt="ITviec logo"
                      />
                    </h3>
                  </div>
                </div>
                <div className={`${styles["leftside"]}`}>
                  <h1 className={`${styles["text-it-black"]}`}>
                    Đăng ký tài khoản
                  </h1>

                  <Form<IUser>
                    name="basic"
                    // style={{ maxWidth: 600, margin: '0 auto' }}
                    onFinish={onFinish}
                    autoComplete="off"
                  >
                    <Form.Item
                      labelCol={{ span: 24 }} //whole column
                      label={
                        <span
                          style={{
                            color: "black",
                            fontSize: "16px",
                            // fontWeight: "bold",
                          }}
                        >
                          Họ tên
                        </span>
                      }
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "Họ tên không được để trống!",
                        },
                      ]}
                    >
                      <Input
                        style={{
                          borderRadius: ".25em",
                          padding: "10px 11px",
                          marginBottom: "0px",
                        }}
                        placeholder="Họ & Tên"
                      />
                    </Form.Item>

                    <Form.Item
                      labelCol={{ span: 24 }} //whole column
                      label={
                        <span
                          style={{
                            color: "black",
                            fontSize: "16px",
                          }}
                        >
                          Địa chỉ Email
                        </span>
                      }
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Email không được để trống!",
                        },
                      ]}
                    >
                      <Input
                        type="email"
                        style={{
                          borderRadius: ".25em",
                          padding: "10px 11px",
                          marginBottom: "0px",
                        }}
                        placeholder="Địa chỉ Email"
                      />
                    </Form.Item>

                    <Form.Item
                      labelCol={{ span: 24 }} //whole column
                      label={
                        <span
                          style={{
                            color: "black",
                            fontSize: "16px",
                          }}
                        >
                          Mật khẩu
                        </span>
                      }
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Mật khẩu không được để trống!",
                        },
                      ]}
                    >
                      <Input.Password
                        style={{
                          borderRadius: ".25em",
                          padding: "10px 11px",
                          marginBottom: "0px",
                        }}
                        placeholder="Mật khẩu"
                      />
                    </Form.Item>
                    <Form.Item
                      labelCol={{ span: 24 }} //whole column
                      label={
                        <span
                          style={{
                            color: "black",
                            fontSize: "16px",
                          }}
                        >
                          Tuổi
                        </span>
                      }
                      name="age"
                      rules={[
                        {
                          required: true,
                          message: "Tuổi không được để trống!",
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        style={{
                          borderRadius: ".25em",
                          padding: "10px 11px",
                          marginBottom: "0px",
                        }}
                        placeholder="Tuổi"
                      />
                    </Form.Item>

                    <Form.Item
                      labelCol={{ span: 24 }} //whole column
                      name="gender"
                      label={
                        <span
                          style={{
                            color: "#000000",
                            fontSize: "16px",
                          }}
                        >
                          Giới tính
                        </span>
                      }
                      rules={[
                        {
                          required: true,
                          message: "Giới tính không được để trống!",
                        },
                      ]}
                    >
                      <Select
                        // placeholder="Select a option and change input text above"
                        // onChange={onGenderChange}
                        allowClear
                        style={{ height: "40px" }}
                      >
                        <Option value="male">Nam</Option>
                        <Option value="female">Nữ</Option>
                        <Option value="other">Khác</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      labelCol={{ span: 24 }} //whole column
                      label={
                        <span
                          style={{
                            color: "#000000",
                            fontSize: "16px",
                          }}
                        >
                          Địa chỉ
                        </span>
                      }
                      name="address"
                      rules={[
                        {
                          required: true,
                          message: "Địa chỉ không được để trống!",
                        },
                      ]}
                    >
                      <Input
                        style={{
                          borderRadius: ".25em",
                          padding: "10px 11px",
                          marginBottom: "0px",
                        }}
                        placeholder="Địa chỉ"
                      />
                    </Form.Item>

                    <Form.Item
                    // wrapperCol={{ offset: 6, span: 16 }}
                    >
                      <Button
                        htmlType="submit"
                        loading={isSubmit}
                        style={{ padding: "23px 11px", color: "white" }}
                        className={`${styles["ibtn"]} ${styles["ibtn-md"]} ${styles["ibtn-pri"]} ${styles["w-100"]}`}
                      >
                        Đăng ký
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
                          href="/login"
                        >
                          Đăng nhập ngay
                        </a>
                      </div>
                    </div>

                    <div className={`${styles["mt-5"]} ${styles["d-flex"]}`}>
                      <strong
                        className={`${styles["ifs-14"]} ${styles["text-rich-grey"]}`}
                      >
                        Chú thích:
                      </strong>

                      <div
                        className={`${styles["px-1"]} ${styles["small-text"]} ${styles["text-rich-grey"]}`}
                      >
                        Mật khẩu phải chứa ít nhất 12 ký tự bao gồm ký tự đặc
                        biệt, số, chữ hoa, chữ thường
                      </div>
                    </div>
                  </Form>
                </div>

                <div
                  className={`${styles["rightside"]} ${styles["d-sm-flex"]} ${styles["d-none"]} ${styles["justify-content-evenly"]} ${styles["align-items-center"]}`}
                >
                  <img
                    src="https://itviec.com/assets/robby-login-df4a56395486b5cea97ba1754d226059626e6e124b3ea3db0789ba3c39f644f1.png"
                    alt="Robby"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
