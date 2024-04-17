import "./style.scss";
import { Button, Modal, Input, Form, Rate, message } from "antd";
const { TextArea } = Input;
import { reviewsApi } from "../../../Entities/Reviews/api/service";

function CreateReviewModal({
  openReviewModal,
  setOpenReviewModal,
  messageApi,
}) {
  const [createReview, {}] = reviewsApi.useCreateReviewMutation();
  const [form] = Form.useForm();

  const handleCancel = () => {
    setOpenReviewModal(false);
  };
  const onFinish = async (values) => {
    const review = await createReview(values);
    if (review.error) return isError(review.error.data.message);
    isSuccess("Отзыв успешно отправлен");
    form.resetFields();
    setOpenReviewModal(false);
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
    <div className="CreateReviewModal-container">
      <Modal
        style={{ top: 20 }}
        className="CreateReviewModal-modal"
        open={openReviewModal}
        title={
          <div className="CreateReviewModal-title">
            <img src="assets/ellipse1.png" alt="photo-about-me" />
            <h1>// REVIEW</h1>
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
          className="CreateReviewModal-form"
        >
          <Form.Item
            label="Меня зовут"
            name="client_name"
            rules={[
              {
                required: true,
                message: "Пожалуйства введите, как вас зовут!",
              },
            ]}
          >
            <Input placeholder="Фамилия имя" />
          </Form.Item>
          <Form.Item
            label="Комментарий"
            name="review_text"
            rules={[
              {
                required: true,
                message: "Пожалуйства введите ваш комментарий!",
              },
            ]}
          >
            <TextArea
              showCount
              maxLength={100}
              placeholder="Комментарий..."
              style={{ height: 120, resize: "none" }}
            />
          </Form.Item>
          <Form.Item
            label=""
            name="rate"
            rules={[
              {
                required: true,
                message: "Пожалуйства выберите вашу оценку!",
              },
            ]}
          >
            <Rate style={{ fontSize: 36 }} />
          </Form.Item>
          <Form.Item>
            <div className="CreateReviewModal-button">
              <Button key="submit" htmlType="submit">
                \\ ОТПРАВИТЬ \\
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default CreateReviewModal;
