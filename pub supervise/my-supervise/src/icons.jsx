import React from 'react';

export function GraduationCap({ size = 18, weight = 'bold', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="currentColor" className={className}>
      <path d="M251.76,88.94l-120-64a8,8,0,0,0-7.52,0l-120,64a8,8,0,0,0,0,14.12L32,117.87v48.42a15.91,15.91,0,0,0,4.06,10.65C49.16,191.53,78.51,216,128,216s78.84-24.47,91.94-39.06A15.91,15.91,0,0,0,224,166.29V117.87l27.76-14.81a8,8,0,0,0,0-14.12ZM128,41.42l98.58,52.58L128,146.58,29.42,94ZM208,166.29c-10.74,12-35.43,33.71-80,33.71s-69.26-21.76-80-33.71V126.4l76.24,40.66a8,8,0,0,0,7.52,0L208,126.4Z"/>
    </svg>
  );
}

export function UserPlus({ size = 16, weight = 'bold', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="currentColor" className={className}>
      <path d="M256,128a8,8,0,0,1-8,8H232v16a8,8,0,0,1-16,0V136H200a8,8,0,0,1,0-16h16V104a8,8,0,0,1,16,0v16h16A8,8,0,0,1,256,128ZM149.66,150.4a64,64,0,1,0-83.32,0A104.13,104.13,0,0,0,8,224a8,8,0,0,0,16,0,88,88,0,0,1,168,0,8,8,0,0,0,16,0A104.13,104.13,0,0,0,149.66,150.4ZM64,112a48,48,0,1,1,48,48A48.05,48.05,0,0,1,64,112Z"/>
    </svg>
  );
}

export function X({ size = 18, weight = 'regular', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="currentColor" className={className}>
      <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"/>
    </svg>
  );
}

export function Check({ size = 16, weight = 'regular', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="currentColor" className={className}>
      <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"/>
    </svg>
  );
}

export function PaperPlaneTilt({ size = 16, weight = 'regular', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="currentColor" className={className}>
      <path d="M227.32,28.68a16,16,0,0,0-15.66-4.08l-192,56a16,16,0,0,0-2.49,29.8L102,142.1l31.7,84.8a16,16,0,0,0,15,10.42q1.35,0,2.7-.24a16,16,0,0,0,12.1-10.74l56-192A16,16,0,0,0,227.32,28.68ZM146.47,219.78,118.8,145.8l63.53-63.54a8,8,0,0,0-11.32-11.32L107.47,134.48,33.48,106.8l176-51.34Z"/>
    </svg>
  );
}

