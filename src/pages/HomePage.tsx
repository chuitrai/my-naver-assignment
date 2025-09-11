import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-full">
            <div className="content text-center">
              <div className="greeting">
                <h1 className="hello" style={{ fontSize: '2.5rem', color: '#5FF281', fontWeight: '700', marginBottom: '1rem' }}>
                  Chào mừng về nhà
                </h1>
                <p className="subtitle" style={{ fontSize: '1.5rem', color: '#888' }}>
                  Đây là trang chủ của ứng dụng quản lý công việc
                </p>
              </div>
            </div>
          </div>
  )
};

export default HomePage;