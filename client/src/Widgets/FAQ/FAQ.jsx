import "./style.scss";
import { Collapse } from "antd";
import { stub } from "../FAQ/stub.jsx";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

function FAQ() {
  const PlusMinusIcons = ({ isActive }) => {
    return isActive ? <MinusOutlined /> : <PlusOutlined />;
  };
  return (
    <div id="faqSection">
      <div className="FAQ-title">
        <h1>// FAQ</h1>
      </div>
      <div className="FAQ-collapse">
        <Collapse
          items={stub}
          bordered={false}
          expandIcon={({ isActive }) => <PlusMinusIcons isActive={isActive} />}
          expandIconPosition={"end"}
        />
      </div>
    </div>
  );
}

export default FAQ;
