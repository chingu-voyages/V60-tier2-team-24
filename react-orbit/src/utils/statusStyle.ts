export const getStatusStyles = (status: string) => {
  switch (status.toLowerCase()) {
    case "rejected":
      return {
        border: "border-red-700",
        badge: "bg-red-200 text-red-800",
      };
    case "interview":
      return {
        border: "border-blue-500",
        badge: "bg-blue-200 text-gray-800",
      };
    case "accepted":
    case "offer":
      return {
        border: "border-green-700",
        badge: "bg-green-700 text-gray-200",
      };
    case "applied":
    default:
      return {
        border: "border-gray-400",
        badge: "bg-gray-200 text-gray-500",
      };
  }
};
