import DataTable from "@/components/client/data-table";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchUser } from "@/redux/slice/userSlide";
import { IUser } from "@/types/backend";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType, ProColumns } from "@ant-design/pro-components";
import { Button, Popconfirm, Space, message, notification } from "antd";
import { useState, useRef, useEffect } from "react";
import dayjs from "dayjs";
import { callDeleteUser } from "@/config/api";
import queryString from "query-string";
import ModalUser from "@/components/admin/user/modal.user";
import ViewDetailUser from "@/components/admin/user/view.user";
import Access from "@/components/share/access";
import { ALL_PERMISSIONS } from "@/config/permissions";
import { TbDatabaseExport, TbDatabaseImport } from "react-icons/tb";
import { CSVLink } from "react-csv";

const UserPage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [dataInit, setDataInit] = useState<any>(null);
  const [dataCsv, setDataCsv] = useState<any>();
  const [openViewDetail, setOpenViewDetail] = useState<boolean>(false);

  const tableRef = useRef<ActionType>();

  const isFetching = useAppSelector((state) => state.user.isFetching);
  const meta = useAppSelector((state) => state.user.meta);
  const users = useAppSelector((state) => state.user.result);
  console.log("🚀 ~ UserPage ~ users:", users);
  const dispatch = useAppDispatch();
  const handleChangeData = () => {
    let result = [];
    result = users.map((item: any) => {
      return {
        _id: item._id,
        createdAt: dayjs(item.createdAt).format("DD-MM-YYYY HH:mm:ss"),
        updatedAt: dayjs(item.updatedAt).format("DD-MM-YYYY HH:mm:ss"),
        name: item.name,
        address: item.address,
        age: item.age,
        email: item.email,
        gender: item.gender,
        role: item.role.name,
      };
    });

    setDataCsv(result);
  };

  useEffect(() => {
    handleChangeData();

    return () => {};
  }, [users]);
  const handleDeleteUser = async (_id: string | undefined) => {
    if (_id) {
      const res = await callDeleteUser(_id);
      if (res && res.data) {
        message.success("Xóa User thành công");
        reloadTable();
      } else {
        notification.error({
          message: "Có lỗi xảy ra",
          description: res.message,
        });
      }
    }
  };
  const reloadTable = () => {
    tableRef?.current?.reload();
  };

  const columns: ProColumns<IUser>[] = [
    {
      title: "Id",
      dataIndex: "_id",
      width: 250,
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
      hideInSearch: true,
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: true,
    },

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
      width: 50,
      render: (_value, entity, _index, _action) => (
        <Space>
          <Access permission={ALL_PERMISSIONS.USERS.UPDATE} hideChildren>
            <EditOutlined
              style={{
                fontSize: 20,
                color: "#ffa500",
              }}
              type=""
              onClick={() => {
                setOpenModal(true);
                setDataInit(entity);
              }}
            />
          </Access>

          <Access permission={ALL_PERMISSIONS.USERS.DELETE} hideChildren>
            <Popconfirm
              placement="leftTop"
              title={"Xác nhận xóa user"}
              description={"Bạn có chắc chắn muốn xóa user này ?"}
              onConfirm={() => handleDeleteUser(entity._id)}
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
    const clone = { ...params };
    if (clone.name) clone.name = `/${clone.name}/i`;
    if (clone.email) clone.email = `/${clone.email}/i`;

    let temp = queryString.stringify(clone);

    let sortBy = "";
    if (sort && sort.name) {
      sortBy = sort.name === "ascend" ? "sort=name" : "sort=-name";
    }
    if (sort && sort.email) {
      sortBy = sort.email === "ascend" ? "sort=email" : "sort=-email";
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
    temp += "&populate=role&fields=role._id, role.name";

    return temp;
  };

  return (
    <div>
      <Access permission={ALL_PERMISSIONS.USERS.GET_PAGINATE}>
        <DataTable<IUser>
          actionRef={tableRef}
          headerTitle="Danh sách Users"
          rowKey="_id"
          loading={isFetching}
          columns={columns}
          dataSource={users}
          request={async (params, sort, filter): Promise<any> => {
            const query = buildQuery(params, sort, filter);
            dispatch(fetchUser({ query }));
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
                {/* <Button
                  icon={<TbDatabaseImport />}
                  type="primary"
                  onClick={() => {}}
                >
                  Import CSV File
                </Button> */}
                <Button
                  icon={<PlusOutlined />}
                  type="primary"
                  onClick={() => setOpenModal(true)}
                >
                  Thêm mới
                </Button>
              </>
            );
          }}
        />
      </Access>
      <ModalUser
        openModal={openModal}
        setOpenModal={setOpenModal}
        reloadTable={reloadTable}
        dataInit={dataInit}
        setDataInit={setDataInit}
      />
      <ViewDetailUser
        open={openViewDetail}
        onClose={setOpenViewDetail}
        dataInit={dataInit}
        setDataInit={setDataInit}
      />
    </div>
  );
};

export default UserPage;
