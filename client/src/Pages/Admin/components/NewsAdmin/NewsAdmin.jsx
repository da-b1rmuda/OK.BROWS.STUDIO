import "./style.scss";
import { useState, useLayoutEffect } from "react";
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
import { newsApi } from "../../../../Entities/News/api/service";
import NewsEditor from "./NewsEditor";
import HtmlToImageConverter from "./HtmlToImageConverter";

function NewsAdmin() {
  const { data: news } = newsApi.useGetNewsQuery();
  const [deleteNews, { success: deleteSuccess }] =
    newsApi.useDeleteNewsMutation();
  const [newsData, setNewsData] = useState();
  const [messageApi, contextHolder] = message.useMessage();

  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useLayoutEffect(() => {
    loadData(news);
  }, [news, deleteSuccess]);

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

  const loadData = (news) => {
    let tempData = [];
    if (news?.length !== 0) {
      news?.map((item, key) => {
        tempData.push({
          key: key,
          news_id: item?.news_id,
          news_content: item?.news_content,
          news_date: convertDate(new Date(item?.news_date)),
        });
      });
      setNewsData(tempData);
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
  const [isLoading, setIsLoading] = useState();

  const columns = [
    {
      title: "Новость",
      dataIndex: "news_content",
      key: "news_content",
      render: (news_content) => <HtmlToImageConverter html={news_content} />,
    },
    {
      title: "Дата создания",
      dataIndex: "news_date",
      key: "news_date",
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
    }
  };

  const { confirm } = Modal;
  const showDeleteConfirm = () => {
    confirm({
      title: "Вы уверены, что хотите удалить новость?",
      icon: <ExclamationCircleFilled />,
      okText: "Да",
      okType: "danger",
      cancelText: "Нет",
      async onOk() {
        const response = await deleteNews(newsData[selectedRow]?.news_id);
        if (response.error) return isError(response.error.data.message);
        isSuccess("Новость успешно удалена");
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
    setIsCreate(true);
  };

  return (
    <>
      {contextHolder}
      {isCreate || isEdit ? (
        <NewsEditor
          initialValues={newsData[selectedRow]}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          setIsCreate={setIsCreate}
          messageApi={messageApi}
        />
      ) : (
        <div>
          <h1 style={{ fontSize: "40px", marginBottom: "20px" }}>
            Управление новостями
          </h1>
          <div className="NewsAdmin-content">
            <div className="NewsAdmin-button">
              <Button onClick={onCreate}>
                <PlusOutlined />
                Добавить новость
              </Button>
            </div>
            <Table
              response={true}
              pagination={{
                pageSize: 1,
              }}
              style={{ marginTop: "10px" }}
              columns={columns}
              dataSource={newsData ? newsData : []}
              className="NewsAdmin-table"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default NewsAdmin;
