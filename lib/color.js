export default function parseColor(color) {
    switch (color) {
        case "red":
          return "bg-red-400 text-white dark:bg-opacity-75";
        case "indigo":
          return "bg-indigo-400 text-white";
        case "blue":
          return "bg-blue-400 text-white";
        case "yellow":
          return "bg-yellow-400 dark:bg-yellow-300 dark:bg-opacity-75 text-white";
        case "green":
          return "bg-green-400 text-white";
        case "purple":
          return "bg-purple-400 text-white";
        default:
          return "bg-red-200 text-white";
      }

}