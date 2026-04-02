"use client";

import NextLink from "next/link";
import type { LinkProps as NextLinkProps } from "next/link";
import { Anchor, type AnchorProps } from "@mantine/core";

export interface AppLinkProps
  extends AnchorProps,
    Pick<NextLinkProps, "replace" | "scroll" | "prefetch"> {
  /** URL path or full URL to navigate to */
  href: string;
  ref?: React.Ref<HTMLAnchorElement>;
}

export function AppLink({
  href,
  replace,
  scroll,
  prefetch,
  ref,
  ...rest
}: AppLinkProps) {
  return (
    <Anchor
      ref={ref}
      renderRoot={(props) => (
        <NextLink
          href={href}
          replace={replace}
          scroll={scroll}
          prefetch={prefetch}
          {...props}
        />
      )}
      {...rest}
    />
  );
}
