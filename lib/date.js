export default {
    isLate(date) {
        return (
          new Date(date.toDateString()) < new Date(new Date().toDateString())
        );
      },
      isToday(someDate) {
        const today = new Date();
        return (
          someDate.getDate() == today.getDate() &&
          someDate.getMonth() == today.getMonth() &&
          someDate.getFullYear() == today.getFullYear()
        );
      },
  
}