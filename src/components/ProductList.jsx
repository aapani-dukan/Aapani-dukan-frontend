export default function ProductList({ products, addToCart }) {
  return (
    <div className="product-list">
      <h3>Products</h3>
      {products.map((product) => (
        <div className="product-card" key={product._id}>
          <img src={product.img} alt={product.name} />
          <h4>{product.name}</h4>
          <p>Price: ₹{product.price}</p>
          <button onClick={() => addToCart(product)}>Add to Bucket</button>
        </div>
      ))}
    </div>
  );
}
