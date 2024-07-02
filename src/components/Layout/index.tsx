import React from "react";
import Menu from "../Menu";
import styles from "./Layout.module.scss";

export default function Layout({children}:{children:React.ReactNode}){
    return (<main className={styles.layout}>
        <Menu/>
        {children}
    </main>);
}