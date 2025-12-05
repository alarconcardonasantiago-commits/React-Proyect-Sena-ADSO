import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from '../Components/Carousel/Carousel.jsx';
import HomeProductCard from '../Components/HomeProductCard/HomeProductCard.jsx';
import CategoryCard from '../Components/CategoryCard/CategoryCard.jsx';
import ProductModal from '../Components/ProductModal/ProductModal.jsx';
import styles from './Home.module.css';

const POPULAR_PRODUCTS = [
    { id: 1, title: "Guitarra Eléctrica Fender", price: "$4.500.000", image: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=800&q=80", content: "Guitarra eléctrica Fender Stratocaster original, acabado sunburst, mástil de arce. Ideal para rock y blues." },
    { id: 2, title: "Piano de Cola Yamaha", price: "$45.000.000", image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80", content: "Piano de cola Yamaha C3, sonido brillante y pulsación precisa. Perfecto para conciertos y estudios de grabación." },
    { id: 3, title: "Batería Pearl Export", price: "$3.200.000", image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800&q=80", content: "Batería acústica Pearl Export Series, incluye platillos y herrajes. La batería más vendida del mundo." },
    { id: 4, title: "Violín Stradivarius Copy", price: "$1.800.000", image: "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?w=800&q=80", content: "Violín 4/4 copia Stradivarius, madera de abeto y arce. Incluye arco y estuche rígido." },
    { id: 5, title: "Saxofón Alto Selmer", price: "$5.500.000", image: "https://images.unsplash.com/photo-1573871669414-010dbf73ca84?w=800&q=80", content: "Saxofón alto Selmer Paris, lacado dorado. Sonido cálido y excelente proyección." },
];

const CATEGORIES = [
    { id: 1, title: "Cuerdas", key: "Cuerdas", image: "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=800&q=80" },
    { id: 2, title: "Viento", key: "Viento", image: "https://images.unsplash.com/photo-1573871669414-010dbf73ca84?w=800&q=80" },
    { id: 3, title: "Percusión", key: "Percusión", image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800&q=80" },
    { id: 4, title: "Electrónicos", key: "Electrónicos", image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80" },
];

function Home() {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const navigate = useNavigate();

    const handleCategoryClick = (categoryKey) => {
        navigate(`/Productos?categoria=${categoryKey}`);
    };

    return (
        <div className={styles.container}>
            <div className={styles.heroSection}>
                <Carousel />
            </div>

            <section className={styles.popularSection}>
                <h2 className={styles.sectionTitle}>Productos Más Populares</h2>
                
                <div className={styles.scrollContainer}>
                    {POPULAR_PRODUCTS.map(product => (
                        <HomeProductCard 
                            key={product.id}
                            image={product.image}
                            title={product.title}
                            price={product.price}
                            onClick={() => setSelectedProduct(product)}
                        />
                    ))}
                </div>
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