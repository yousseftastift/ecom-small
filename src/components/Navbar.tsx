import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Egg } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { state } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    background: isScrolled 
      ? 'rgba(255, 255, 255, 0.95)' 
      : 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    borderBottom: isScrolled 
      ? '1px solid rgba(226, 232, 240, 0.5)'
      : '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: isScrolled 
      ? '0 4px 20px rgba(0, 0, 0, 0.1)'
      : 'none',
  };

  const linkStyle = (path: string) => ({
    color: isActive(path) ? 'var(--primary-color)' : 'var(--neutral-700)',
    textDecoration: 'none',
    fontWeight: isActive(path) ? '600' : '500',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    position: 'relative' as const,
    padding: '8px 0',
  });

  return (
    <nav style={navStyle}>
      <div className="container">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '80px',
        }}>
          {/* Logo */}
          <Link to="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
            color: 'var(--primary-color)',
            fontSize: '24px',
            fontWeight: '700',
          }}>
            <div style={{
              background: 'linear-gradient(135deg, var(--primary-color), var(--primary-light))',
              borderRadius: '12px',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Egg size={24} color="white" />
            </div>
            NutriEggs
          </Link>

          {/* Desktop Navigation */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '40px',
          }} className="hidden md:flex">
            <Link to="/" style={linkStyle('/')}>Home</Link>
            <Link to="/products" style={linkStyle('/products')}>Products</Link>
            <Link to="/about" style={linkStyle('/about')}>About</Link>
            <Link to="/contact" style={linkStyle('/contact')}>Contact</Link>
            <Link to="/faq" style={linkStyle('/faq')}>FAQ</Link>
          </div>

          {/* Cart and Mobile Menu */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}>
            <Link to="/cart" style={{
              position: 'relative',
              padding: '12px',
              borderRadius: '12px',
              background: 'rgba(139, 92, 246, 0.1)',
              color: 'var(--primary-color)',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <ShoppingCart size={20} />
              {state.itemCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  background: 'var(--accent-color)',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '600',
                }}>
                  {state.itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                display: 'none',
                padding: '12px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--neutral-700)',
              }}
              className="md:hidden flex"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '0 0 20px 20px',
            padding: '20px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          }} className="md:hidden">
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}>
              <Link to="/" style={linkStyle('/')} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link to="/products" style={linkStyle('/products')} onClick={() => setIsMobileMenuOpen(false)}>Products</Link>
              <Link to="/about" style={linkStyle('/about')} onClick={() => setIsMobileMenuOpen(false)}>About</Link>
              <Link to="/contact" style={linkStyle('/contact')} onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
              <Link to="/faq" style={linkStyle('/faq')} onClick={() => setIsMobileMenuOpen(false)}>FAQ</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;