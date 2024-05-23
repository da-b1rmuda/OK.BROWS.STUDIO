import "./style.scss";
import { useState, useLayoutEffect, useEffect } from "react";
import {
  Table,
  Dropdown,
  Button,
  Tag,
  Space,
  Input,
  Divider,
  Modal,
  message,
} from "antd";
import {
  MoreOutlined,
  SearchOutlined,
  CheckSquareOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  DeleteOutlined,
} from "@ant-design/icons";
import { bookingApi } from "../../../../Entities/Booking/api/service";
import { CreateBookingModal, Report } from "../../../../Widgets";

function Bookings() {
  const { data: booking } = bookingApi.useGetAppointmentsQuery();
  const [editStatusAppointment, { success }] =
    bookingApi.useEditStatusAppointmentMutation();
  const [deleteAppointment] = bookingApi.useDeleteAppointmentMutation();
  const [bookingData, setBookingData] = useState();

  useEffect(() => {
    loadData(booking);
  }, []);
  useLayoutEffect(() => {
    loadData(booking);
  }, [booking, success]);

  const convertDate = (date) => {
    // Получаем день, месяц и год из объекта Date
    var day = date.getDate();
    var month = date.getMonth() + 1; // Месяцы начинаются с 0, поэтому добавляем 1
    var year = date.getFullYear();
    // Приводим день и месяц к формату с ведущими нулями, если они меньше 10
    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;
    // Формируем строку в нужном формате
    var formattedDate = year + "-" + month + "-" + day;
    return formattedDate;
  };

  const loadData = (bookings) => {
    let tempData = [];
    if (bookings?.length !== 0) {
      bookings?.map((item, key) => {
        tempData.push({
          key: key,
          appointment_id: item?.appointment_id,
          user_name: item?.user_name,
          appointment_time: item?.appointment_time,
          appointment_date: convertDate(new Date(item?.appointment_date)),
          status: item?.status,
          price: item?.price,
          service_id: item?.service_id,
          service_name:
            item?.service_name.charAt(0).toUpperCase() +
            item?.service_name.slice(1),
        });
      });
      setBookingData(tempData);
    }
  };

  const [items, setItems] = useState([
    {
      label: (
        <div className="Bookings-options">
          <CheckSquareOutlined />
          <p>Подтвердить</p>
        </div>
      ),
      key: "confirm",
    },
    {
      label: <Divider style={{ margin: "0" }} />,
    },
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
      title: "Клиент",
      dataIndex: "user_name",
      key: "user_name",

      filteredValue: [searchText],
      onFilter: (value, record) =>
        String(record.user_name).toLowerCase().includes(value.toLowerCase()) ||
        String(record.appointment_date)
          .toLowerCase()
          .includes(value.toLowerCase()),
    },
    {
      title: "Услуга",
      dataIndex: "service_name",
      key: "service_name",
    },
    {
      title: "Цена",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      render: (_, { status }) => <Tag>{status}</Tag>,
    },
    {
      title: "Дата",
      dataIndex: "appointment_date",
      key: "appointment_date",
    },
    {
      title: "Время",
      dataIndex: "appointment_time",
      key: "appointment_time",
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
      setOpenBookingModal(true);
    }
    if (key === "confirm") {
      editStatusAppointment(bookingData[selectedRow]);
    }
  };

  const { confirm } = Modal;
  const showDeleteConfirm = () => {
    confirm({
      title: "Вы уверены, что хотите удалить запись?",
      icon: <ExclamationCircleFilled />,
      okText: "Да",
      okType: "danger",
      cancelText: "Нет",
      async onOk() {
        const response = await deleteAppointment(
          bookingData[selectedRow]?.appointment_id
        );
        if (response.error) return isError(response.error.data.message);
        isSuccess("Запись успешно удалена");
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

  const [openBookingModal, setOpenBookingModal] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <div>
      {contextHolder}
      {openBookingModal && (
        <CreateBookingModal
          openBookingModal={openBookingModal}
          setOpenBookingModal={setOpenBookingModal}
          messageApi={messageApi}
          isEdit={true}
          initialValues={bookingData[selectedRow]}
        />
      )}
      <h1 style={{ fontSize: "40px", marginBottom: "20px" }}>
        Управление записями клиентов
      </h1>
      <div>
        <div className="Bookings-header">
          <Input
            size={"large"}
            style={{ width: "16vw" }}
            placeholder="Поиск..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Report />
        </div>
        <Table
          pagination={{
            pageSize: 6,
          }}
          style={{ marginTop: "10px" }}
          columns={columns}
          onChange={handleChange}
          dataSource={bookingData ? bookingData : []}
        />
      </div>
    </div>
  );
}

export default Bookings;
