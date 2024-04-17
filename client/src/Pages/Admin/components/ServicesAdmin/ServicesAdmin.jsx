import "./style.scss";
import { useState, useEffect } from "react";
import { Table, Dropdown, Button, Space, Input, Modal, message } from "antd";
import {
  MoreOutlined,
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  DeleteOutlined,
} from "@ant-design/icons";
import { serviceApi } from "../../../../Entities/Services/api/service";
import { CreateServiceModal } from "../../../../Widgets";

function Bookings() {
  const { data: services } = serviceApi.useGetServicesQuery();
  const [deleteService, { success: deleteSuccess }] =
    serviceApi.useDeleteServiceMutation();
  const [serviceData, setServiceData] = useState();

  const [openServiceModal, setOpenServiceModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    loadData(services);
  }, [services, deleteSuccess]);

  const loadData = (services) => {
    let tempData = [];
    if (services?.length !== 0) {
      services?.map((item, key) => {
        tempData.push({
          key: key,
          service_id: item?.service_id,
          service_name:
            item?.service_name.charAt(0).toUpperCase() +
            item?.service_name.slice(1),
          description: item?.description,
          price: item?.price,
          service_group_id: item?.service_group_id,
          service_group:
            item?.service_group.charAt(0).toUpperCase() +
            item?.service_group.slice(1),
        });
      });
      setServiceData(tempData);
    }
  };

  const [items, setItems] = useState([
    {
      label: (
        <div className="Bookings-options">
          <EditOutlined />
          <p>Редактировать</p>
        </div>
      ),
      key: "edit",
    },
    {
      label: (
        <div className="Bookings-options">
          <DeleteOutlined />
          <p>Удалить</p>
        </div>
      ),
      key: "delete",
    },
  ]);
  const [selectedRow, setSelectedRow] = useState();
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [searchText, setSearchText] = useState("");
  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const columns = [
    {
      title: "Группа",
      dataIndex: "service_group",
      key: "service_group",

      filteredValue: [searchText],
      onFilter: (value, record) =>
        String(record.service_group)
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        String(record.service_name).toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Услуга",
      dataIndex: "service_name",
      key: "service_name",
    },
    {
      title: "Описание",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Цена",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Space size="large">
          <Dropdown menu={{ items, onClick, record }} trigger={["click"]}>
            <Space>
              <Button
                onClick={() => setSelectedRow(record.key)}
                shape="circle"
                icon={<MoreOutlined />}
              />
            </Space>
          </Dropdown>
        </Space>
      ),
    },
  ];
  // Dropdown menu
  const onClick = ({ key }) => {
    if (key === "delete") {
      showDeleteConfirm();
    }
    if (key === "edit") {
      setIsEdit(true);
      setOpenServiceModal(true);
    }
    if (key === "confirm") {
      // editStatusAppointment(bookingData[selectedRow]);
    }
  };

  const { confirm } = Modal;
  const showDeleteConfirm = () => {
    confirm({
      title: "Вы уверены, что хотите удалить услугу?",
      icon: <ExclamationCircleFilled />,
      okText: "Да",
      okType: "danger",
      cancelText: "Нет",
      async onOk() {
        const response = await deleteService(
          serviceData[selectedRow]?.service_id
        );
        if (response.error) return isError(response.error.data.message);
        isSuccess("Услуга успешно удалена");
      },
    });
  };

  const isError = (messageError) => {
    messageApi.open({
      type: "error",
      content: messageError,
    });
  };

  const isSuccess = (success) => {
    messageApi.open({
      type: "success",
      content: success,
    });
  };

  const onCreate = () => {
    setIsEdit(false);
    setOpenServiceModal(true);
  };

  return (
    <div>
      {contextHolder}
      {openServiceModal && (
        <CreateServiceModal
          openServiceModal={openServiceModal}
          setOpenServiceModal={setOpenServiceModal}
          messageApi={messageApi}
          isEdit={isEdit}
          initialValues={isEdit && serviceData[selectedRow]}
        />
      )}
      <h1 style={{ fontSize: "40px", marginBottom: "20px" }}>
        Управление услугами
      </h1>
      <div>
        <div className="ServicesAdmin-inputs">
          <Input
            size={"large"}
            style={{ width: "16vw" }}
            placeholder="Поиск..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button size="large" onClick={onCreate}>
            <PlusOutlined />
            Добавить услугу
          </Button>
        </div>
        <Table
          pagination={{
            pageSize: 6,
          }}
          style={{ marginTop: "10px" }}
          columns={columns}
          onChange={handleChange}
          dataSource={serviceData ? serviceData : []}
        />
      </div>
    </div>
  );
}

export default Bookings;
