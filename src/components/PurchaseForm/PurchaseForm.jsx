import React, { useContext } from "react";

import "./purchaseform.scss"
import { ProductContext } from "../../context/ProductContext";
import { validatePhone, validateEmail } from "../../utils/validators";

function PurchaseForm({ formData, setFormData, onBack, onSubmit }) {
  const { selectedProduct } = useContext(ProductContext);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "phone") {
      const formattedPhone = validatePhone(value);
      setFormData(prevData => ({ ...prevData, [name]: formattedPhone }));
    } else {
      setFormData(prevData => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    if (!formData.clientName) {
      alert("Поле 'Имя' обязательно для заполнения.");
      return;
    }
    if (!formData.phone || formData.phone.length !== 11) {
      alert("Поле 'Телефон' должно содержать 11 цифр.");
      return;
    }
    if (!formData.email) {
      alert("Поле 'Email' обязательно для заполнения.");
      return;
    }
    if (!validateEmail(formData.email)) {
      alert("Неверный формат email");
      return;
    }
  
    const purchaseData = {
      Id: selectedProduct?.ID,
      TableName: selectedProduct?.TABLENAME,
      PrimaryKey: selectedProduct?.PRIMARYKEY,
      Price: parseFloat(selectedProduct?.PRICE),
      Summa: parseFloat(selectedProduct?.SUMMA),
      ClientName: formData.clientName,
      Phone: formData.phone.replace(/^8/, ""),
      Email: formData.email,
      PaymentTypeId: 2,
      UseDelivery: 0,
      MsgText: formData.msgText,
    };
  
    try {
      const result = await onSubmit(purchaseData);
      
      if (result?.data && result.data.length > 0) {
        const certNumber = result.data[0]?.CERTNUMBER;
        alert(`Номер сертификата: ${certNumber}`);
      } else {
        alert("Не удалось получить номер сертификата.");
      }
    } catch (error) {
      alert("Ошибка при отправке данных.");
    }
  };
  

  const handleFocus = () => {
    if (!formData.phone) {
      setFormData(prevData => ({ ...prevData, phone: "8" }));
    }
  };

  return (
    <div className="form">
      <h2>Введите данные для покупки</h2>
      <div className="form__wrapper">
        <input
          className="form__input"
          type="text"
          name="clientName"
          placeholder="ФИО*"
          value={formData.clientName}
          onChange={handleInputChange}
        />
        <input
          className="form__input"
          type="text"
          name="phone"
          placeholder="Телефон*"
          value={formData.phone}
          onChange={handleInputChange}
          onFocus={handleFocus}
          maxLength="11"
        />
        <input
          className="form__input"
          type="email"
          name="email"
          placeholder="Email*"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          className="form__input"
          type="text"
          name="msgText"
          placeholder="Сообщение"
          value={formData.msgText}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={onBack}>Назад</button>
      <button onClick={handleSubmit}>Перейти к оплате</button>
    </div>
  );
}

export default PurchaseForm;
