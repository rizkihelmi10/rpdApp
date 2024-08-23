import React, { useState, useEffect } from 'react';

export default function Schedule() {
  const [isLoading, setIsLoading] = useState(true);

  const renderLoadingView = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'linear-gradient(to bottom, #000000, #8B0000)' }}>
      <ActivityIndicator size="large" color="#ffffff" />
    </div>
  );

  useEffect(() => {
    // Simulate loading for web
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ height: '100vh', width: '100vw', background: 'linear-gradient(to bottom, #000000, #8B0000)', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '15px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)' }}>
      {isLoading ? (
        renderLoadingView()
      ) : (
        <iframe
          src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSYiE12FRYXwdS-OZeYKhCCmrGrui-wY18BdJ_i0qrRctyGWavoOu6OD4uRs_WEwXOCAgN3MAt-ba-B/pubhtml?gid=0&single=true&rm=minimal"
          style={{ border: 'none', width: '100%', height: '100%', borderRadius: '10px', overflow: 'hidden' }}
        />
      )}
    </div>
  );
}

function ActivityIndicator({ size, color }) {
  return (
    <div style={{ fontSize: size, color: color, fontWeight: 'bold', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)' }}>
      Loading...
    </div>
  );
}