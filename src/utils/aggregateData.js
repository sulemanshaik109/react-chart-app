const getWeekNumber = (date) => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

const getStartOfWeek = (year, week) => {
  const firstDayOfYear = new Date(year, 0, 1);
  const days = (week - 1) * 7;
  return new Date(firstDayOfYear.setDate(firstDayOfYear.getDate() + days - firstDayOfYear.getDay() + 1));
};

export const aggregateWeeklyData = (data) => {
  const weeks = {};

  data.forEach(item => {
    const date = new Date(item.timestamp);
    const year = date.getFullYear();
    const week = getWeekNumber(date);
    const yearWeek = `${year}-W${week}`;

    if (!weeks[yearWeek]) {
      weeks[yearWeek] = {
        year,
        week,
        totalValue: 0,
        count: 0
      };
    }
    weeks[yearWeek].totalValue += item.value;
    weeks[yearWeek].count += 1;
  });

  return Object.values(weeks).map(week => {
    const startOfWeek = getStartOfWeek(week.year, week.week);
    return {
      timestamp: startOfWeek.toDateString(),
      value: Math.ceil(week.totalValue / week.count)
    };
  });
};


export const aggregateMonthlyData = (data) => {
    const months = {};
  
    data.forEach(item => {
      const date = new Date(item.timestamp);
      const year = date.getFullYear();
      const standardMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const month = date.getMonth()
      const yearMonth = standardMonths[month] + " " + year;
  
      if (!months[yearMonth]) {
        months[yearMonth] = {
          yearMonth,
          totalValue: 0,
          count: 0
        };
      }
      months[yearMonth].totalValue += item.value;
      months[yearMonth].count += 1;
    });
  
    return Object.values(months).map(month => ({
      timestamp: month.yearMonth,
      value: Math.ceil(month.totalValue / month.count)
    }));
  };
