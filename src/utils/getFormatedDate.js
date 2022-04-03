export const getFormattedDate = () => {
  const dateTime = new Date();
  const dd = String(dateTime.getDate()).padStart(2, '0');
  const mm = String(dateTime.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = dateTime.getFullYear();
  const todayDate = mm + '/' + dd + '/' + yyyy;
  return todayDate;
}