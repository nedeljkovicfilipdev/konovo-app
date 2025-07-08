const ProductCard = ({ product }) => {
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "16px", marginBottom: "16px", width: "300px" }}>
      <img src={product.imgsrc} alt={product.naziv} style={{ width: "100%" }} />
      <h3>{product.naziv}</h3>
      <p><strong>Cena:</strong> {product.price.toFixed(2)} RSD</p>
      <p><strong>Na stanju:</strong> {product.stock}</p>
      <p><strong>Kategorija:</strong> {product.categoryName}</p>
      <div dangerouslySetInnerHTML={{ __html: product.description }} />
    </div>
  );
};

export default ProductCard;