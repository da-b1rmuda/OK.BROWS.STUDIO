import "./style.scss";

import { useEffect, useState } from "react";
import { Button } from "antd";

import { newsApi } from "../../../../Entities/News/api/service";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules, formats } from "./editorSettings";

function NewsEditor({
  isEdit,
  setIsEdit,
  setIsCreate,
  initialValues,
  messageApi,
}) {
  const [createNews, {}] = newsApi.useCreateNewsMutation();
  const [editNews, {}] = newsApi.useEditNewsMutation();
  const [value, setValue] = useState();

  useEffect(() => {
    if (initialValues && isEdit) {
      setValue(initialValues.news_content);
    }
    console.log(value);
  }, [isEdit]);

  const onBack = () => {
    setIsEdit(false);
    setIsCreate(false);
  };

  const onCreate = async () => {
    if (!value) return;
    console.log(value);
    const data = { news_content: value };
    if (isEdit) {
      data.news_id = initialValues?.news_id;
      const response = await editNews(data);
      if (response.error) return isError(response.error.data.message);
      isSuccess("Новость успешно изменена");
    } else {
      const response = await createNews(data);
      if (response.error) return isError(response.error.data.message);
      isSuccess("Новость успешно создана");
    }
    onBack();
  };

  const isError = (messageError) => {
    messageApi.open({
      type: "error",
      content: messageError,
    });
  };

  const isSuccess = (success) => {
    messageApi.open({
      type: "success",
      content: success,
    });
  };

  return (
    <div className="NewsAdmin-editor">
      <div className="NewsAdmin-editor-header">
        <h1>{isEdit ? "Редактирование новости" : "Создание новости"}</h1>
        <Button onClick={onBack}>Назад</Button>
      </div>
      <div className="ReactQuill-editor-wrapper">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          modules={modules()}
          formats={formats}
          className="quill-editor"
        />
      </div>
      <div className="NewsAdmin-editor-button">
        <Button onClick={onCreate}>{isEdit ? "Сохранить" : "Создать"}</Button>
      </div>
    </div>
  );
}

export default NewsEditor;
