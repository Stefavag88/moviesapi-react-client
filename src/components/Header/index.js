import React, { useState } from "react";
import { Menu, Icon } from "antd";
import { FormattedMessage } from "react-intl";

const HeaderMenu = () => {
  const [active, setActive] = useState("1");

  const handleClick = e => {
    setActive(e.key);
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[active]} mode="horizontal">
      <Menu.Item key="1">
        <Icon type="unordered-list" />
        <FormattedMessage id={`Header.allMovies.title`} />
      </Menu.Item>
      <Menu.Item key="2">
        <Icon type="plus-circle" />
        <FormattedMessage id={`Header.newMovie.title`} />
      </Menu.Item>
    </Menu>
  );
};

export default HeaderMenu;
