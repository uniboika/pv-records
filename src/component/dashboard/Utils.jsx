// Utils.js

const Utils = {
  months: ({ count = 12, locale = "en-US" } = {}) => {
    const months = [];
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    for (let i = 0; i < count; i++) {
      const month = (currentMonth + i) % 12;
      const yearOffset = Math.floor((currentMonth + i) / 12);
      const year = currentYear + yearOffset;
      months.push(
        new Date(year, month, 1).toLocaleDateString(locale, { month: "long" })
      );
    }

    return months;
  },
};

export { Utils }; // Export Utils as a named export
