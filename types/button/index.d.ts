import React, { ReactNode } from 'react';
import './index.less';
interface ButtonTypes {
    className?: string;
    children?: ReactNode;
    infinite?: boolean;
    type?: 'default' | 'primary' | 'warning';
    ghost?: boolean;
    dange?: boolean;
    dashed?: boolean;
    round?: boolean;
    circle?: boolean;
    size?: 'small' | 'default';
    onClick?: () => void;
}
/**
 * @param {string} className 类名
 * @param {ReactNode} children 内容
 * @param {boolean} infinite 是否开启循环动画
 * @param {default | primary | warning} type 按钮类型
 * @param {boolean} ghost 幽灵按钮
 * @param {boolean} dange 危险
 * @param {boolean} dashed 虚线
 * @param {boolean} round 开启圆角
 * @param {boolean} circle 圆形按钮
 * @param {small | default} size 按钮尺寸
 * @param {Function} onClick 点击回调方法
 * @returns {Button} Button
 * @example
 * <Button dange onClick={() => {
 *    console.log('click');
 * }}>Dange</Button>
 */
declare const Button: React.NamedExoticComponent<ButtonTypes>;
export default Button;
