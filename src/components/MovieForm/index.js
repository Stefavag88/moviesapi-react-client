import React from "react";
import { Form, Icon, Input, Button, Menu, Dropdown } from "antd";
import "./index.css";
import supportedLanguages from "./../LanguageContext/languages";

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 }
    }
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 }
    }
  };

const languagesEnglishExcluded = Object.values(supportedLanguages).filter(
    c => c.code !== "en-US"
  );

class MovieForm extends React.Component {
  state = {
    languages: languagesEnglishExcluded
  };

  remove = langCode => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("keys");

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key.code !== langCode.code)
    });

    this.setState((state, props) => {
      return {
        languages: [...state.languages, langCode]
      };
    });
  };

  add = lang => {
    const { form } = this.props;

    if (this.state.languages.length === 0) return;
    // can use data-binding to get
    const keys = form.getFieldValue("keys");
    const nextKeys = keys.concat(lang);

    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys
    });

    const toRemove = [...this.state.languages].find(c => 
        c.code === lang.code
    );

    this.setState((state, props) => {
      return {
        languages: [...state.languages].filter(c => 
            c.code !== toRemove.code
        )
      };
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  chooseLanguage = ev => {
    const lang = this.state.languages.find(l => l.code === ev.key);

    if (!lang) return;

    this.add(lang);
  };

  languagesDropdown = () => {
    const menu = (
      <Menu onClick={this.chooseLanguage}>
        {this.state.languages.map(l => {
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

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
   
    getFieldDecorator("keys", { initialValue: [] });
    const keys = getFieldValue("keys");

    console.log("KEYS??", keys);

    const formItems = keys.map((k, index) => (
      <Form.Item
        className="form-input"
        label={`${k.language} Title`}
        required={true}
        key={k.code}
      >
        {getFieldDecorator(`languages[${k.code}]`, {
          validateTrigger: ["onChange", "onBlur"],
          rules: [
            {
              required: true,
              whitespace: true,
              message: `Add ${k.language} title or remove`
            }
          ]
        })(
          <Input
            placeholder={`Title...`}
            style={{ width: "95%", marginRight: 8 }}
          />
        )}

        <Icon
          className="dynamic-delete-button"
          type="minus-circle-o"
          onClick={() => this.remove(k)}
        />
      </Form.Item>
    ));

    return (
      <Form onSubmit={this.handleSubmit} className="movie-form">
        {this.state.languages.length > 0 && this.languagesDropdown()}
        <Form.Item className="form-input" label="English Title">
          {getFieldDecorator("title", {
            rules: [{ required: true, message: "English Title is mandatory" }]
          })(<Input placeholder="Title..."/>)}
        </Form.Item>
        {formItems}
        <Form.Item className="submit-form-btn">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedMovieForm = Form.create({ name: "normal_login" })(MovieForm);

export default WrappedMovieForm;
