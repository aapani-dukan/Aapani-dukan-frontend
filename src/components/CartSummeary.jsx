export default function CartSummary({ cart, totalPrice, handleBuy }) {
  return (
    <div className="cart-summary">
      <h3>Bucket Items: {cart.length}</h3>
      <ul>
        {cart.map((item, idx) => (
          <li key={idx}>
            {item.name} - ₹{item.price}
          </li>
        ))}
      </ul>
      <h4>Total: ₹{totalPrice}</h4>
      {cart.length > 0 && <button onClick={handleBuy}>Buy</button>}
    </div>
  );
}
