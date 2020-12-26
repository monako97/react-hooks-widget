/// <reference types="react" />
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
declare const useTheme: () => UseThemeTypes;
export default useTheme;
