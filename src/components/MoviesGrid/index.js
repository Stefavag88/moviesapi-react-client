import React, { useContext, useState } from "react";
import { Table} from "antd";
import { FormattedMessage } from "react-intl";
import ExpandIcon from "./../ExpandIcon";
import DeleteButton from "./../DeleteButton";
import ContributorDetailsRow from './ContributorDetailsRow';
import LanguageContext from "../LanguageContext";
import useFetch from "react-fetch-hook";
import createTrigger from "react-use-trigger";
import useTrigger from "react-use-trigger/useTrigger";

import './index.css';

const deleteTrigger = createTrigger()

const getArrayFilters = (source, propName) => {
  if (!source) return [];

  const results = source.reduce((acc, val) => {
    val[propName].forEach(v => {
      if (!acc.find(gen => gen.id === v.id)) acc.push(v);
    });

    return acc;
  }, []);

  const distinct = new Set(results);

  return [...distinct].map(g => {
    return {
      value: g.id,
      text: g.title
    };
  });
};

const MoviesGrid = () => {
  const [lang] = useContext(LanguageContext);
  const langCode = lang.code.replace("-", "_");
  const urlWithLang = `https://localhost:5001/api/movies/${langCode}`

  //state
  const [sortedInfo, setSortedInfo] = useState({});
  const [filteredInfo, setFilteredInfo] = useState({});
  const [selectedRow, setSelectedRow] = useState({ id: null, title: "" });

  const deleteTriggerValue = useTrigger(deleteTrigger);

  //fetch movies
  const { isLoading, data } = useFetch(urlWithLang, {depends:[deleteTriggerValue]});

  const columns = [
    {
      title: <FormattedMessage id="MoviesGrid.movieColumn.title" />,
      dataIndex: "title",
      key: "movieName",
      sorter: (a, b) => a.movieCode.localeCompare(b.movieCode),
      sortOrder: sortedInfo.columnKey === "movieName" && sortedInfo.order
    },
    {
      title: <FormattedMessage id="MoviesGrid.genresColumn.title" />,
      dataIndex: "genres",
      key: "genresConcat",
      render: gen => gen.map(g => g.title).join(", "),
      sorter: (a, b) => a.genres[0].title.localeCompare(b.genres[0].title),
      sortOrder: sortedInfo.columnKey === "genresConcat" && sortedInfo.order,
      filters: getArrayFilters(data, "genres"),
      filteredValue: filteredInfo.genresConcat || null,
      onFilter: (value, record) => record.genres.some(r => r.id === value)
    }
  ];

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
    setFilteredInfo(filters);
  };

  const rowSelection = {
    type: "radio",
    onChange: (selectedRowKeys, recordInfo) => {
      setSelectedRow({ id: selectedRowKeys[0], title: recordInfo[0].title });
    }
  };

  const deleteMovie = async ev => {
    try {
      const resp = await fetch(
        `https://localhost:5001/api/movies/${selectedRow.id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" }
        }
      );
      const success = await resp.json();

      if(success)
        deleteTrigger();

      return success;
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <div className="movies-grid">
      <Table
        className="movies-table-nested"
        columns={columns}
        rowSelection={rowSelection}
        expandIcon={props => (
          <ExpandIcon {...props} tooltipText={<FormattedMessage id="MoviesGrid.expandIcon.tooltip" />}/>
        )}
        expandedRowRender={(record) =>
         <ContributorDetailsRow 
            movie={record} 
            sortedInfo={sortedInfo} 
            handleChange={handleChange}/>
        }
        dataSource={data}
        loading={isLoading}
        rowKey={record => record.id}
        size={"small"}
        onChange={handleChange}
        footer={data => (
          <div>
            <DeleteButton
              recordName={selectedRow.title}
              disabled={!selectedRow.id}
              onDelete={deleteMovie}
            />
            <span className='grid-total-items-count'>
              <FormattedMessage 
                id="MoviesGrid.footer.moviesCount.title"
                values={{moviesCount: data.length}}  
                />
            </span>
          </div>
        )}
      />
    </div>
  );
};

export default MoviesGrid;
