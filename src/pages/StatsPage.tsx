import React from 'react';

const StatsPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-full">
      <div className="content text-center">
          <div className="greeting">
          <h1 className="hello" style={{ fontSize: '2.5rem', color: '#5FF281', fontWeight: '700', marginBottom: '1rem' }}>
              Thống kê
          </h1>
          <p className="subtitle" style={{ fontSize: '1.5rem', color: '#888' }}>
              Xem báo cáo và phân tích hiệu suất công việc
          </p>
          </div>
      </div>
    </div>
  )
};

export default StatsPage;