export default function parseColor(color) {
    switch (color) {
        case "red":
          return "bg-red-400 text-white dark:border-red-400";
        case "indigo":
          return "bg-indigo-400 text-white dark:border-indigo-400";
        case "blue":
          return "bg-blue-400 text-white dark:border-blue-400";
        case "yellow":
          return "bg-yellow-400  text-white dark:border-yellow-400";
        case "green":
          return "bg-green-400 text-white dark:border-green-400";
        case "purple":
          return "bg-purple-400 text-white dark:border-purple-400";
        default:
          return "bg-red-200 text-white dark:border-red-400";
      }

}