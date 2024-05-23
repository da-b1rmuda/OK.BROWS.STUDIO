import "./style.scss";
import { Button, Table } from "antd";
import { useRef, useEffect, useState } from "react";
import ReactToPrint from "react-to-print";
import { bookingApi } from "../../Entities/Booking/api/service";

const Report = () => {
  const { data: totalSum } = bookingApi.useGetTotalSumQuery();
  const [data, setData] = useState([]);
  const loadData = (data) => {
    const newData = data.map((item, key) => ({
      ...item,
      key: key,
      total_price: parseInt(item.total_price),
    }));
    setData(newData);
  };
  useEffect(() => {
    if (totalSum) {
      loadData(totalSum);
    }
  }, [totalSum]);

  let refTotalSum = useRef(null);

  const total = data?.reduce((acc, curr) => acc + curr.total_price, 0);

  const columns = [
    {
      title: <span style={{ fontSize: "30px" }}>Месяц</span>,
      dataIndex: "month",
      align: "center",
      render: (text) => <span style={{ fontSize: "30px" }}>{text}</span>,
    },
    {
      title: <span style={{ fontSize: "30px" }}>Сумма, рубли</span>,
      dataIndex: "total_price",
      align: "right",
      render: (text, record) => (
        <span
          style={{ fontSize: "30px" }}
        >{`${record.total_price?.toLocaleString()}`}</span>
      ),
    },
  ];

  return (
    <div>
      <ReactToPrint
        trigger={() => {
          return <Button>Получить отчет о прибыли</Button>;
        }}
        content={() => refTotalSum}
      />
      <div style={{ display: "none" }}>
        <div ref={(el) => (refTotalSum = el)} style={{ margin: "10px" }}>
          <Table
            columns={columns}
            dataSource={data ? data : null}
            bordered
            pagination={false}
            title={() => (
              <span style={{ fontSize: "30px" }}>
                <b>Общая прибыль</b>
              </span>
            )}
            footer={() => (
              <div style={{ textAlign: "right" }}>
                <b>
                  <span style={{ fontSize: "30px", marginRight: "1vw" }}>
                    Итого:
                  </span>
                  <span
                    style={{ fontSize: "30px" }}
                  >{`${total?.toLocaleString()} руб.`}</span>
                </b>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Report;
