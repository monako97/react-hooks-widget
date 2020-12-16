import { useState } from 'react';
import getDefaultTheme from './get-default-theme';

interface UseThemeTypes {
  type: 'light' | 'night';
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
