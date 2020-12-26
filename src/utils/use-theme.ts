import { useState } from 'react';
import getDefaultTheme from './get-default-theme';
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
const useTheme = (): UseThemeTypes => {
  const [type, setType] = useState<ThemeTypes['type']>(getDefaultTheme());

  return { type, setType };
};

export default useTheme;
