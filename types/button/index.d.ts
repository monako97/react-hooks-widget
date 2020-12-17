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
declare const Button: React.FC<ButtonTypes>;
export default Button;
