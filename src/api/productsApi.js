export async function fetchProducts(signal) {
  const response = await fetch('https://dummyjson.com/products?limit=100', { signal });
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }
  const data = await response.json();
  return data.products;
}

export async function fetchProduct(id, signal) {
  const response = await fetch(`https://dummyjson.com/products/${id}`, { signal });
  if (!response.ok) {
    throw new Error(`Product with ID ${id} not found.`);
  }
  return await response.json();
}
