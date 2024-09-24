import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Message from './Message';
//import { useGetTopProductsQuery } from '../slices/productsApiSlice';

const ProductCarousel = ({products}) => {
  // const { data: products, isLoading, error } = useGetTopProductsQuery();

    // Assuming products is passed as a prop to this component
    const isLoading = !products; // If products is not provided, consider it loading
    const error = null; // Handle any error logic if necessary

  return isLoading ? null : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-primary mb-4'>
      {products.map((product) => (
        <Carousel.Item key={product.id}>
          <Link to={`/product/${product.id}`}>
            <Image src={product.imageUrl} alt={product.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2 className='text-white text-right'>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
