import React, { useState } from 'react';
import { Home, CheckSquare, BarChart3, User } from 'lucide-react';

import HomePage  from '../pages/HomePage';
import TasksPage from '../pages/TasksPage';
import StatsPage from '../pages/StatsPage';

import naverLogo from '../assets/naver-logo.svg'
import hackathonGraphic from '../assets/hackathon-graphic.svg'


const Layout = () => {
  const [activeTab, setActiveTab] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'task', label: 'Task', icon: CheckSquare },
    { id: 'stats', label: 'Stats', icon: BarChart3 },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'task':
        return <TasksPage />;
      case 'stats':
        return <StatsPage />;
      case 'profile':
        return (
          <div className="flex items-center justify-center min-h-full">
            <div className="content text-center">
              <User size={64} style={{ color: '#5FF281', margin: '0 auto 2rem' }} />
              <div className="greeting">
                <h1 className="hello" style={{ fontSize: '2.5rem', color: '#5FF281', fontWeight: '700', marginBottom: '1rem' }}>
                  Hồ sơ cá nhân
                </h1>
                <p className="subtitle" style={{ fontSize: '1.5rem', color: '#888' }}>
                  Quản lý thông tin và cài đặt tài khoản
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#1a1a2e', 
      color: 'white',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <header style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
        borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '0 0 16px 16px',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ width: '100%', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            height: '4rem' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={hackathonGraphic} alt="Hackathon Graphic" style={{ width: 20, height: 'auto', marginRight: 4 }} />
              <h1 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '700', 
                color: '#5FF281',
                margin: 0
              }}>
                MyApp
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav style={{ display: 'none' }} className="md:block">
              <div style={{ display: 'flex', gap: '1rem' }}>
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        border: '1px solid transparent',
                        fontSize: '1em',
                        fontWeight: '500',
                        fontFamily: 'inherit',
                        background: activeTab === item.id ? 'rgba(95, 242, 129, 0.2)' : 'transparent',
                        color: activeTab === item.id ? '#5FF281' : '#888',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease',
                        gap: '0.5rem'
                      }}
                      onMouseEnter={(e) => {
                        if (activeTab !== item.id) {
                          e.currentTarget.style.color = '#5FF281';
                          e.currentTarget.style.background = 'rgba(95, 242, 129, 0.1)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (activeTab !== item.id) {
                          e.currentTarget.style.color = '#888';
                          e.currentTarget.style.background = 'transparent';
                        }
                      }}
                    >
                      <IconComponent size={16} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex' }}>
        {renderContent()}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'sticky',
        bottom: 0,
        display: 'flex'
      }} className="md:hidden">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '0.75rem 0.25rem',
                fontSize: '0.75rem',
                fontWeight: '500',
                color: activeTab === item.id ? '#5FF281' : '#888',
                background: activeTab === item.id ? 'rgba(95, 242, 129, 0.1)' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                gap: '0.25rem'
              }}
            >
              <IconComponent size={20} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <footer style={{
        background: 'rgba(0, 0, 0, 0.3)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '2rem 0'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            <div>
              <h3 style={{ 
                fontSize: '1.125rem', 
                fontWeight: '600', 
                marginBottom: '1rem',
                color: '#5FF281'
              }}>
                MyApp
              </h3>
              <p style={{ color: '#888', fontSize: '0.875rem', lineHeight: '1.6' }}>
                Ứng dụng quản lý công việc hiệu quả giúp bạn tổ chức và theo dõi các task một cách dễ dàng.
              </p>
            </div>
            
            <div>
              <h3 style={{ 
                fontSize: '1.125rem', 
                fontWeight: '600', 
                marginBottom: '1rem',
                color: '#5FF281'
              }}>
                Liên kết nhanh
              </h3>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {['Hướng dẫn sử dụng', 'Hỗ trợ', 'Phản hồi'].map((link, index) => (
                  <li key={index} style={{ marginBottom: '0.5rem' }}>
                    <a 
                      href="#" 
                      style={{ 
                        color: '#888', 
                        fontSize: '0.875rem',
                        textDecoration: 'none',
                        transition: 'color 0.25s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#5FF281'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#888'}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 style={{ 
                fontSize: '1.125rem', 
                fontWeight: '600', 
                marginBottom: '1rem',
                color: '#5FF281'
              }}>
                Liên hệ
              </h3>
              <div style={{ color: '#888', fontSize: '0.875rem' }}>
                <p style={{ marginBottom: '0.5rem' }}>Email: support@myapp.com</p>
                <p style={{ marginBottom: '0.5rem' }}>Phone: +84 123 456 789</p>
                <p>Địa chỉ: TP. Hồ Chí Minh, Việt Nam</p>
              </div>
            </div>

            
          </div>
          
          <div style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '2rem',
            textAlign: 'center',
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            color: '#888'
          }}>
            <img src={naverLogo} alt="Naver Logo" style={{ width: 120, height: 'auto', marginRight: 16 }} />
            <p>&copy; 2024 MyApp. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>

      <style >{`
        @media (min-width: 768px) {
          .md\\:block {
            display: block !important;
          }
          .md\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;