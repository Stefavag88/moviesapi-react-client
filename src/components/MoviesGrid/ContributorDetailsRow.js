import React from 'react';
import { FormattedMessage } from 'react-intl';
import {Table} from 'antd'


const ContributorDetailsRow = ({movie, sortedInfo, handleChange}) => {
    const columns = [
      {
        title: <FormattedMessage id="MoviesGrid.contribColumn.title" />,
        dataIndex: "title",
        key: "contrib",
        sorter: (a, b) => a.title.localeCompare(b.title),
        sortOrder: sortedInfo.columnKey === "contrib" && sortedInfo.order
      },
      {
        title: <FormattedMessage id="MoviesGrid.contribTypesColumn.title" />,
        dataIndex: "contribtypes",
        key: "contribtypes",
        render: type => type.map(c => c.title).join(", "),
        sorter: (a, b) =>
          a.contribtypes[0].title.localeCompare(b.contribtypes[0].title),
        sortOrder: sortedInfo.columnKey === "contribtypes" && sortedInfo.order
      }
    ];

    const { contribs } = movie;

    return (
      <Table
        columns={columns}
        dataSource={contribs}
        pagination={false}
        rowKey={record => record.id}
        onChange={handleChange}
      />
    );
  };

  export default ContributorDetailsRow;