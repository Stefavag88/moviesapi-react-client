import React, { useContext } from "react";
import {
  Form,
  Button,
  message,
  Select
} from "antd";
import LanguageContext from "../LanguageContext";
import useFetch from "react-fetch-hook";
import "./index.css";

const Option = Select.Option;

const GenreForm = ({ form, movieId, onSuccess }) => {
  const [lang] = useContext(LanguageContext);
  const langCode = lang.code.replace("-", "_");
  const urlWithLang = `https://localhost:5001/api/genres/${langCode}`;

  const { isLoading, data } = useFetch(urlWithLang);

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const request = values.genreIds;

        fetch(`https://localhost:5001/api/movies/${movieId}/genres`, {
          method: "PUT",
          body: JSON.stringify(request),
          headers: { "Content-Type": "application/json" }
        }).then(res => {
          if (res.status === 204) {
            message.success("Genres Added");
            setTimeout(() => {
              onSuccess();
            }, 2000);
          } else {
            message.error("Could not  Add Genres");
            return;
          }
        });
      }
    });
  };

  const { getFieldDecorator } = form;

  return (
    <Form onSubmit={handleSubmit} className="genre-form">
      <div className="form-group-items">
        <Form.Item className="form-input" label="Genres">
          {getFieldDecorator(`genreIds`, {
            type: "array",
            validateTrigger: ["onChange", "onBlur"],
            rules: [{ required: true, message: "Select At Least one Genre" }]
          })(
            <Select
              mode="multiple"
              loading={isLoading}
              style={{ width: "100%" }}
              placeholder="Select Genres..."
            >
              {data &&
                data.map(g => (
                  <Option value={g.id} key={g.langCodeText}>
                    {g.title}
                  </Option>
                ))}
            </Select>
          )}
        </Form.Item>
      </div>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const WrappedGenreForm = Form.create({ name: "genre_form" })(GenreForm);

export default WrappedGenreForm;
