import DataTable from "@/components/client/data-table";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ISkill, ISubscribers } from "@/types/backend";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  ActionType,
  ProColumns,
  ProFormSelect,
} from "@ant-design/pro-components";
import {
  Button,
  Popconfirm,
  Select,
  Space,
  Tag,
  message,
  notification,
} from "antd";
import { useState, useRef, useEffect } from "react";
import dayjs from "dayjs";

import queryString from "query-string";
import { useNavigate } from "react-router-dom";

import { ALL_PERMISSIONS } from "@/config/permissions";
import Access from "@/components/share/access";
import { fetchSkill } from "@/redux/slice/skillSlide";
import ModalSkill from "@/components/admin/skill/modal.skill";
import { callDeleteSkill, callDeleteSubscriber } from "@/config/api";
import { fetchSubscriber } from "@/redux/slice/subscriberSlide";
import ViewDetailSubscriber from "@/components/admin/subscriber/view.subscriber";
import { TbDatabaseExport } from "react-icons/tb";
import { CSVLink, CSVDownload } from "react-csv";

const SubscriberPage = () => {
  const tableRef = useRef<ActionType>();
  const [dataCsv, setDataCsv] = useState<any>();

  const isFetching = useAppSelector((state) => state.subscriber.isFetching);
  const meta = useAppSelector((state) => state.subscriber.meta);
  const subscribers = useAppSelector((state) => state.subscriber.result);

  const dispatch = useAppDispatch();
  const reloadTable = () => {
    tableRef?.current?.reload();
  };

  const handleChangeData = () => {
    let result = [];
    result = subscribers.map((item: any) => {
      return {
        _id: item._id,
        email: item.createdBy.email,
        name: item.user.name,
        createAt: dayjs(item.createdAt).format("DD-MM-YYYY HH:mm:ss"),
        updatedAt: dayjs(item.updatedAt).format("DD-MM-YYYY HH:mm:ss"),
        skills: item.skills.map((skill: any) => skill.name).join(" || "),
      };
    });

    setDataCsv(result);
  };

  useEffect(() => {
    handleChangeData();

    return () => {};
  }, [subscribers]);

  const [openViewDetail, setOpenViewDetail] = useState<boolean>(false);
  const [dataInit, setDataInit] = useState<null | ISubscribers>(null);
  const columns: ProColumns<ISubscribers>[] = [
    {
      title: "Id",
      dataIndex: "_id",
      width: 210,
      hideInSearch: true,
      render: (text, record, index, action) => {
        return (
          <a
            href="#"
            onClick={() => {
              setOpenViewDetail(true);
              setDataInit(record);
            }}
          >
            {record._id}
          </a>
        );
      },
    },
    {
      title: "Name",
      dataIndex: ["user", "name"],
      // hideInSearch: true,
      width: 210,
    },
    {
      title: "Email",
      dataIndex: ["user", "email"],
      // hideInSearch: true,
      width: 210,
    },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   hideInSearch: true,
    // },

    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      width: 200,
      sorter: true,
      render: (text, record, index, action) => {
        return <>{dayjs(record.createdAt).format("DD-MM-YYYY HH:mm:ss")}</>;
      },
      hideInSearch: true,
    },
    {
      title: "UpdatedAt",
      dataIndex: "updatedAt",
      width: 200,
      sorter: true,
      render: (text, record, index, action) => {
        return <>{dayjs(record.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</>;
      },
      hideInSearch: true,
    },
    {
      title: "Actions",
      hideInSearch: true,
      width: 100,
      render: (_value, entity, _index, _action) => (
        <Space>
          <Access permission={ALL_PERMISSIONS.SUBSCRIBERS.DELETE} hideChildren>
            <Popconfirm
              placement="leftTop"
              title={"Xác nhận xóa SUBSCRIBERS"}
              description={"Bạn có chắc chắn muốn xóa SUBSCRIBERS này ?"}
              onConfirm={() => {
                handleDeleteSubscriber(entity._id);
              }}
              okText="Xác nhận"
              cancelText="Hủy"
            >
              <span style={{ cursor: "pointer", margin: "0 10px" }}>
                <DeleteOutlined
                  style={{
                    fontSize: 20,
                    color: "#ff4d4f",
                  }}
                />
              </span>
            </Popconfirm>
          </Access>
        </Space>
      ),
    },
  ];

  const buildQuery = (params: any, sort: any, filter: any) => {
    let clone = { ...params };
    const user = clone.user;
    const newClone = { ...clone, user: undefined };
    clone = newClone;
    let temp = queryString.stringify(clone);
    if (user) {
      if (user.name) temp += `&user.name=/${user.name}/i`;
      if (user.email) temp += `&user.email=/${user.email}/i`;
    }
    let sortBy = "";
    if (sort && sort.status) {
      sortBy = sort.status === "ascend" ? "sort=status" : "sort=-status";
    }

    if (sort && sort.createdAt) {
      sortBy =
        sort.createdAt === "ascend" ? "sort=createdAt" : "sort=-createdAt";
    }
    if (sort && sort.updatedAt) {
      sortBy =
        sort.updatedAt === "ascend" ? "sort=updatedAt" : "sort=-updatedAt";
    }

    //mặc định sort theo updatedAt
    if (Object.keys(sortBy).length === 0) {
      temp = `${temp}&sort=-updatedAt`;
    } else {
      temp = `${temp}&${sortBy}`;
    }
    // temp +=
    //   "&populate=companyId,jobId&fields=companyId._id, companyId.name, companyId.logo, jobId._id, jobId.name";

    return temp;
  };

  const handleDeleteSubscriber = async (_id: string | undefined) => {
    if (_id) {
      const res = await callDeleteSubscriber(_id);
      if (res && res.data) {
        message.success("Xóa SUBSCRIBERS thành công");
        reloadTable();
      } else {
        notification.error({
          message: "Có lỗi xảy ra",
          description: res.message,
        });
      }
    }
  };
  return (
    <div>
      <Access permission={ALL_PERMISSIONS.SUBSCRIBERS.GET_PAGINATE}>
        <DataTable<ISubscribers>
          actionRef={tableRef}
          headerTitle="Danh sách Subscriber"
          rowKey="_id"
          loading={isFetching}
          columns={columns}
          dataSource={subscribers}
          request={async (params, sort, filter): Promise<any> => {
            const query = buildQuery(params, sort, filter);
            dispatch(fetchSubscriber({ query }));
          }}
          scroll={{ x: true }}
          pagination={{
            current: meta.current,
            pageSize: meta.pageSize,
            showSizeChanger: true,
            total: meta.total,
            showTotal: (total, range) => {
              return (
                <div>
                  {" "}
                  {range[0]}-{range[1]} trên {total} rows
                </div>
              );
            },
          }}
          rowSelection={false}
          toolBarRender={(_action, _rows): any => {
            return (
              <>
                <Button
                  icon={<TbDatabaseExport />}
                  type="primary"
                  onClick={() => {}}
                >
                  <CSVLink
                    data={dataCsv && dataCsv.length > 0 ? dataCsv : []}
                    target="_blank"
                  >
                    Export CSV File
                  </CSVLink>
                </Button>
              </>
            );
          }}
        />
      </Access>
      {/* <ModalSkill
        openModal={openModal}
        setOpenModal={setOpenModal}
        reloadTable={reloadTable}
        dataInit={dataInit}
        setDataInit={setDataInit}
      /> */}
      <ViewDetailSubscriber
        open={openViewDetail}
        onClose={setOpenViewDetail}
        dataInit={dataInit}
        setDataInit={setDataInit}
      />
    </div>
  );
};

export default SubscriberPage;
