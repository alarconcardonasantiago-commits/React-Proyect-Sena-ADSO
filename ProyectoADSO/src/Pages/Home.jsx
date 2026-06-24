import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from '../Components/Carousel/Carousel.jsx';
import HomeProductCard from '../Components/HomeProductCard/HomeProductCard.jsx';
import CategoryCard from '../Components/CategoryCard/CategoryCard.jsx';
import ProductModal from '../Components/ProductModal/ProductModal.jsx';
import { fetchPublic } from '../utils/api.js';
import styles from './Home.module.css';

const CATEGORIES = [
    { id: 1, title: "Cuerdas", key: "Cuerdas", image: "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=800&q=80" },
    { id: 2, title: "Viento", key: "Viento", image: "https://images.unsplash.com/photo-1573871669414-010dbf73ca84?w=800&q=80" },
    { id: 3, title: "Percusión", key: "Percusión", image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800&q=80" },
    { id: 4, title: "Electrónicos", key: "Electrónicos", image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80" },
];

function Home() {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [popularProducts, setPopularProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadPopularProducts = async () => {
            try {
                const data = await fetchPublic('/productos');
                // Tomar los primeros 5 o los que existan
                const products = Array.isArray(data) ? data.slice(0, 5) : [];
                setPopularProducts(products);
            } catch (error) {
                console.warn('No se pudieron cargar los productos populares:', error.message);
                setPopularProducts([]);
            } finally {
                setLoading(false);
            }
        };
        loadPopularProducts();
    }, []);

    const handleCategoryClick = (categoryKey) => {
        navigate(`/Productos?categoria=${categoryKey}`);
    };

    // Formatea el precio en pesos colombianos
    const formatPrice = (price) => {
        if (!price) return 'Consultar precio';
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(price);
    };

    return (
        <div className={styles.container}>
            <div className={styles.heroSection}>
                <Carousel />
            </div>

            <section className={styles.popularSection}>
                <h2 className={styles.sectionTitle}>Productos Más Populares</h2>

                {loading ? (
                    <div className={styles.loadingRow}>
                        {[1,2,3,4,5].map(i => <div key={i} className={styles.skeletonCard} />)}
                    </div>
                ) : popularProducts.length > 0 ? (
                    <div className={styles.scrollContainer}>
                        {popularProducts.map(product => (
                            <HomeProductCard
                                key={product.id_producto}
                                image={product.imagen || 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=800&q=80'}
                                title={product.nombre}
                                price={formatPrice(product.precio)}
                                onClick={() => setSelectedProduct({ 
                                    id: product.id_producto,
                                    title: product.nombre, 
                                    price: formatPrice(product.precio),
                                    image: product.imagen || 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=800&q=80',
                                    content: product.descripcion || `${product.nombre} — disponible en Melodía Instrumental.`
                                })}
                            />
                        ))}
                    </div>
                ) : (
                    <p className={styles.emptyMsg}>No hay productos disponibles en este momento.</p>
                )}
            </section>

            <section className={styles.categoriesSection}>
                <h2 className={styles.sectionTitle}>Categorías</h2>
                <div className={styles.categoriesGrid}>
                    {CATEGORIES.map(category => (
                        <CategoryCard
                            key={category.id}
                            title={category.title}
                            image={category.image}
                            onClick={() => handleCategoryClick(category.key)}
                        />
                    ))}
                </div>
            </section>

            <ProductModal
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </div>
    );
}

export default Home;