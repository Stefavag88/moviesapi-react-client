import React, { useState, useContext } from "react";
import { Form, Icon, Input, Button, Menu, Dropdown, message } from "antd";
import "./index.css";
import supportedLanguages, {
  getLanguageFirstPart
} from "./../LanguageContext/languages";
import LanguageContext from './../LanguageContext/index';


const languagesEnglishExcluded = Object.values(supportedLanguages).filter(
  c => c.code !== "en-US"
);

const MovieForm = ({ form, onSuccess}) => {
  const [langCode] = useContext(LanguageContext);
  const [languages, setLanguages] = useState(languagesEnglishExcluded);

  const remove = lang => {
    const keys = form.getFieldValue("keys");

    form.setFieldsValue({
      keys: keys.filter(key => key.code !== lang.code)
    });

    setLanguages([...languages, lang]);
  };

  const add = lang => {
    if (languages.length === 0) return;

    const keys = form.getFieldValue("keys");
    const nextKeys = keys.concat(lang);

    form.setFieldsValue({
      keys: nextKeys
    });

    const toRemove = [...languages].find(c => c.code === lang.code);

    setLanguages([...languages].filter(c => c.code !== toRemove.code));
  };

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        const request = {
          title: values.title,
          description: values.description,
          translations: []
        };

        const langCodes = values.keys.map(k => k.code);

        langCodes.forEach(c => {
          request.translations.push({
            langCode: c,
            title: values.languages[c].title,
            description: values.languages[c].description
          });
        });

        fetch(`https://localhost:5001/api/movies`, {
            method:'POST', 
            body: JSON.stringify(request),
            headers: { "Content-Type": "application/json" }
        })
        .then(res => {
            
            if(res.status === 201){
                message.success('Movie Created');
                return res.json()
            }    
            else{
                message.error('Could Not create movie');
                return;
            }       

            })
        .then(movieId => {
            console.log("RESPONSEjson!!", movieId);
            
            setTimeout(() => {
                onSuccess({movieId});
            }, 2000)
            });

      }
    });
  };

  const chooseLanguage = ev => {
    const lang = languages.find(l => l.code === ev.key);

    if (lang) add(lang);
  };

  const languagesDropdown = () => {
    const menu = (
      <Menu onClick={chooseLanguage}>
        {languages.map(l => {
          return (
            <Menu.Item key={l.code} value={l.language}>
              {l.language}
            </Menu.Item>
          );
        })}
      </Menu>
    );

    return (
      <Dropdown className="languages-dropdown" overlay={menu}>
        <Button>
          Add Language <Icon type="down" />
        </Button>
      </Dropdown>
    );
  };

  const { getFieldDecorator, getFieldValue } = form;

  getFieldDecorator("keys", { initialValue: [] });
  const keys = getFieldValue("keys");

  const formItems = keys.map((k, index) => {
    const titleKey = `title_${getLanguageFirstPart(k.code)}`;
    const descriptionKey = `description_${getLanguageFirstPart(k.code)}`;

    return (
      <div className="form-group-container">
        <div className="form-group-items">
          <Form.Item
            className="form-input"
            label={`${k.language} Title`}
            required={true}
            key={titleKey}
          >
            {getFieldDecorator(`languages[${k.code}]['title']`, {
              validateTrigger: ["onChange", "onBlur"],
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: `Add ${k.language} title or remove`
                },
                { max: 50, message: "50 characters maximum allowed " }
              ]
            })(
              <Input
                placeholder={`Title...`}
                style={{ width: "95%", marginRight: 8 }}
              />
            )}
          </Form.Item>
          <Form.Item
            className="form-input"
            label={`${k.language} Description`}
            required={false}
            key={descriptionKey}
          >
            {getFieldDecorator(`languages[${k.code}]['description']`, {
              validateTrigger: ["onChange", "onBlur"]
            })(
              <Input.TextArea
                rows={4}
                placeholder={`Summary...`}
                style={{ width: "95%", marginRight: 8 }}
              />
            )}
          </Form.Item>
        </div>

        <div className="form-group-buttons">
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => remove(k)}
          />
        </div>
      </div>
    );
  });

  return (
    <Form onSubmit={handleSubmit} className="movie-form">
      {languages.length > 0 && languagesDropdown()}
      <div className="form-group-items">
        <Form.Item className="form-input" label="English Title">
          {getFieldDecorator("title", {
            rules: [
              { required: true, message: "English Title is mandatory" },
              { max: 50, message: "50 characters maximum allowed " }
            ]
          })(<Input placeholder="Title..." />)}
        </Form.Item>
        <Form.Item className="form-input" label="English Summary">
          {getFieldDecorator("description", {
            rules: []
          })(<Input.TextArea rows={4} placeholder="Summary..." />)}
        </Form.Item>
        {formItems}
      </div>
      <Form.Item className="submit-form-btn">
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const WrappedMovieForm = Form.create({ name: "normal_login" })(MovieForm);

export default WrappedMovieForm;
