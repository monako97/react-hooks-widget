import './index.less';
/**
 * 轻提醒
 * @property {Function} info                   - 默认.
 * @property {Function} success                - 成功.
 * @property {Function} danger                 - 警告.
 * @property {Function} loading                - loading.
 * @property {Function} warn                   - 警告.
 * @example
 * ``` js
 * // 5s后自动消失，显示关闭按钮
 * toast.danger("警告", 5000, true);
 * // 不自动关闭，不显示关闭按钮
 * toast.success("成功", -1);
 * ```
 */
declare const toast: {
    /**
     * 信息
     * @constructor
     * @param {string} content               - 内容.
     * @param {Number} duration                 - 显示时间.
     * @param {Boolean} close                   - 显示关闭按钮.
     */
    info: (content: string, duration: number, close: boolean) => void;
    /**
     * 成功
     * @constructor
     * @param {string} content               - 内容.
     * @param {Number} duration                 - 显示时间.
     * @param {Boolean} close                   - 显示关闭按钮.
     */
    success: (content: string, duration: number, close: boolean) => void;
    /**
     * 错误
     * @constructor
     * @param {string} content               - 内容.
     * @param {Number} duration                 - 显示时间.
     * @param {Boolean} close                   - 显示关闭按钮.
     */
    danger: (content: string, duration: number, close: boolean) => void;
    /**
     * Loading
     * @constructor
     * @param {string} content               - 内容.
     * @param {Number} duration                 - 显示时间.
     * @param {Boolean} close                   - 显示关闭按钮.
     */
    loading: (content: string, duration: number, close: boolean) => void;
    /**
     * 警告
     * @constructor
     * @param {string} content               - 内容.
     * @param {Number} duration                 - 显示时间.
     * @param {Boolean} close                   - 显示关闭按钮.
     */
    warn: (content: string, duration: number, close: boolean) => void;
    /**
     * 重要
     * @constructor
     * @param {string} content               - 内容.
     * @param {Number} duration                 - 显示时间.
     * @param {Boolean} close                   - 显示关闭按钮.
     */
    primary: (content: string, duration: number, close: boolean) => void;
};
export default toast;
