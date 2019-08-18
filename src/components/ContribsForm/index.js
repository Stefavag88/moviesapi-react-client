import React, { useContext, useState } from "react";
import { Form, Button, message, Row, Col, AutoComplete } from "antd";
import "./index.css";
import LanguageContext from "../LanguageContext";
import useFetch from "react-fetch-hook";

const Option = AutoComplete.Option;

const ContribsForm = ({ form, movieId, onSuccess }) => {
  const [rows, setRows] = useState(0);
  const [lang] = useContext(LanguageContext);
  const langCode = lang.code.replace("-", "_");
  const contribsUrl = `https://localhost:5001/api/contribs/${langCode}`;
  const contribTypesUrl = `https://localhost:5001/api/contribtypes/${langCode}`;

  const contribData = useFetch(contribsUrl);
  const contribTypesData = useFetch(contribTypesUrl);

  const add = index => {
    const keys = form.getFieldValue("keys");
    const nextKeys = keys.concat(index);

    form.setFieldsValue({
      keys: nextKeys
    });

    setRows(index);
  };

  const remove = () => {
    const keys = form.getFieldValue("keys");
    const nextKeys = keys.slice(0, keys.length - 1);

    form.setFieldsValue({
      keys: nextKeys
    });

    setRows(rows - 1);
  };

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const request = values.contribs;
        
        fetch(`https://localhost:5001/api/movies/${movieId}/contribs`, {
          method: "PUT",
          body: JSON.stringify(request),
          headers: { "Content-Type": "application/json" }
        }).then(res => {
          if (res.status === 204) {
            message.success("Contributors Added");
            setTimeout(() => {
              onSuccess();
            }, 2000);
          } else {
            message.error("Could not Add Contributors");
            return;
          }
        });
      }
    });
  };

  const addContribRow = index => {
    const rowColSpan = index === 0 ? 12 : 11;
    const className = index === 0 ? "form-row" : "form-row row-extra";

    const row = (
      <Row gutter={12} className={className}>
        <Col span={rowColSpan}>
          <Form.Item className="form-input" label="Contributor">
            {getFieldDecorator(`contribs[${index}]['contribId']`, {
              type: "array",
              validateTrigger: ["onChange", "onBlur"],
              rules: [
                { required: true, message: "Select At Least one Contributor" }
              ]
            })(
              <AutoComplete
                loading={contribData.isLoading}
                placeholder="Select Contributor..."
                filterOption={(inputValue, option) =>
                  option.props.children
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
              >
                {contribData.data &&
                  contribData.data.map(g => (
                    <Option value={`${g.id}`} key={g.langCodeText}>
                      {g.title}
                    </Option>
                  ))}
              </AutoComplete>
            )}
          </Form.Item>
        </Col>
        <Col span={rowColSpan}>
          <Form.Item className="form-input" label="Contributor Type">
            {getFieldDecorator(`contribs[${index}]['contribtypeId']`, {
              type: "array",
              validateTrigger: ["onChange", "onBlur"],
              rules: [
                { required: true, message: "A contributor must have a role!" }
              ]
            })(
              <AutoComplete
                loading={contribTypesData.isLoading}
                placeholder="Select Type..."
                filterOption={(inputValue, option) =>
                  option.props.children
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
              >
                {contribTypesData.data &&
                  contribTypesData.data.map(g => (
                    <Option value={`${g.id}`} key={g.langCodeText}>
                      {g.title}
                    </Option>
                  ))}
              </AutoComplete>
            )}
          </Form.Item>
        </Col>
        {index > 0 && (
          <Col span={2}>
            <Button icon="minus" type="circle" onClick={remove} />
          </Col>
        )}
      </Row>
    );
    return row;
  };

  const { getFieldDecorator, getFieldValue } = form;

  getFieldDecorator("keys", { initialValue: [] });
  const keys = getFieldValue("keys");

  const extraRows =
    keys &&
    keys.map((k, index) => {
      console.log("EXTRAROW!!", k);
      console.log("keys??", keys);
      return addContribRow(k);
    });

  console.log("CONTRIBS???", contribData.data);
  console.log("KEYS??", keys);

  return (
    <Form onSubmit={handleSubmit} className="contrib-form">
      <Button
        className="add-contrib-btn"
        icon="plus"
        type="circle"
        onClick={() => add(rows + 1)}
      />
      {addContribRow(0)}
      {extraRows}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const WrappedContribsForm = Form.create({ name: "contribs_form" })(
  ContribsForm
);

export default WrappedContribsForm;
