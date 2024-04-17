import "./style.scss";
import { useState, useEffect, useLayoutEffect } from "react";
import { Button, Modal, Input, Form, Select, InputNumber } from "antd";
const { TextArea } = Input;
import { serviceApi } from "../../../Entities/Services/api/service";

function CreateServiceModal({
  openServiceModal,
  setOpenServiceModal,
  messageApi,
  isEdit,
  initialValues,
}) {
  const [createService, {}] = serviceApi.useCreateServiceMutation();
  const [editService, {}] = serviceApi.useEditServiceMutation();
  const { data: serviceGroup } = serviceApi.useGetServicesGroupQuery();
  const [serviceGroupData, setServiceGroupData] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    setServiceGroupData(serviceGroup);
  }, [serviceGroup]);

  const handleCancel = () => {
    setOpenServiceModal(false);
  };

  const onFinish = async (values) => {
    if (isEdit) {
      values.service_id = initialValues?.service_id;
      const service = await editService(values);
      if (service.error) return isError(service.error.data.message);
      isSuccess("Услуга успешно изменена");
    } else {
      const service = await createService(values);
      if (service.error) return isError(service.error.data.message);
      isSuccess("Услуга успешно создана");
    }
    form.resetFields();
    setOpenServiceModal(false);
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
    <div className="CreateServiceModal-container">
      <Modal
        style={{ top: 20 }}
        className="CreateServiceModal-modal"
        open={openServiceModal}
        title={
          <div className="CreateServiceModal-title">
            <h1>{isEdit ? "// SERVICE EDIT" : "// SERVICE CREATE"}</h1>
          </div>
        }
        onCancel={handleCancel}
        footer={null}
        width={"70%"}
      >
        <Form
          form={form}
          layout="vertical"
          name="review"
          onFinish={onFinish}
          initialValues={initialValues}
          className="CreateServiceModal-form"
        >
          <Form.Item
            label="Группа услуг"
            name="service_group_id"
            rules={[
              {
                required: true,
                message: "Пожалуйства выберите, группу услуг!",
              },
            ]}
          >
            <Select size="large" placeholder="Группа услуг...">
              {serviceGroupData?.map((item, key) => (
                <Select.Option key={key} value={item.service_group_id}>
                  {item.service_group}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Название услуги"
            name="service_name"
            rules={[
              {
                required: true,
                message: "Пожалуйства введите, название услуги!",
              },
            ]}
          >
            <Input placeholder="Окрашивание" />
          </Form.Item>
          <Form.Item label="Описание" name="description">
            <TextArea
              showCount
              maxLength={100}
              placeholder="Описание..."
              style={{ height: 120, resize: "none" }}
            />
          </Form.Item>
          <Form.Item
            label="Цена"
            name="price"
            rules={[
              {
                required: true,
                message: "Пожалуйства выберите вашу оценку!",
              },
            ]}
          >
            <InputNumber style={{ width: "200px" }} />
          </Form.Item>
          <Form.Item>
            <div className="CreateServiceModal-button">
              <Button key="submit" htmlType="submit">
                {isEdit ? "\\ Сохранить \\" : "\\ Добавить \\"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default CreateServiceModal;
