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
    case "warm":
      return "bg-green-400";
    case "tropical":
      return "bg-yellow-400";
    case "hot":
      return "bg-red-400";
    case "cold":
      return "bg-blue-400";
    default:
      return "bg-purple-400";
  }
};

export const capitalizeFirstLetter = (str) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const formatDateToEdit = (dateString) => {
  const date = new Date(dateString);

  // Extract year, month, and day
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
  const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if needed

  // Return formatted date string in "yyyy-MM-dd" format
  return `${year}-${month}-${day}`;
};
