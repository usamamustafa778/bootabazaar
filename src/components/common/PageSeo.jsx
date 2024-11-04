import React from "react";
import { Helmet } from "react-helmet";

export default function PageSeo({ title, description, canonical }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
    </Helmet>
  );
}
