interface ThemeTypes {
  type: 'light' | 'night';
}
/**
 * 判断当前时间是晚上还是白天
 * @returns {string} light | night
 */
const getDefaultTheme = (): ThemeTypes['type'] => {
  const endTime = new Date().setHours(6, 0, 0, 0); // 当天6点
  const startTime = new Date().setHours(18, 0, 0, 0); // 当天18点
  const justNowTime = new Date().getTime(); // 现在
  let defaultTheme: ThemeTypes['type'] = 'light';

  if (justNowTime > endTime) {
    // 过了早上6点
    if (justNowTime > startTime) {
      // 过晚上6点，晚上
      defaultTheme = 'night';
    } else {
      // 白天
      defaultTheme = 'light';
    }
  } else {
    // 还是晚上
    defaultTheme = 'night';
  }

  return defaultTheme;
};

export default getDefaultTheme;
