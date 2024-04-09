// Function for formatting the date
export const formatDate = (dateString) => {
  const date = new Date(dateString);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();

  return `${month} ${day}, ${year}`;
};

export const getClimateColor = (climate) => {
  switch (climate) {
    case "hot":
      return "bg-green-500";
    case "tropical":
      return "bg-yellow-500";
    case "temperate":
      return "bg-red-500";
    default:
      return "";
  }
};
