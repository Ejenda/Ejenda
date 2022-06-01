export default {
  parseColorText(color) {
    switch (color) {
      case "red":
        return "text-red-400";
      case "indigo":
        return "text-indigo-400";
      case "blue":
        return "text-blue-400";
      case "yellow":
        return "text-amber-400";
      case "green":
        return "text-emerald-400";
      case "purple":
        return "text-purple-400";
      default:
        return "text-red-200";
    }
  },
  parseColorBackground(color) {
    switch (color) {
      case "red":
        return "bg-red-400 text-white";
      case "indigo":
        return "bg-indigo-400 text-white";
      case "blue":
        return "bg-blue-400 text-white";
      case "yellow":
        return "bg-amber-400  text-white";
      case "green":
        return "bg-emerald-400 text-white";
      case "purple":
        return "bg-purple-400 text-white";
      default:
        return "bg-red-200 text-white";
    }
  },
  parseColor(color, bg = false) {
    switch (color) {
      case "red":
        return "-bg-red-400 text-white border-red-500";
      case "indigo":
        return "-bg-indigo-400 text-white border-indigo-500";
      case "blue":
        return "-bg-blue-400 text-white border-blue-500";
      case "yellow":
        return "-bg-amber-400  text-white border-amber-500";
      case "green":
        return "-bg-emerald-400 text-white border-emerald-500";
      case "purple":
        return "-bg-purple-400 text-white border-purple-500";
      default:
        return "-bg-red-200 text-white border-red-500";
    }
  },
};
