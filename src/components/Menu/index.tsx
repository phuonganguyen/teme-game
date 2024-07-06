import Image from "next/image";

import styles from "./Menu.module.scss";
import Link, { LinkProps } from "next/link";
import { PropsWithChildren, useEffect, useState } from "react";
import { NextRouter, useRouter } from "next/router";
import { resolveHref } from "next/dist/client/resolve-href";

const getLinkUrl = (params: {
  router: NextRouter;
  href: LinkProps["href"];
  as: LinkProps["as"];
}): string => {
  // Dynamic route will be matched via props.as
  // Static route will be matched via props.href
  if (params.as) return resolveHref(params.router, params.as);

  const [resolvedHref, resolvedAs] = resolveHref(
    params.router,
    params.href,
    true
  );

  return resolvedAs || resolvedHref;
};

function MenuItem({ children, ...props }: PropsWithChildren<LinkProps>) {
  const router = useRouter();
  const [computedClassName, setComputedClassName] = useState(
    styles["menu-item"]
  );

  useEffect(() => {
    // Check if the router fields are updated client-side
    if (router.isReady) {
      const linkUrl = getLinkUrl({
        router,
        href: props.href,
        as: props.as,
      });

      const linkPathname = new URL(linkUrl, location.href).pathname;

      // Using URL().pathname to get rid of query and hash
      const activePathname = new URL(router.asPath, location.href).pathname;

      const newClassName =
        linkPathname === activePathname
          ? `${styles["menu-item"]} ${styles.active}`.trim()
          : styles["menu-item"];

      if (newClassName !== computedClassName) {
        setComputedClassName(newClassName);
      }
    }
  }, [router, props.as, props.href, computedClassName]);

  return (
    <Link className={computedClassName} {...props}>
      {children}
    </Link>
  );
}

export default function Menu() {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <MenuItem href={"/"}>
          <Image
            src={"/images/menu/Mine.png"}
            width={40}
            height={40}
            alt="Binance"
          />
          Mining
        </MenuItem>
        <MenuItem href={"#"}>
          <Image
            src={"/images/menu/Battle.png"}
            width={40}
            height={40}
            alt="Battle"
          />
          Battle
        </MenuItem>
        <MenuItem href={"/friends"}>
          <Image
            src={"/images/menu/friend.png"}
            width={40}
            height={40}
            alt="friend"
          />
          Friends
        </MenuItem>
        <MenuItem href={"#"}>
          <Image
            src={"/images/menu/Task.png"}
            width={40}
            height={40}
            alt="Task"
          />
          Task
        </MenuItem>
        <MenuItem href={"#"}>
          <Image
            src={"/images/menu/wallet.png"}
            width={40}
            height={40}
            alt="wallet"
          />
          Connect
        </MenuItem>
      </div>
    </div>
  );
}
