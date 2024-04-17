import "./style.scss";
import { Calendar, Button, InputNumber, message } from "antd";
import { useState, useEffect } from "react";
import moment from "moment";
import { masterApi } from "../../../../Entities/Master/api/service";
import { bookingApi } from "../../../../Entities/Booking/api/service";

function PlaningDays() {
  const [editMasterWorking, {}] = masterApi.useEditMasterWorkingMutation();
  const { data: master } = masterApi.useGetMastersQuery();
  const { data: bookings } = bookingApi.useGetAppointmentsQuery();

  const [messageApi, contextHolder] = message.useMessage();
  const [selectedDates, setSelectedDates] = useState([]);
  const [dayWorkStart, setDayWorkStart] = useState(10);
  const [dayWorkEnd, setDayWorkEnd] = useState(18);
  const [masterData, setMasterData] = useState();

  useEffect(() => {
    setMasterData(master);
    setDayWorkEnd(master && master[0]?.work_time[1]);
    setDayWorkStart(master && master[0]?.work_time[0]);
    setSelectedDates(master && master[0]?.work_days);
  }, [master]);

  console.log(bookings);

  const handleButtonClick = async () => {
    // // Проверка, если dayWorkStart больше чем appointment_time любого объекта
    // const isStartConflict = bookings.some(
    //   (bookings) => dayWorkStart > bookings.appointment_time
    // );
    // // Проверка, если dayWorkEnd меньше чем appointment_time любого объекта
    // const isEndConflict = bookings.some(
    //   (bookings) => dayWorkEnd < bookings.appointment_time
    // );
    // if (isStartConflict) {
    //   isError(
    //     "У вас есть записи, которые назначены на более раннюю дату, чем вы выбрали"
    //   );
    // } else if (isEndConflict) {
    //   isError(
    //     "У вас есть записи, которые назначены на более позднюю дату, чем вы выбрали"
    //   );
    // } else {
    const masterWorking = await editMasterWorking({
      work_days: selectedDates,
      work_time: [dayWorkStart, dayWorkEnd],
    });
    if (masterWorking.error) return isError(masterWorking.error.data.message);
    isSuccess("Рабочее время изменено");
    // }
  };

  const isError = (message) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };

  const isSuccess = (message) => {
    messageApi.open({
      type: "success",
      content: message,
    });
  };

  const onChangeDayWorkStart = (value) => {
    setDayWorkStart(value);
  };

  const onChangeDayWorkEnd = (value) => {
    setDayWorkEnd(value);
  };

  // Определите начальную и конечную даты для validRange
  const validRange = [moment().startOf("month"), moment().add(1, "years")]; // Например, 10 лет вперёд

  const handleDateSelect = (value) => {
    const date = value.format("YYYY-MM-DD");
    const index = selectedDates?.indexOf(date);
    if (index === -1) {
      setSelectedDates([...selectedDates, date]);
    } else {
      setSelectedDates(selectedDates.filter((d) => d !== date));
    }
  };

  const dateCellRender = (value) => {
    const dateStr = value.format("YYYY-MM-DD");
    const isSelected = selectedDates?.includes(dateStr);
    return (
      <div
        className={`ant-picker-cell-inner ${isSelected ? "selected-cell" : ""}`}
      ></div>
    );
  };

  const disabledDate = (current) => {
    // Не позволять выбирать даты до сегодняшнего дня
    return current && current < moment().startOf("day");
  };

  const [preventDateSelection, setPreventDateSelection] = useState(false);
  const handlePanelChange = (value, mode) => {
    if (preventDateSelection) {
      setPreventDateSelection(false);
      return;
    }
  };

  return (
    <>
      {contextHolder}
      <div className="PlaningDays-container">
        <h1 style={{ fontSize: "40px", marginBottom: "20px" }}>
          Планирование рабочего времени
        </h1>
        <h2>Дни работы</h2>
        <Calendar
          onPanelChange={handlePanelChange}
          cellRender={dateCellRender}
          onSelect={handleDateSelect}
          disabledDate={disabledDate}
          validRange={validRange}
          mode="month"
          className="PlaningDays-calendar"
        />
        <h2>Время работы</h2>
        <div className="PlaningDays-time">
          <div className="PlaningDays-time-block">
            <p>Начало рабочего времени</p>
            <InputNumber
              max={10}
              min={4}
              defaultValue={10}
              value={dayWorkStart}
              onChange={onChangeDayWorkStart}
            />
          </div>
          <div className="PlaningDays-time-block">
            <p>Конец рабочего времени</p>
            <InputNumber
              max={23}
              min={11}
              defaultValue={18}
              value={dayWorkEnd}
              onChange={onChangeDayWorkEnd}
            />
          </div>
        </div>
        <div className="PlaningDays-button">
          <Button type="primary" onClick={handleButtonClick}>
            Сохранить изменения
          </Button>
        </div>
      </div>
    </>
  );
}

export default PlaningDays;
