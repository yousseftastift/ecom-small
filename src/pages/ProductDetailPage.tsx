import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Plus, Minus, ShoppingCart, Heart, Share2, ArrowLeft, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { dispatch } = useCart();

  // Mock product data - in real app, this would come from API
  const mockProduct = {
    id: parseInt(id || '1'),
    name: "Original Egg White Wraps",
    price: 4.99,
    images: [
      "https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/8969224/pexels-photo-8969224.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/6896379/pexels-photo-6896379.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    category: "wraps",
    description: "Our Original Egg White Wraps are made from 100% pure egg whites with no artificial additives. Each wrap contains 5g of complete protein and only 25 calories, making them perfect for healthy meal prep, quick snacks, or gourmet wraps.",
    longDescription: "Transform your meals with our revolutionary Original Egg White Wraps. Made from cage-free eggs and containing zero cholesterol, these wraps are the perfect foundation for your healthy lifestyle. Whether you're meal prepping for the week, creating a quick breakfast, or preparing a gourmet dinner, these versatile wraps adapt to any cuisine or dietary preference.",
    rating: 4.8,
    reviews: 127,
    inStock: true,
    stockCount: 24,
    nutritionFacts: {
      calories: 25,
      protein: 5,
      carbs: 1,
      fat: 0,
      fiber: 0,
      sugar: 0,
      sodium: 85,
    },
    ingredients: ["Egg Whites", "Natural Flavoring", "Salt"],
    benefits: [
      "High in complete protein",
      "Zero cholesterol",
      "Gluten-free",
      "Keto-friendly",
      "Low calorie",
      "Cage-free eggs"
    ],
    features: [
      "Ready to eat",
      "No cooking required",
      "Refrigerated fresh",
      "Stays fresh for 7 days",
      "Perfect for meal prep"
    ]
  };

  useEffect(() => {
    // Simulate API call
    setProduct(mockProduct);
  }, [id]);

  const addToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    }
  };

  const updateQuantity = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  if (!product) {
    return (
      <div style={{
        paddingTop: '80px',
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '80px' }}>
      <div className="container" style={{ padding: '40px 20px' }}>
        {/* Breadcrumb */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          marginBottom: '30px',
          color: 'var(--neutral-600)',
          fontSize: '14px',
        }}>
          <Link to="/" style={{
            color: 'var(--neutral-600)',
            textDecoration: 'none',
          }}>
            Home
          </Link>
          <span>/</span>
          <Link to="/products" style={{
            color: 'var(--neutral-600)',
            textDecoration: 'none',
          }}>
            Products
          </Link>
          <span>/</span>
          <span style={{ color: 'var(--primary-color)' }}>
            {product.name}
          </span>
        </div>

        {/* Back Button */}
        <Link to="/products" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          color: 'var(--primary-color)',
          textDecoration: 'none',
          fontSize: '14px',
          fontWeight: '500',
          marginBottom: '30px',
        }}>
          <ArrowLeft size={18} />
          Back to Products
        </Link>

        {/* Product Details */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'start',
          marginBottom: '60px',
        }}>
          {/* Product Images */}
          <div>
            <div style={{
              borderRadius: '20px',
              overflow: 'hidden',
              marginBottom: '20px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            }}>
              <img 
                src={product.images[selectedImage]}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '500px',
                  objectFit: 'cover',
                }}
              />
            </div>
            
            {/* Thumbnail Images */}
            <div style={{
              display: 'flex',
              gap: '15px',
              justifyContent: 'center',
            }}>
              {product.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    border: selectedImage === index 
                      ? '3px solid var(--primary-color)' 
                      : '3px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <img 
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '15px',
            }}>
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={18} 
                  fill={i < Math.floor(product.rating) ? "var(--warning-color)" : "transparent"}
                  color="var(--warning-color)" 
                />
              ))}
              <span style={{
                fontSize: '16px',
                color: 'var(--neutral-600)',
                marginLeft: '5px',
              }}>
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              marginBottom: '15px',
              color: 'var(--neutral-800)',
              lineHeight: '1.2',
            }}>
              {product.name}
            </h1>

            <p style={{
              fontSize: '1.1rem',
              color: 'var(--neutral-600)',
              marginBottom: '25px',
              lineHeight: '1.6',
            }}>
              {product.description}
            </p>

            <div style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: 'var(--primary-color)',
              marginBottom: '30px',
            }}>
              ${product.price}
            </div>

            {/* Stock Status */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '30px',
              padding: '15px',
              background: product.inStock 
                ? 'rgba(16, 185, 129, 0.1)' 
                : 'rgba(239, 68, 68, 0.1)',
              borderRadius: '12px',
            }}>
              <Check 
                size={20} 
                color={product.inStock ? 'var(--success-color)' : 'var(--error-color)'} 
              />
              <span style={{
                color: product.inStock ? 'var(--success-color)' : 'var(--error-color)',
                fontWeight: '500',
              }}>
                {product.inStock 
                  ? `In Stock (${product.stockCount} available)` 
                  : 'Out of Stock'
                }
              </span>
            </div>

            {/* Quantity Selector */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginBottom: '30px',
            }}>
              <span style={{
                fontSize: '16px',
                fontWeight: '500',
                color: 'var(--neutral-700)',
              }}>
                Quantity:
              </span>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                border: '2px solid var(--neutral-200)',
                borderRadius: '12px',
                overflow: 'hidden',
              }}>
                <button
                  onClick={() => updateQuantity(-1)}
                  style={{
                    padding: '12px 16px',
                    background: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--neutral-600)',
                    fontSize: '18px',
                    fontWeight: '600',
                  }}
                >
                  <Minus size={16} />
                </button>
                <span style={{
                  padding: '12px 20px',
                  background: 'var(--neutral-50)',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: 'var(--neutral-800)',
                  minWidth: '60px',
                  textAlign: 'center',
                }}>
                  {quantity}
                </span>
                <button
                  onClick={() => updateQuantity(1)}
                  style={{
                    padding: '12px 16px',
                    background: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--neutral-600)',
                    fontSize: '18px',
                    fontWeight: '600',
                  }}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '15px',
              marginBottom: '40px',
            }}>
              <button 
                onClick={addToCart}
                disabled={!product.inStock}
                className="btn btn-primary"
                style={{
                  flex: 1,
                  fontSize: '16px',
                  fontWeight: '600',
                  opacity: product.inStock ? 1 : 0.5,
                  cursor: product.inStock ? 'pointer' : 'not-allowed',
                }}
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                style={{
                  padding: '15px',
                  background: isWishlisted ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.1)',
                  border: '2px solid var(--accent-color)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  color: isWishlisted ? 'white' : 'var(--accent-color)',
                  transition: 'all 0.3s ease',
                }}
              >
                <Heart size={20} fill={isWishlisted ? 'white' : 'transparent'} />
              </button>
              
              <button
                style={{
                  padding: '15px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '2px solid var(--secondary-color)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  color: 'var(--secondary-color)',
                  transition: 'all 0.3s ease',
                }}
              >
                <Share2 size={20} />
              </button>
            </div>

            {/* Product Benefits */}
            <div className="glass-card" style={{ padding: '25px' }}>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                marginBottom: '15px',
                color: 'var(--neutral-800)',
              }}>
                Key Benefits
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '10px',
              }}>
                {product.benefits.map((benefit: string, index: number) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '14px',
                    color: 'var(--neutral-700)',
                  }}>
                    <Check size={16} color="var(--success-color)" />
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '30px',
          marginBottom: '60px',
        }}>
          {/* Nutrition Facts */}
          <div className="glass-card" style={{ padding: '30px' }}>
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: '600',
              marginBottom: '20px',
              color: 'var(--neutral-800)',
            }}>
              Nutrition Facts
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}>
              {Object.entries(product.nutritionFacts).map(([key, value]) => (
                <div key={key} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingBottom: '8px',
                  borderBottom: '1px solid var(--neutral-200)',
                }}>
                  <span style={{
                    fontSize: '14px',
                    color: 'var(--neutral-600)',
                    textTransform: 'capitalize',
                  }}>
                    {key === 'carbs' ? 'Carbohydrates' : key}
                  </span>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: 'var(--neutral-800)',
                  }}>
                    {value}{key === 'calories' ? '' : key === 'sodium' ? 'mg' : 'g'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Ingredients */}
          <div className="glass-card" style={{ padding: '30px' }}>
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: '600',
              marginBottom: '20px',
              color: 'var(--neutral-800)',
            }}>
              Ingredients
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}>
              {product.ingredients.map((ingredient: string, index: number) => (
                <div key={index} style={{
                  fontSize: '14px',
                  color: 'var(--neutral-700)',
                  padding: '8px 12px',
                  background: 'var(--neutral-50)',
                  borderRadius: '8px',
                }}>
                  {ingredient}
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="glass-card" style={{ padding: '30px' }}>
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: '600',
              marginBottom: '20px',
              color: 'var(--neutral-800)',
            }}>
              Features
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}>
              {product.features.map((feature: string, index: number) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '14px',
                  color: 'var(--neutral-700)',
                }}>
                  <Check size={16} color="var(--primary-color)" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Long Description */}
        <div className="glass-card" style={{
          padding: '40px',
          marginBottom: '60px',
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '20px',
            color: 'var(--neutral-800)',
          }}>
            Product Description
          </h3>
          <p style={{
            fontSize: '16px',
            color: 'var(--neutral-700)',
            lineHeight: '1.8',
          }}>
            {product.longDescription}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;