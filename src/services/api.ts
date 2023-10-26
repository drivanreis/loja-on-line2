export async function getCategories() {
  const API = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(API);
  const data = await response.json();
  return data;
}

export async function
getProductsFromCategoryAndQuery(categoryId?: string, query?: string) {
  let result = {};
  if (categoryId && query) {
    const API = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=$${query}`;
    const response = await fetch(API);
    const data = await response.json();
    result = data;
  }
  if (!(categoryId) && query) {
    const queryAPI = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
    const queryResponse = await fetch(queryAPI);
    const queryData = await queryResponse.json();
    result = queryData;
  }

  if (categoryId && !(query)) {
    const categoryAPI = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
    const categoryResponse = await fetch(categoryAPI);
    const categoryData = await categoryResponse.json();
    result = categoryData;
  }
  return result;
}

export async function getProductById(id: string) {
  const API = `https://api.mercadolibre.com/items/${id}`;
  const response = await fetch(API);
  const data = await response.json();
  return data;
}
