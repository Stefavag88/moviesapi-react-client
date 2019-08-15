import React, {useContext, useState} from "react";
import { Table} from "antd";
import { FormattedMessage } from 'react-intl';
import LanguageContext from '../LanguageContext';
import { useAPI } from "react-api-hooks";


const MoviesGrid = () => {

  const [lang] = useContext(LanguageContext);
  const langCode = lang.code.replace('-','_');

  const urlWithLang = `https://localhost:5001/api/${langCode}/movies`;

  const {data, error, isLoading } = useAPI(urlWithLang);

  const [sortedInfo, setSortedInfo] = useState({});

  const columns = [
    { 
      title: <FormattedMessage id="MoviesGrid.movieColumn.title"/>,
      dataIndex: "title", 
      key: "movieName", 
      sorter: (a, b) => a.movieCode.localeCompare(b.movieCode),
      sortOrder: sortedInfo.columnKey === 'movieName' && sortedInfo.order,
    },
    { 
      title: <FormattedMessage id="MoviesGrid.genresColumn.title"/>, 
      dataIndex: "genres", 
      key: "genresConcat", 
      render: gen => gen.map(g => g.title).join(", "),
      sorter: (a, b) => a.genres[0].title.localeCompare(b.genres[0].title),
      sortOrder: sortedInfo.columnKey === 'genresConcat' && sortedInfo.order,
    }
  ];

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  const expandedRowRender = movie => {

    const columns = [
      { 
        title: <FormattedMessage id="MoviesGrid.contribColumn.title"/>, 
        dataIndex: "title", 
        key: "contrib" ,
        sorter: (a, b) => a.title.localeCompare(b.title),
        sortOrder: sortedInfo.columnKey === 'contrib' && sortedInfo.order,
      },
      { 
        title: <FormattedMessage id="MoviesGrid.contribTypesColumn.title"/>,
        dataIndex: "contribtypes", 
        key: "contribtypes", 
        render: type => type.map(c => c.title).join(", "),
        sorter: (a, b) => a.contribtypes[0].title.localeCompare(b.contribtypes[0].title),
        sortOrder: sortedInfo.columnKey === 'contribtypes' && sortedInfo.order,
      }
    ];
  
    const {contribs} = movie;
  
    return <Table 
              columns={columns} 
              dataSource={contribs} 
              pagination={false}
              rowKey={record => record.id}
              onChange={handleChange} />;
  };

  return (<div className="movies-grid">
    {error && <div className="error-page">Error loading data...</div>}
    <Table
      className="movies-table-nested"
      columns={columns}
      expandedRowRender={expandedRowRender}
      dataSource={data}
      loading={isLoading}
      rowKey={record => record.id}
      size={'small'}
      onChange={handleChange}
    />
  </div>
  );
}

export default MoviesGrid;
