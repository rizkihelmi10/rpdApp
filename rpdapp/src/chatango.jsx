import React, { useState, useEffect } from 'react';

export default function ChatBox() {
  const [isLoading, setIsLoading] = useState(true);

  const webViewContent = `
  <html>
    <head>
      <style>
        body {
          background-color: #000;
          color: #fff;
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100%;
          overflow: hidden;
        }
      </style>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=3.0, minimum-scale=1.0, user-scalable=yes">
    </head>
    <body>
      <script id="cid0010000156280366624" data-cfasync="false" async="" src="https://st.chatango.com/js/gz/emb.js" style="width:100%;height:100%;">{"handle":"radioppiduniachat","arch":"js","styles":{"a":"#FFFFF","b":100,"c":"000000","d":"FFFFFF","k":"000000","l":"000000","m":"000000","n":"FFFFFF","q":"404041","r":100,"p":10,"cnrs":0.25,"usricon":0.75}}</script>
    </body>
  </html>
  `;

  const renderLoadingView = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', background: 'linear-gradient(to bottom, #000000, #8B0000)' }}>
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
          src={`data:text/html;charset=utf-8,${encodeURIComponent(webViewContent)}`}
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