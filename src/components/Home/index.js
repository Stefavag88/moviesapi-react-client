import React from "react";
import { FormattedMessage } from "react-intl";

const Home = (props, context) => {

console.log("HOME PROPS!!", props);
console.log("HOME CONTEXT!!", context);

  return (
    <h1>
      <FormattedMessage id="title" />
    </h1>
  );
};

export default Home;
