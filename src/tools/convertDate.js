export  const convertDate_to_YMD = (date) => {
  // Obtener la fecha actual
  const currentDate = date;

  // Obtener año, mes y día
  const year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1; // Los meses en JavaScript comienzan desde 0
  let day = currentDate.getDate();

  // Asegurarse de que el mes y el día tengan dos dígitos
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }

  // Formatear la fecha en 'yyyymmdd'
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};
