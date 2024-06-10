"use client";
import styles from "./page.module.css";
import React from "react";
import Chat from "../app/components/chat-region.js";
import Introduction from "../app/components/introduction.js";

export default function Home() {
  return (
    <main className={styles.main}>
      <Chat />
      <Introduction />
    </main>
  );
}
