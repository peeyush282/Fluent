import Head from "next/head";
import Navbar from "./Navbar";

import React from "react";

const Layout = ({ children }) => (
  <>
    <Head>
      <title>Fluent App</title>
      <link href="/static/styles.css" rel="stylesheet" />
    </Head>
    <Navbar />
    {children}
  </>
);

export default Layout;
