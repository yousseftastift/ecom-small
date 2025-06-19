import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Filter, Search, Grid, List } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductsPage: React.FC = () => {
  const [products] = useState([
    {
      id: 1,
      name: "Original Egg White Wraps",
      price: 4.99,
      image: "https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "wraps",
      description: "Pure egg white wraps with no added ingredients. Perfect for healthy wraps and sandwiches.",
      rating: 4.8,
      reviews: 127,
      inStock: true,
    },
    {
      id: 2,
      name: "Everything Seasoned Wraps",
      price: 5.49,
      image: "https://images.pexels.com/photos/5938436/pexels-photo-5938436.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "wraps",
      description: "Delicious egg white wraps seasoned with everything bagel seasoning for extra flavor.",
      rating: 4.9,
      reviews: 98,
      inStock: true,
    },
    {
      id: 3,
      name: "Southwestern Wraps",
      price: 5.49,
      image: "https://images.pexels.com/photos/7937473/pexels-photo-7937473.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "wraps",
      description: "Spicy southwestern-flavored egg white wraps perfect for Mexican-inspired dishes.",
      rating: 4.7,
      reviews: 86,
      inStock: true,
    },
    {
      id: 4,
      name: "Italian Herb Wraps",
      price: 5.49,
      image: "https://images.pexels.com/photos/7937481/pexels-photo-7937481.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "wraps",
      description: "Aromatic Italian herbs blend with pure egg whites for Mediterranean-inspired meals.",
      rating: 4.6,
      reviews: 72,
      inStock: true,
    },
    {
      id: 5,
      name: "Sweet Cinnamon Wraps",
      price: 5.99,
      image: "https://images.pexels.com/photos/5853923/pexels-photo-5853923.jpeg",
      category: "sweet",
      description: "Sweet cinnamon-flavored wraps perfect for breakfast or dessert applications.",
      rating: 4.5,
      reviews: 64,
      inStock: false,
    },
    {
      id: 6,
      name: "Vanilla Protein Wraps",
      price: 6.49,
      image: "https://images.pexels.com/photos/31336113/pexels-photo-31336113.jpeg",
      category: "sweet",
      description: "Enhanced with vanilla protein powder for extra nutritional benefits.",
      rating: 4.8,
      reviews: 91,
      inStock: true,
    }
  ]);

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState([0, 10]);
  const { dispatch } = useCart();

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by price range
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, sortBy, searchTerm, priceRange, products]);

  const addToCart = (product: any) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const categories = [
    { id: 'all', name: 'All Products', count: products.length },
    { id: 'wraps', name: 'Savory Wraps', count: products.filter(p => p.category === 'wraps').length },
    { id: 'sweet', name: 'Sweet Wraps', count: products.filter(p => p.category === 'sweet').length },
  ];

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
        color: 'white',
        padding: '80px 0',
        textAlign: 'center',
      }}>
        <div className="container">
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '700',
            marginBottom: '20px',
          }}>
            Our Products
          </h1>
          <p style={{
            fontSize: '1.2rem',
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6',
          }}>
            Discover our complete range of premium egg white products designed for your healthy lifestyle
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '40px 20px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '280px 1fr',
          gap: '40px',
          alignItems: 'start',
        }}>
          {/* Filters Sidebar */}
          <div className="glass-card" style={{
            padding: '30px',
            position: 'sticky',
            top: '120px',
          }}>
            <h3 style={{
              fontSize: '1.2rem',
              fontWeight: '600',
              marginBottom: '20px',
              color: 'var(--neutral-800)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <Filter size={20} />
              Filters
            </h3>

            {/* Search */}
            <div style={{ marginBottom: '30px' }}>
              <label style={{
                display: 'block',
                marginBottom: '10px',
                fontWeight: '500',
                color: 'var(--neutral-700)',
              }}>
                Search Products
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '40px' }}
                />
                <Search 
                  size={18} 
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--neutral-400)',
                  }}
                />
              </div>
            </div>

            {/* Categories */}
            <div style={{ marginBottom: '30px' }}>
              <label style={{
                display: 'block',
                marginBottom: '15px',
                fontWeight: '500',
                color: 'var(--neutral-700)',
              }}>
                Categories
              </label>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      background: selectedCategory === category.id 
                        ? 'var(--primary-color)' 
                        : 'transparent',
                      color: selectedCategory === category.id 
                        ? 'white' 
                        : 'var(--neutral-700)',
                      border: selectedCategory === category.id 
                        ? 'none' 
                        : '1px solid var(--neutral-200)',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <span>{category.name}</span>
                    <span style={{
                      background: selectedCategory === category.id 
                        ? 'rgba(255, 255, 255, 0.2)' 
                        : 'var(--neutral-100)',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                    }}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div style={{ marginBottom: '30px' }}>
              <label style={{
                display: 'block',
                marginBottom: '15px',
                fontWeight: '500',
                color: 'var(--neutral-700)',
              }}>
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseFloat(e.target.value)])}
                style={{
                  width: '100%',
                  background: 'var(--primary-color)',
                }}
              />
            </div>

            {/* Sort By */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '10px',
                fontWeight: '500',
                color: 'var(--neutral-700)',
              }}>
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-input"
              >
                <option value="name">Name (A-Z)</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div>
            {/* View Controls */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '30px',
              flexWrap: 'wrap',
              gap: '20px',
            }}>
              <div>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: 'var(--neutral-800)',
                  marginBottom: '5px',
                }}>
                  {filteredProducts.length} Products Found
                </h2>
                <p style={{
                  color: 'var(--neutral-600)',
                  fontSize: '14px',
                }}>
                  {selectedCategory !== 'all' && `Filtered by: ${categories.find(c => c.id === selectedCategory)?.name}`}
                </p>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}>
                <button
                  onClick={() => setViewMode('grid')}
                  style={{
                    padding: '10px',
                    background: viewMode === 'grid' ? 'var(--primary-color)' : 'transparent',
                    color: viewMode === 'grid' ? 'white' : 'var(--neutral-600)',
                    border: '1px solid var(--neutral-200)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  style={{
                    padding: '10px',
                    background: viewMode === 'list' ? 'var(--primary-color)' : 'transparent',
                    color: viewMode === 'list' ? 'white' : 'var(--neutral-600)',
                    border: '1px solid var(--neutral-200)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <List size={18} />
                </button>
              </div>
            </div>

            {/* Products Display */}
            {filteredProducts.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: 'var(--neutral-600)',
              }}>
                <h3 style={{ marginBottom: '10px' }}>No products found</h3>
                <p>Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: viewMode === 'grid' 
                  ? 'repeat(auto-fit, minmax(280px, 1fr))' 
                  : '1fr',
                gap: '30px',
              }}>
                {filteredProducts.map((product) => (
                  <div 
                    key={product.id}
                    className="glass-card"
                    style={{
                      overflow: 'hidden',
                      display: viewMode === 'list' ? 'flex' : 'block',
                      flexDirection: viewMode === 'list' ? 'row' : 'column',
                      alignItems: viewMode === 'list' ? 'center' : 'stretch',
                      gap: viewMode === 'list' ? '20px' : '0',
                    }}
                  >
                    <div style={{
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: viewMode === 'list' ? '15px' : '20px 20px 0 0',
                      flexShrink: 0,
                      width: viewMode === 'list' ? '200px' : '100%',
                      height: viewMode === 'list' ? '150px' : '200px',
                    }}>
                      <img 
                        src={product.image}
                        alt={product.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      />
                      
                      {!product.inStock && (
                        <div style={{
                          position: 'absolute',
                          top: '10px',
                          left: '10px',
                          background: 'var(--error-color)',
                          color: 'white',
                          padding: '5px 10px',
                          borderRadius: '15px',
                          fontSize: '12px',
                          fontWeight: '600',
                        }}>
                          Out of Stock
                        </div>
                      )}
                      
                      <div style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'var(--success-color)',
                        color: 'white',
                        padding: '5px 10px',
                        borderRadius: '15px',
                        fontSize: '12px',
                        fontWeight: '600',
                      }}>
                        {product.rating}★
                      </div>
                    </div>
                    
                    <div style={{ 
                      padding: viewMode === 'list' ? '20px 20px 20px 0' : '25px',
                      flex: viewMode === 'list' ? 1 : 'none',
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginBottom: '10px',
                      }}>
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={14} 
                            fill={i < Math.floor(product.rating) ? "var(--warning-color)" : "transparent"}
                            color="var(--warning-color)" 
                          />
                        ))}
                        <span style={{
                          fontSize: '13px',
                          color: 'var(--neutral-600)',
                        }}>
                          ({product.reviews})
                        </span>
                      </div>
                      
                      <h3 style={{
                        fontSize: '1.2rem',
                        fontWeight: '600',
                        marginBottom: '8px',
                        color: 'var(--neutral-800)',
                      }}>
                        {product.name}
                      </h3>
                      
                      <p style={{
                        color: 'var(--neutral-600)',
                        marginBottom: '15px',
                        fontSize: '14px',
                        lineHeight: '1.5',
                      }}>
                        {product.description}
                      </p>
                      
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '15px',
                      }}>
                        <span style={{
                          fontSize: '1.4rem',
                          fontWeight: '700',
                          color: 'var(--primary-color)',
                        }}>
                          ${product.price}
                        </span>
                        <Link 
                          to={`/product/${product.id}`}
                          style={{
                            color: 'var(--secondary-color)',
                            textDecoration: 'none',
                            fontSize: '14px',
                            fontWeight: '500',
                          }}
                        >
                          View Details
                        </Link>
                      </div>
                      
                      <div style={{
                        display: 'flex',
                        gap: '10px',
                      }}>
                        <button 
                          onClick={() => addToCart(product)}
                          disabled={!product.inStock}
                          className="btn btn-primary"
                          style={{
                            flex: 1,
                            opacity: product.inStock ? 1 : 0.5,
                            cursor: product.inStock ? 'pointer' : 'not-allowed',
                          }}
                        >
                          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;