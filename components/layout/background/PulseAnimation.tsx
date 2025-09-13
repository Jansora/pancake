import React from 'react';
import './PulseAnimation.css';

interface PulseAnimationProps {
  width?: string;
  height?: string;
  className?: string;
}

const PulseAnimation: React.FC<PulseAnimationProps> = ({ 
  width = '300px', 
  height = '100vh',
  className = ''
}) => {
  return (
    <div 
      className={`pulse-container ${className}`}
      style={{ width, height }}
    >
      {/* 背景粒子 */}
      {/*<div className="background-particles">*/}
      {/*  {Array.from({ length: 9 }, (_, index) => (*/}
      {/*    <div key={index} className="particle" />*/}
      {/*  ))}*/}
      {/*</div>*/}
      
      {/* 脉冲环 */}
      {Array.from({ length: 4 }, (_, index) => (
        <div key={index} className="pulse-ring" />
      ))}
      
      {/* 中心脉冲圆 */}
      <div className="pulse-circle" />
    </div>
  );
};

export default PulseAnimation; 