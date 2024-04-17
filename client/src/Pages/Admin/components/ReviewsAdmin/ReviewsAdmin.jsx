import "./style.scss";
import { useState, useEffect } from "react";
import {
  Table,
  Dropdown,
  Button,
  Space,
  Input,
  Modal,
  message,
  Rate,
} from "antd";
import {
  MoreOutlined,
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  DeleteOutlined,
} from "@ant-design/icons";
import { reviewsApi } from "../../../../Entities/Reviews/api/service";

function ReviewsAdmin() {
  const { data: reviews } = reviewsApi.useGetAllReviewsQuery();
  const [deleteReview, { success: deleteSuccess }] =
    reviewsApi.useDeleteReviewMutation();
  const [reviewData, setReviewData] = useState();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    loadData(reviews);
  }, [reviews, deleteSuccess]);

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

  const loadData = (reviews) => {
    let tempData = [];
    if (reviews?.length !== 0) {
      reviews?.map((item, key) => {
        tempData.push({
          key: key,
          review_id: item?.review_id,
          client_name: item?.client_name,
          review_text: item?.review_text,
          rate: item?.rate,
          review_date: convertDate(new Date(item?.review_date)),
        });
      });
      setReviewData(tempData);
    }
  };

  const [items, setItems] = useState([
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
      title: "Имя клиента",
      dataIndex: "client_name",
      key: "client_name",

      filteredValue: [searchText],
      onFilter: (value, record) =>
        String(record.client_name)
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        String(record.review_text)
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        String(record.rate).toLowerCase().includes(value.toLowerCase()) ||
        String(record.review_date).toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Комментарий",
      dataIndex: "review_text",
      key: "review_text",
      width: 600,
    },
    {
      title: "Оценка",
      dataIndex: "rate",
      key: "rate",
      render: (rate) => <Rate disabled value={rate} />,
    },
    {
      title: "Дата",
      dataIndex: "review_date",
      key: "review_date",
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
  };

  const { confirm } = Modal;
  const showDeleteConfirm = () => {
    confirm({
      title: "Вы уверены, что хотите удалить отзыв?",
      icon: <ExclamationCircleFilled />,
      okText: "Да",
      okType: "danger",
      cancelText: "Нет",
      async onOk() {
        const response = await deleteReview(reviewData[selectedRow]?.review_id);
        if (response.error) return isError(response.error.data.message);
        isSuccess("Отзыв успешно удален");
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

  return (
    <div>
      {contextHolder}
      <h1 style={{ fontSize: "40px", marginBottom: "20px" }}>
        Управление отзывами
      </h1>
      <div>
        <Input
          size={"large"}
          style={{ width: "16vw" }}
          placeholder="Поиск..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Table
          pagination={{
            pageSize: 6,
          }}
          style={{ marginTop: "10px" }}
          columns={columns}
          onChange={handleChange}
          dataSource={reviewData ? reviewData : []}
        />
      </div>
    </div>
  );
}

export default ReviewsAdmin;
