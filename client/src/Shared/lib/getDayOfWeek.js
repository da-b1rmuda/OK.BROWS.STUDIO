export const getDayOfWeek = (dateString) => {
  const daysOfWeek = [
    "воскресенье",
    "понедельник",
    "вторник",
    "среда",
    "четверг",
    "пятница",
    "суббота",
  ];
  const date = new Date(dateString);
  return daysOfWeek[date.getDay()];
};
