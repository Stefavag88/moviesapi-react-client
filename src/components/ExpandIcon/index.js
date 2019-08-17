import React from "react";
import { Button, Tooltip } from "antd";

const ExpandIcon = props => {
  let icon;
  if (props.expanded) {
    icon = "up";
  } else {
    icon = "down";
  }
  return (
    <Tooltip placement='topLeft' title={props.tooltipText}>
      <Button
        type="link"
        icon={icon}
        className="expand-row-icon"
        onClick={e => props.onExpand(props.record, e)}
        style={{ cursor: "pointer" }}
      />
    </Tooltip>
  );
};

export default ExpandIcon;
