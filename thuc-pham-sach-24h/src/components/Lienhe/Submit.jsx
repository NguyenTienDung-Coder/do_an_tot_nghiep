import { useState, useEffect } from "react";
import "./Submit.css";

function Submit() {
  const initialValues = { username: "", email: "", content: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Vui lòng không để trống!";
    }
    if (!values.email) {
      errors.email = "Vui lòng không để trống!";
    } else if (!regex.test(values.email)) {
      errors.email = "Đây không phải là một định dạng email hợp lệ!";
    }
    if (!values.content) {
        errors.content = "Vui lòng không để trống!";
    }
    return errors;
  };

  return (
    <div className="submit-form">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success">gửi tin nhắn thành công</div>
      ) : (
        <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
      )}

      <form onSubmit={handleSubmit}>
      <h3 className="send-inf" >Gửi thông tin</h3>
      <p className="input-class">Bạn hãy điền nội dung tin nhắn vào form dưới đây và gửi cho chúng tôi. Chúng tôi sẽ trả lời bạn sau khi nhận được.</p>
        <div className="ui-divider"></div>
        <div className="ui-form">
        <div className="nhap-vao">
                <div className="form-input-inf">
                        <p className="input-space"><label>HỌ VÀ TÊN *</label></p>  
                        <input
                        className="add-information-space"
                        type="text"
                        name="username"
                        placeholder="Nhập họ và tên"
                        value={formValues.username}
                        onChange={handleChange}
                        />
                    <p>{formErrors.username}</p>
                </div>

                <div className="form-input-inf-one"> 
                        <p className="input-space"><label>EMAIL *</label></p>  
                            <input
                            className="add-information-space-one"
                            type="text"
                            name="email"
                            placeholder="Nhập địa chỉ Email"
                            value={formValues.email}
                            onChange={handleChange}
                            />
                        <p>{formErrors.email}</p>
                </div>
            </div>
            <div className="field">
                    <p className="input-space"><label>NỘI DUNG *</label></p>  
                        <input
                        className="add-space"
                        type="text"
                        name="content"
                        placeholder="Nội dung liên hệ"
                        value={formValues.content}
                        onChange={handleChange}
                        />
                    <p>{formErrors.content}</p>
            </div>
            <p className="button-send-mess"><button className="fluid-ui-button">Gửi tin nhắn</button></p>
        </div>
      </form>
    </div>
  );
}

export default Submit;