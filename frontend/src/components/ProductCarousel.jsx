import { Carousel, Image } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useGetTopProductsQuery } from "../slices/productApiSlice"
import Message from "./Message"


const ProductCarousel = () => {
 
    const { data : products , isLoading, error} = useGetTopProductsQuery();
    
    return (
        isLoading ? ("")
        : error ? <Message variant='danger'>{error}</Message> 
        : (
            <Carousel pause='hover' className='bg-primary bm-4'>
                {products.map((product) => (
                    <Carousel.Item key={product._id}>
                        <Link to={`/product/${product._id}`}>
                            <Image src={product.image} alt={product.name} fluid />
                            <Carousel.Caption className='carousel-caption'>
                                <h2>{product.name} ({product.price})</h2>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>
        )
    )
}

export default ProductCarousel