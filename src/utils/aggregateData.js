const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
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
          yearWeek,
          totalValue: 0,
          count: 0
        };
      }
      weeks[yearWeek].totalValue += item.value;
      weeks[yearWeek].count += 1;
    });
  
    return Object.values(weeks).map(week => ({
      timestamp: week.yearWeek,
      value: week.totalValue / week.count
    }));
};

export const aggregateMonthlyData = (data) => {
    const months = {};
  
    data.forEach(item => {
      const date = new Date(item.timestamp);
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // Months are zero-indexed in JavaScript
      const yearMonth = `${year}-${month.toString().padStart(2, '0')}`;
  
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
      value: month.totalValue / month.count
    }));
  };
