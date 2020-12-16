/// <reference types="react" />
interface UseThemeTypes {
    type: 'light' | 'night';
    setType: React.Dispatch<ThemeTypes['type']>;
}
/**
 * 主题 hooks
 * @returns {UseThemeTypes} theme and setTheme
 */
declare const useTheme: () => UseThemeTypes;
export default useTheme;
