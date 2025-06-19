import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Heart, Zap, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';

const HomePage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { dispatch } = useCart();

  useEffect(() => {
    setIsVisible(true);
    
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const featuredProducts = [
    {
      id: 1,
      name: "Original Egg White Wraps",
      price: 4.99,
      image: "https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "wraps",
      description: "Pure egg white wraps with no added ingredients. Perfect for healthy wraps and sandwiches.",
      rating: 4.8,
      reviews: 127,
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
    },
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Heart Healthy",
      description: "Zero cholesterol and low sodium for cardiovascular wellness",
    },
    {
      icon: Zap,
      title: "High Protein",
      description: "5g of complete protein per wrap to fuel your active lifestyle",
    },
    {
      icon: Shield,
      title: "Clean Ingredients",
      description: "Made with simple, natural ingredients you can pronounce",
    },
    {
      icon: Star,
      title: "Versatile",
      description: "Perfect for breakfast, lunch, dinner, or healthy snacks",
    },
  ];

  const addToCart = (product: any) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(6, 182, 212, 0.1))',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(https://images.pexels.com/photos/6896379/pexels-photo-6896379.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.1,
          zIndex: -1,
        }} />
        
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '60px',
            alignItems: 'center',
          }} className="lg:grid-cols-2 grid-cols-1">
            <div className={`fade-in ${isVisible ? 'visible' : ''}`}>
              <h1 style={{
                fontSize: '3.5rem',
                fontWeight: '700',
                lineHeight: '1.1',
                marginBottom: '24px',
                background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Pure Protein, <br />
                Endless Possibilities
              </h1>
              <p style={{
                fontSize: '1.25rem',
                color: 'var(--neutral-600)',
                marginBottom: '32px',
                lineHeight: '1.6',
              }}>
                Discover the revolutionary egg white wraps that are transforming healthy eating. 
                High in protein, low in calories, and bursting with possibilities.
              </p>
              <div style={{
                display: 'flex',
                gap: '20px',
                flexWrap: 'wrap',
              }}>
                <Link to="/products" className="btn btn-primary">
                  Shop Now
                  <ArrowRight size={20} />
                </Link>
                <Link to="/about" className="btn btn-outline">
                  Learn More
                </Link>
              </div>
              
              {/* Stats */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '30px',
                marginTop: '50px',
              }}>
                {[
                  { number: '5g', label: 'Protein per wrap' },
                  { number: '25', label: 'Calories only' },
                  { number: '0g', label: 'Added sugar' },
                ].map((stat, index) => (
                  <div key={index} style={{ textAlign: 'center' }}>
                    <div style={{
                      fontSize: '2rem',
                      fontWeight: '700',
                      color: 'var(--primary-color)',
                      marginBottom: '5px',
                    }}>
                      {stat.number}
                    </div>
                    <div style={{
                      fontSize: '0.9rem',
                      color: 'var(--neutral-600)',
                    }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={`slide-in-right ${isVisible ? 'visible' : ''}`}>
              <div style={{
                position: 'relative',
                borderRadius: '30px',
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
              }}>
                <img 
                  src="https://images.pexels.com/photos/8969224/pexels-photo-8969224.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="NutriEggs Product"
                  style={{
                    width: '100%',
                    height: '600px',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '30px',
                  left: '30px',
                  right: '30px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  padding: '20px',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '10px',
                  }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill="var(--warning-color)" color="var(--warning-color)" />
                    ))}
                    <span style={{
                      fontSize: '14px',
                      color: 'var(--neutral-600)',
                      marginLeft: '5px',
                    }}>
                      4.8/5 (500+ reviews)
                    </span>
                  </div>
                  <p style={{
                    fontSize: '16px',
                    color: 'var(--neutral-700)',
                    fontStyle: 'italic',
                  }}>
                    "These wraps have completely changed my meal prep game!"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          color: 'var(--neutral-600)',
        }}>
          <span style={{ fontSize: '14px' }}>Scroll to explore</span>
          <ChevronDown 
            size={24} 
            style={{
              animation: 'bounce 2s infinite',
            }}
          />
        </div>
      </section>

      {/* Benefits Section */}
      <section style={{
        padding: '100px 0',
        background: 'white',
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 className="fade-in" style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              marginBottom: '20px',
              color: 'var(--neutral-800)',
            }}>
              Why Choose NutriEggs?
            </h2>
            <p className="fade-in" style={{
              fontSize: '1.1rem',
              color: 'var(--neutral-600)',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6',
            }}>
              Our egg white wraps offer the perfect combination of nutrition, convenience, and taste
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px',
          }}>
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="fade-in glass-card"
                style={{
                  padding: '40px 30px',
                  textAlign: 'center',
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div style={{
                  background: 'linear-gradient(135deg, var(--primary-color), var(--primary-light))',
                  borderRadius: '20px',
                  width: '60px',
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                }}>
                  <benefit.icon size={28} color="white" />
                </div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  marginBottom: '15px',
                  color: 'var(--neutral-800)',
                }}>
                  {benefit.title}
                </h3>
                <p style={{
                  color: 'var(--neutral-600)',
                  lineHeight: '1.6',
                }}>
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{
        padding: '100px 0',
        background: 'linear-gradient(135deg, var(--neutral-50), rgba(139, 92, 246, 0.05))',
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 className="fade-in" style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              marginBottom: '20px',
              color: 'var(--neutral-800)',
            }}>
              Featured Products
            </h2>
            <p className="fade-in" style={{
              fontSize: '1.1rem',
              color: 'var(--neutral-600)',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6',
            }}>
              Discover our most popular egg white wraps loved by health enthusiasts
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
          }}>
            {featuredProducts.map((product, index) => (
              <div 
                key={product.id}
                className="fade-in glass-card"
                style={{
                  overflow: 'hidden',
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div style={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '20px 20px 0 0',
                }}>
                  <img 
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '250px',
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
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    background: 'var(--accent-color)',
                    color: 'white',
                    padding: '5px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                  }}>
                    Popular
                  </div>
                </div>
                
                <div style={{ padding: '30px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '10px',
                  }}>
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        fill={i < Math.floor(product.rating) ? "var(--warning-color)" : "transparent"}
                        color="var(--warning-color)" 
                      />
                    ))}
                    <span style={{
                      fontSize: '14px',
                      color: 'var(--neutral-600)',
                      marginLeft: '5px',
                    }}>
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                  
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: '600',
                    marginBottom: '10px',
                    color: 'var(--neutral-800)',
                  }}>
                    {product.name}
                  </h3>
                  
                  <p style={{
                    color: 'var(--neutral-600)',
                    marginBottom: '20px',
                    lineHeight: '1.6',
                    fontSize: '14px',
                  }}>
                    {product.description}
                  </p>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                  }}>
                    <span style={{
                      fontSize: '1.5rem',
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
                  
                  <button 
                    onClick={() => addToCart(product)}
                    className="btn btn-primary"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <Link to="/products" className="btn btn-secondary">
              View All Products
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '100px 0',
        background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
        color: 'white',
        textAlign: 'center',
      }}>
        <div className="container">
          <div className="fade-in" style={{
            maxWidth: '600px',
            margin: '0 auto',
          }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              marginBottom: '20px',
            }}>
              Ready to Transform Your Meals?
            </h2>
            <p style={{
              fontSize: '1.1rem',
              marginBottom: '40px',
              opacity: 0.9,
              lineHeight: '1.6',
            }}>
              Join thousands of health-conscious individuals who have discovered the perfect 
              protein-packed solution for their active lifestyle.
            </p>
            <div style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}>
              <Link to="/products" className="btn" style={{
                background: 'white',
                color: 'var(--primary-color)',
                fontWeight: '600',
              }}>
                Shop Products
                <ArrowRight size={20} />
              </Link>
              <Link to="/contact" className="btn btn-outline" style={{
                borderColor: 'white',
                color: 'white',
              }}>
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Add bounce keyframes */}
      <style>
        {`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0) translateX(-50%);
            }
            40% {
              transform: translateY(-10px) translateX(-50%);
            }
            60% {
              transform: translateY(-5px) translateX(-50%);
            }
          }
        `}
      </style>
    </div>
  );
};

export default HomePage;