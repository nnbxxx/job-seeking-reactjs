import { callFetchJob, callFetchJobClient } from "@/config/api";
import {
  LOCATION_LIST,
  changeEnumListSkill,
  convertSlug,
  fetchListSkill,
  getLocationName,
} from "@/config/utils";
import { IJob } from "@/types/backend";
import { EnvironmentOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { Card, Col, ConfigProvider, Empty, Pagination, Row, Spin } from "antd";
import { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { Link, useNavigate } from "react-router-dom";
import styles from "styles/client.module.scss";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import enUS from "antd/lib/calendar/locale/en_US";
import locale from "antd/es/date-picker/locale/en_US";

interface IProps {
  showPagination?: boolean;
  skill?: string[];
  location?: string[];
}

const JobCard = (props: IProps) => {
  const { showPagination = false, skill, location } = props;

  const [displayJob, setDisplayJob] = useState<IJob[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(4);

  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState("");
  const [sortQuery, setSortQuery] = useState("sort=-updatedAt");

  const navigate = useNavigate();

  useEffect(() => {
    fetchJob();
  }, [current, pageSize, filter, sortQuery, skill, location]);

  const fetchJob = async () => {
    setIsLoading(true);
    let query = `current=${current}&pageSize=${pageSize}`;
    // if (filter) {
    //   query += `&${filter}`;
    // }
    // if (sortQuery) {
    //   query += `&${sortQuery}`;
    // }

    if (location?.length && location.length > 0) {
      query += `&location=`;
      let Query = ``;
      location.forEach((s) => {
        Query += s + ",";
      });
      query += Query;
    }
    let res;
    if (skill && skill?.length > 0) {
      res = await callFetchJobClient(query, { skills: skill });
    } else {
      res = await callFetchJob(query);
    }
    if (res && res.data) {
      setDisplayJob(res.data.result);
      setTotal(res.data.meta.total);
    }
    setIsLoading(false);
  };

  const handleOnchangePage = (pagination: {
    current: number;
    pageSize: number;
  }) => {
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pageSize);
      setCurrent(1);
    }
  };

  const handleViewDetailJob = (item: IJob) => {
    const slug = convertSlug(item.name);
    navigate(`/job/${slug}?id=${item._id}`);
  };

  return (
    <div>
      <div
        className={`${styles["card-job-section"]} ${styles["top-employers-container"]}`}
      >
        <div className={`${styles["job-content"]}`}>
          <Spin spinning={isLoading} tip="Loading...">
            <Row gutter={[20, 20]}>
              <Col span={24}>
                <div
                  className={
                    isMobile ? styles["dflex-mobile"] : styles["dflex-pc"]
                  }
                >
                  <span className={styles["title1"]}>Công Việc Mới Nhất</span>

                  {!showPagination && <Link to="job">Xem tất cả</Link>}
                </div>
              </Col>

              {displayJob?.map((item) => {
                return (
                  <>
                    <Col span={24} md={12} key={item._id}>
                      <Card
                        size="small"
                        title={null}
                        hoverable
                        onClick={() => handleViewDetailJob(item)}
                      >
                        <div className={styles["card-job-content"]}>
                          <div className={styles["card-job-left"]}>
                            <img
                              alt="example"
                              src={`${
                                import.meta.env.VITE_BACKEND_URL
                              }/images/company/${item?.company?.logo}`}
                            />
                          </div>
                          <div className={styles["card-job-right"]}>
                            <div className={styles["job-title"]}>
                              {item.name}
                            </div>
                            <div className={styles["job-location"]}>
                              <EnvironmentOutlined
                                style={{ color: "#58aaab" }}
                              />
                              &nbsp;{getLocationName(item.location)}
                            </div>
                            <div>
                              <ThunderboltOutlined
                                style={{ color: "orange" }}
                              />
                              &nbsp;
                              {(item.salary + "")?.replace(
                                /\B(?=(\d{3})+(?!\d))/g,
                                ","
                              )}{" "}
                              đ
                            </div>
                            <div className={styles["job-updatedAt"]}>
                              {dayjs(item.updatedAt).format(
                                "DD-MM-YYYY HH:mm:ss"
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  </>
                );
              })}

              {(!displayJob || (displayJob && displayJob.length === 0)) &&
                !isLoading && (
                  <div className={styles["empty"]}>
                    <Empty description="Không có dữ liệu" />
                  </div>
                )}
            </Row>
            {showPagination && (
              <>
                <div style={{ marginTop: 30 }}></div>
                <Row style={{ display: "flex", justifyContent: "center" }}>
                  <Pagination
                    current={current}
                    total={total}
                    pageSize={pageSize}
                    responsive
                    onChange={(p: number, s: number) =>
                      handleOnchangePage({ current: p, pageSize: s })
                    }
                  />
                </Row>
              </>
            )}
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
