const API_KEY = "011ba11bdcad4fa396660c2ec447ef14";
const API_URL = "https://sycret.ru/service/api/api";

export async function fetchProducts() {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({
        ApiKey: API_KEY,
        MethodName: "OSGetGoodList"
      })
    });

    if (!response.ok) throw new Error("Ошибка при получении данных");

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Ошибка API:", error);
    return { error: error.message };
  }
}

export async function submitPurchase(purchaseData) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({
        ApiKey: API_KEY,
        MethodName: "OSSale",
        ...purchaseData
      })
    });

    if (!response.ok) throw new Error("Ошибка при отправке данных");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка API:", error);
    return { error: error.message };
  }
}
