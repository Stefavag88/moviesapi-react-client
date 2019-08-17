import React from "react";
import { Popconfirm, message, Button } from "antd";
import { FormattedMessage } from "react-intl";

const DeleteButton = ({ recordName, disabled, onDelete }) => {
  // onDelete must be a promise
  const deleteRecord = e => {
    onDelete().then(success => {
      if (success) message.success = "Record Deleted";
      else message.error = "Could Not Delete Record";
    });
  };

  const title = recordName ? (
    <FormattedMessage
      id={`DeleteButton.recordSelected.confirmationText`}
      values={{ recordName }}
    />
  ) : (
    <FormattedMessage id="DeleteButton.noRecordSelected.confirmationText" />
  );

  return (
    <Popconfirm
      title={title}
      onConfirm={deleteRecord}
      okText={<FormattedMessage id="Common.yes.title" />}
      cancelText={<FormattedMessage id="Common.no.title" />}
    >
      <Button disabled={disabled} icon="delete" />
    </Popconfirm>
  );
};

export default DeleteButton;
