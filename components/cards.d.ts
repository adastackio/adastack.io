import { ReactNode, ComponentProps } from 'react';

declare function Card({ children, title, icon, image, arrow, href, ...props }: {
    children: ReactNode;
    title: string;
    icon: ReactNode;
    image?: boolean;
    arrow?: boolean;
    href: string;
}): JSX.Element;
declare function Cards({ children, num, className, style, ...props }: {
    num?: number;
} & ComponentProps<'div'>): JSX.Element;

export { Card, Cards };
