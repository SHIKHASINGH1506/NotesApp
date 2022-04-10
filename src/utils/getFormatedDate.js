export const getFormattedDate = () => {
  // const dateTime = new Date();
  // const dd = String(dateTime.getDate()).padStart(2, '0');
  // const mm = String(dateTime.getMonth() + 1).padStart(2, '0'); //January is 0!
  // const yyyy = dateTime.getFullYear();
  // const todayDate = mm + '/' + dd + '/' + yyyy;
  // return todayDate;
  const today = new Date();
  const date = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
  const month = today.getMonth() < 9 ? `0${today.getMonth() + 1}` : today.getMonth()+1;
  const hours = today.getHours() < 10 ? `0${today.getHours()}` : today.getHours();
  const mins = today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes();
  const secs = today.getSeconds() < 10 ? `0${today.getSeconds()}` : today.getSeconds();
  return `${date}/${month}/${today.getFullYear()}, ${hours}:${mins}:${secs}`;
}