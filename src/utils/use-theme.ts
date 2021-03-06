import React from 'react';
import { getDefaultTheme } from './theme';
interface ThemeTypes {
  type: 'light' | 'night';
}
interface UseThemeTypes {
  type: ThemeTypes['type'];
  setType: React.Dispatch<ThemeTypes['type']>;
}

/**
 * 主题 hooks
 * @returns {UseThemeTypes} theme and setTheme
 */
export const useTheme = (): UseThemeTypes => {
  const [type, setType] = React.useState<ThemeTypes['type']>(getDefaultTheme());

  return { type, setType };
};
