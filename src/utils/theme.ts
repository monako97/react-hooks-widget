interface ThemeTypes {
  type: 'light' | 'night';
}
/**
 * 判断当前时间是晚上还是白天
 * @returns {string} light | night
 */
export const getDefaultTheme = (): ThemeTypes['type'] => {
  let time: Date | null = new Date();
  let endTime: number | null = time.setHours(6, 0, 0, 0); // 当天6点
  let startTime: number | null = time.setHours(18, 0, 0, 0); // 当天18点
  let justNowTime: number | null = time.getTime(); // 现在
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

  time = null;
  endTime = null;
  startTime = null;
  justNowTime = null;
  return defaultTheme;
};
