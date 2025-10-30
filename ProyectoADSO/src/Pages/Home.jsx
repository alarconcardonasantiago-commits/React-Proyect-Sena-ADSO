import Carousel from '../Components/Carousel/Carousel.jsx';
import Card from '../Components/Card/Card.jsx';


function Home() {
    return (
        <>
            <h2>Bienvenido al Proyecto ADSO</h2>
            <Carousel />
            <p>Este es el cuerpo principal de la página.</p>
                <Card image="https://placehold.co/150" title="Card 1" content="Texto de placeholder para cambiar por productos en un futuro" price="100.000$" />
                <Card image="https://placehold.co/150" title="Card 2" content="Texto de placeholder para cambiar por productos en un futuro" price="200.000$" />
                <Card image="https://placehold.co/150" title="Card 3" content="Texto de placeholder para cambiar por productos en un futuro" price="300.000$" />
            </>
    );
}

export default Home;