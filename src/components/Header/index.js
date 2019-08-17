import React, { useState } from "react";
import { Menu, Icon } from "antd";
import { FormattedMessage } from "react-intl";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const HeaderMenu = () => {
  const [active, setActive] = useState("1");

  const handleClick = e => {
    setActive(e.key);
  };

  return (
      <Menu onClick={handleClick} selectedKeys={[active]} mode="horizontal">
        <Menu.Item key="1">
          <Link to="/">
              <Icon type="unordered-list" />
              <FormattedMessage id={`Header.allMovies.title`} />
          </Link>
        </Menu.Item>

        <Menu.Item key="2">
          <Link to="create">
            <Icon type="plus-circle" />
            <FormattedMessage id={`Header.newMovie.title`} />
          </Link>
        </Menu.Item>
      </Menu>
  );
};

export default HeaderMenu;
