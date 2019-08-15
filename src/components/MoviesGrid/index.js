import React, {useState, useEffect} from "react";
import axios from 'axios';
import { Table} from "antd";
import { FormattedMessage } from 'react-intl';

const MoviesGrid = () => {

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {

      const result = await axios(
        'https://localhost:5001/api/en_US/movies'
      );
      setData(result.data);
    };

    fetchData();
  }, []);

  const expandedRowRender = movie => {
    const columns = [
      { 
        title: <FormattedMessage id="MoviesGrid.contribColumn.title"/>, 
        dataIndex: "title", 
        key: "id" 
      },
      { 
        title: <FormattedMessage id="MoviesGrid.contribTypesColumn.title"/>,
        dataIndex: "contribtypes", 
        key: "contribtypes", 
        render: con => con.map(c => c.title).join(", ")
      }
    ];

    const {contribs} = movie;
    return <Table columns={columns} dataSource={contribs} pagination={false} />;
  };

  const columns = [
    { 
      title: <FormattedMessage id="MoviesGrid.movieColumn.title"/>,
      dataIndex: "title", 
      key: "id" 
    },
    { 
      title: <FormattedMessage id="MoviesGrid.genresColumn.title"/>, 
      dataIndex: "genres", 
      key: "genres", 
      render: gen => gen.map(g => g.title).join(", ")
    }
  ];

  return (
    <Table
      className="movies-grid-nested"
      columns={columns}
      expandedRowRender={expandedRowRender}
      dataSource={data}
      size={'small'}
    />
  );
}

export default MoviesGrid;
