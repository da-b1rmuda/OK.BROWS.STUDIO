import "./style.scss";
import { useState, useEffect } from "react";
import { Button, Modal, Select, Form, Radio } from "antd";
import { getDayOfWeek } from "../../../Shared/lib/getDayOfWeek";
import { masterApi } from "../../../Entities/Master/api/service";
import { bookingApi } from "../../../Entities/Booking/api/service";
import { serviceApi } from "../../../Entities/Services/api/service";
import { useLayoutEffect } from "react";

function CreateBookingModal({
  setOpenBookingModal,
  openBookingModal,
  messageApi,
  isEdit,
  initialValues,
}) {
  const { data: master } = masterApi.useGetMastersQuery();
  const [masterData, setMasterData] = useState();
  const { data: services } = serviceApi.useGetServicesQuery();
  const [serviceData, setServiceData] = useState();
  const { data: booking } = bookingApi.useGetAppointmentsQuery();
  const [bookingData, setBookingData] = useState();
  const [createAppointment, {}] = bookingApi.useCreateAppointmentMutation();
  const [editAppointment, {}] = bookingApi.useEditAppointmentMutation();

  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookedTimes, setBookedTimes] = useState({});
  const [selectedTime, setSelectedTime] = useState(
    initialValues?.appointment_time || null
  );
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    setMasterData(master);
    setAvailableDates(master && master[0].work_days);
    setServiceData(services);
    setBookingData(booking);
    setBookedTimes(groupAppointmentsByDate(booking));
  }, [master, services, booking]);

  useEffect(() => {
    if (initialValues && initialValues.appointment_time) {
      setSelectedTime(initialValues.appointment_time);
    }
  }, [initialValues]);

  function groupAppointmentsByDate(appointments) {
    const result = {};
    appointments?.forEach((appointment) => {
      const date = new Date(appointment.appointment_date);
      date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
      const time = appointment.appointment_time;
      const formattedDate = date.toISOString().split("T")[0];
      if (!result[formattedDate]) {
        result[formattedDate] = [time];
      } else {
        result[formattedDate].push(time);
      }
    });
    return result;
  }

  const transformDataSelect = (data) => {
    return data?.map((item) => ({
      value: item.service_id,
      label: (
        <div className="CreateBookingModal-selectService">
          <p>{item.service_name}</p> <p>({item.price})</p>
        </div>
      ),
    }));
  };

  const handleCancel = () => {
    setOpenBookingModal(false);
  };

  const [form] = Form.useForm();

  useLayoutEffect(() => {
    handleDateChange(initialValues?.appointment_date);
    setIsLoad(true);
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    form.resetFields(["appointment_time"]);
    if (isLoad) setSelectedTime(null);
  };

  const renderTimeBlocks = () => {
    const startHour = masterData && masterData[0]?.work_time[0];
    const endHour = masterData && masterData[0]?.work_time[1];
    const hoursRange = Array.from(
      { length: endHour - startHour + 1 },
      (_, i) => startHour + i
    );

    return (
      <Radio.Group
        buttonStyle="solid"
        style={{ marginBottom: "10px" }}
        value={selectedTime}
        onChange={(e) => setSelectedTime(e.target.value)}
      >
        {hoursRange?.map((hour) => {
          const time = `${hour}:00`;
          const isBooked =
            bookedTimes &&
            bookedTimes[selectedDate] &&
            bookedTimes[selectedDate].includes(time);
          return (
            <Radio.Button
              value={time}
              key={time}
              disabled={
                initialValues && time === initialValues.appointment_time
                  ? false
                  : isBooked
              }
            >
              {time}
            </Radio.Button>
          );
        })}
      </Radio.Group>
    );
  };

  useEffect(() => {
    if (initialValues?.appointment_date) {
      handleDateChange(initialValues.appointment_date);
    }
  }, [initialValues]);

  const onFinish = async (values) => {
    const user = JSON.parse(localStorage.getItem("userData"));
    values.client_id = user.user_id;
    if (isEdit) {
      values.appointment_id = initialValues?.appointment_id;
      const booking = await editAppointment(values);
      if (booking.error) return isError(booking.error.data.message);
      isSuccess("Запись успешно изменена");
    } else {
      const booking = await createAppointment(values);
      if (booking.error) return isError(booking.error.data.message);
      isSuccess("Вы успешно записались");
    }

    form.resetFields();
    setOpenBookingModal(false);
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
    <div className="CreateBookingModal-container">
      <Modal
        className="CreateBookingModal-modal"
        open={openBookingModal}
        title={isEdit ? "// EDIT BOOKING" : "// BOOKING"}
        onCancel={handleCancel}
        footer={null}
        width={"70%"}
      >
        <Form
          layout="vertical"
          name="booking"
          onFinish={onFinish}
          form={form}
          initialValues={isEdit ? initialValues : {}}
          className="CreateBookingModal-form"
        >
          <Form.Item
            label="Дата"
            name="appointment_date"
            rules={[
              {
                required: true,
                message: "Пожалуйства выберите дату!",
              },
            ]}
          >
            <Select
              onChange={handleDateChange}
              className="CreateBookingModal-select"
              style={{ width: "350px" }}
            >
              {availableDates?.map((date, key) => (
                <Select.Option key={key} value={date}>
                  {new Date(date).toLocaleDateString()} (
                  {getDayOfWeek(new Date(date))})
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Время"
            name="appointment_time"
            rules={[
              {
                required: true,
                message: "Пожалуйста, выберите время!",
              },
            ]}
          >
            {selectedDate ? (
              <div className="CreateBookingModal-timeBlock-container">
                {renderTimeBlocks()}
              </div>
            ) : (
              <div className="CreateBookingModal-timeBlock-filler">
                <p>Дата не выбрана</p>
              </div>
            )}
          </Form.Item>
          <Form.Item
            label="Процедура"
            name="service_id"
            rules={[
              {
                required: true,
                message: "Пожалуйста, выберите процедуру!",
              },
            ]}
          >
            <Select
              options={transformDataSelect(serviceData)}
              className="CreateBookingModal-select"
            />
          </Form.Item>
          <Form.Item>
            <div className="CreateBookingModal-button">
              <Button key="submit" htmlType="submit">
                {isEdit ? "\\ СОХРАНИТЬ \\" : "\\ ЗАПИСАТЬСЯ \\"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default CreateBookingModal;
