import DataTable from "@/components/client/data-table";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ISkill } from "@/types/backend";
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
import { callDeleteSkill } from "@/config/api";
import { TbDatabaseExport, TbDatabaseImport } from "react-icons/tb";
import { CSVLink } from "react-csv";

const SkillPage = () => {
  const tableRef = useRef<ActionType>();
  const [dataCsv, setDataCsv] = useState<any>();
  const isFetching = useAppSelector((state) => state.skill.isFetching);
  const meta = useAppSelector((state) => state.skill.meta);
  const skills = useAppSelector((state) => state.skill.result);
  const dispatch = useAppDispatch();
  const reloadTable = () => {
    tableRef?.current?.reload();
  };
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [dataInit, setDataInit] = useState<null | ISkill>(null);
  const columns: ProColumns<ISkill>[] = [
    {
      title: "Id",
      dataIndex: "_id",
      width: 210,
      hideInSearch: true,
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      hideInSearch: true,
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
      width: 100,
      render: (_value, entity, _index, _action) => (
        <Space>
          <Access permission={ALL_PERMISSIONS.SKILLS.UPDATE} hideChildren>
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
          <Access permission={ALL_PERMISSIONS.SKILLS.DELETE} hideChildren>
            <Popconfirm
              placement="leftTop"
              title={"Xác nhận xóa skill"}
              description={"Bạn có chắc chắn muốn xóa skill này ?"}
              onConfirm={() => {
                handleDeleteSkill(entity._id);
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
    const clone = { ...params };
    if (clone.name) clone.name = `/${clone.name}/i`;
    if (clone?.status?.length) {
      clone.status = clone.status.join(",");
    }

    let temp = queryString.stringify(clone);

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
  const handleDeleteSkill = async (_id: string | undefined) => {
    if (_id) {
      const res = await callDeleteSkill(_id);
      if (res && res.data) {
        message.success("Xóa Skill thành công");
        reloadTable();
      } else {
        notification.error({
          message: "Có lỗi xảy ra",
          description: res.message,
        });
      }
    }
  };

  const handleChangeData = () => {
    let result = [];
    result = skills.map((item: any) => {
      return {
        _id: item._id,
        createdAt: dayjs(item.createdAt).format("DD-MM-YYYY HH:mm:ss"),
        createdBy: item.createdBy.email,
        updatedAt: dayjs(item.updatedAt).format("DD-MM-YYYY HH:mm:ss"),
        updatedBy:
          item.updatedBy && item.updatedBy.email ? item.updatedBy.email : " ",
        name: item.name,
        description: item.description,
      };
    });

    setDataCsv(result);
  };

  useEffect(() => {
    handleChangeData();

    return () => {};
  }, [skills]);
  return (
    <div>
      <Access permission={ALL_PERMISSIONS.SKILLS.GET_PAGINATE}>
        <DataTable<ISkill>
          actionRef={tableRef}
          headerTitle="Danh sách Skills"
          rowKey="_id"
          loading={isFetching}
          columns={columns}
          dataSource={skills}
          request={async (params, sort, filter): Promise<any> => {
            const query = buildQuery(params, sort, filter);
            dispatch(fetchSkill({ query }));
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
              <Access permission={ALL_PERMISSIONS.SKILLS.CREATE} hideChildren>
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
                  <Button
                    icon={<TbDatabaseImport />}
                    type="primary"
                    onClick={() => {}}
                  >
                    Import CSV File
                  </Button>
                  <Button
                    icon={<PlusOutlined />}
                    type="primary"
                    onClick={() => setOpenModal(true)}
                  >
                    Thêm mới
                  </Button>
                </>
              </Access>
            );
          }}
        />
      </Access>
      <ModalSkill
        openModal={openModal}
        setOpenModal={setOpenModal}
        reloadTable={reloadTable}
        dataInit={dataInit}
        setDataInit={setDataInit}
      />
    </div>
  );
};

export default SkillPage;
