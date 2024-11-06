import React, { useState, useEffect } from "react";
import { fetchProducts, submitPurchase } from "../../utils/api";
import Container from "components/Container/Container";
import ProductList from "components/ProductList/ProductList";
import PurchaseForm from "components/PurchaseForm/PurchaseForm";

function MainForm() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    clientName: "",
    phone: "",
    email: "",
    msgText: ""
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };

    loadProducts();
  }, []);

  const handleBuyClick = () => {
    setShowForm(true);
  };

  const handleBackClick = () => {
    setShowForm(false);
  };

  const handleSubmit = async (purchaseData) => {
    const result = await submitPurchase(purchaseData);
    console.log("Результат:", result);
    return result;
  };
  

  return (
    <Container>     
      {!showForm ? (
        <ProductList
          products={products}
          onBuy={handleBuyClick}
        />
      ) : (
        <PurchaseForm
          formData={formData}
          setFormData={setFormData}
          onBack={handleBackClick}
          onSubmit={handleSubmit}
        />
      )}
    </Container>
  );
}

export default MainForm;