const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    maxWidth: '320px',
    backgroundColor: '#fff',
    margin: '12px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderBottom: '1px solid #eee',
  },
  content: {
    padding: '16px',
    flexGrow: 1,
  },
  title: {
    fontSize: '1.2rem',
    margin: '0 0 8px 0',
    color: '#222',
  },
  description: {
    fontSize: '0.9rem',
    color: '#555',
    marginBottom: '12px',
  },
  price: {
    fontWeight: '700',
    fontSize: '1rem',
    marginBottom: '8px',
    color: '#000',
  },
  brand: {
    fontSize: '0.85rem',
    color: '#777',
    fontStyle: 'italic',
  },
};

const ProductCard = ({ product }) => {
  return (
    <div style={styles.card}>
      <img
        src={product.imgsrc}
        alt={product.naziv}
        style={styles.image}
      />

      <div style={styles.content}>
        <h3 style={styles.title}>{product.naziv}</h3>
        <p
          style={styles.description}
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
        <p style={styles.price}>
          Cena: {product.price.toFixed(2)} RSD (sa PDV-om)
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
