import type { LinkProps } from "next/link";
import type { MouseEventHandler, PropsWithChildren } from "react";

export interface INavLinkProps extends PropsWithChildren<LinkProps> {
  target?: "_blank" | "_self" | "_parent" | "_top" | undefined;
  onClick?: MouseEventHandler;
}
