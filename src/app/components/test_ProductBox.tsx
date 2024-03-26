import { render, screen, fireEvent } from '@testing-library/react';
import ProductBox from './ProductBox';

describe('ProductBox', () => {
  const mockProduct = {
    id: 1,
    category: 'Category',
    collection: 'Collection',
    code: 'Code',
    name: 'Product Name',
    description: 'Product Description',
    highlight: 'Product Highlight',
    stock: 10,
    size: 'Product Size',
    color: 'Product Color',
    status: 'Product Status',
    price: 9.99,
    image: 'product-image.jpg',
  };

  test('renders product details correctly', () => {
    render(<ProductBox {...mockProduct} />);
    
    expect(screen.getByText(mockProduct.category)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();
  });

  test('displays out of stock message when stock is 0', () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 };
    render(<ProductBox {...outOfStockProduct} />);
    
    expect(screen.getByText('Out of Stock')).toBeInTheDocument();
  });

  test('adds product to cart when "Add to Cart" button is clicked', () => {
    const addToCartMock = jest.fn();
    const { getByText } = render(
      <ProductBox {...mockProduct} addToCart={addToCartMock} />
    );
    
    fireEvent.click(getByText('Add to Cart'));
    
    expect(addToCartMock).toHaveBeenCalledWith(mockProduct);
  });

  test('displays "Added!" when product is added to cart', () => {
    const { getByText } = render(<ProductBox {...mockProduct} />);
    const addToCartButton = getByText('Add to Cart');
    
    fireEvent.click(addToCartButton);
    
    expect(getByText('Added!')).toBeInTheDocument();
  });

  test('displays stock count', () => {
    render(<ProductBox {...mockProduct} />);
    
    expect(screen.getByText(`Stock: ${mockProduct.stock}`)).toBeInTheDocument();
  });

  test('opens product details modal when "View Details" button is clicked', () => {
    const onOpenMock = jest.fn();
    const { getByText } = render(
      <ProductBox {...mockProduct} productModal={{ onOpen: onOpenMock }} />
    );
    
    fireEvent.click(getByText('View Details'));
    
    expect(onOpenMock).toHaveBeenCalled();
  });
});