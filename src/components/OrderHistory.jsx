export default function OrderHistory({ orders }) {
  return (
    <div className="order-history">
      <h3>Order History</h3>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order, idx) => (
          <div key={idx} className="order-card">
            <p><strong>Date:</strong> {new Date(order.time).toLocaleString()}</p>
            <p><strong>Payment:</strong> {order.payment}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <ul>
              {order.items.map((item, i) => (
                <li key={i}>
                  {item.name} - ₹{item.price}
                </li>
              ))}
            </ul>
            <p><strong>Total:</strong> ₹{order.total}</p>
          </div>
        ))
      )}
    </div>
  );
}
