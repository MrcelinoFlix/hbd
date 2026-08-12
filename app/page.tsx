"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // 1. Import useRouter dari Next.js

export default function SecretCodePage() {
  const router = useRouter(); // 2. Inisialisasi router

  const [pin, setPin] = useState(['', '', '', '']);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isShaking, setIsShaking] = useState(false);
  const [particles, setParticles] = useState<any[]>([]);
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const SECRET_CODE = "1308";

  // Membuat partikel debu terbang secara acak setelah komponen dimuat (Client-side)
  useEffect(() => {
    const particleArray = Array.from({ length: 70 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 4 + 4}s`, // durasi 4-8 detik
      animationDelay: `${Math.random() * 5}s`, // delay acak
      size: `${Math.random() * 3 + 1}px`, // ukuran 1-4px
      opacity: Math.random() * 0.6 + 0.2,
    }));
    setParticles(particleArray);
  }, []);

  const handleChange = (index: number, value: string) => {
    const newValue = value.replace(/[^0-9]/g, '');
    if (!newValue && value !== '') return;

    const newPin = [...pin];
    newPin[index] = newValue.slice(-1);
    setPin(newPin);

    if (newValue !== '' && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && pin[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'Enter') {
      checkCode();
    }
  };

  const checkCode = () => {
    const enteredCode = pin.join('');
    
    if (enteredCode.length < 4) {
      showMessage("Harap masukkan 4 digit kode.", "error");
      triggerShake();
    } else if (enteredCode === SECRET_CODE) {
      showMessage("Berhasil! Akses diberikan ✨", "success");
      
      // 3. Tambahkan logika untuk pindah halaman dengan jeda 1 detik
      setTimeout(() => {
        router.push('/home'); // Mengarahkan ke rute /home
      }, 1000); 

    } else {
      showMessage("Kode salah. Coba lagi.", "error");
      triggerShake();
      setPin(['', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage({ text, type });
  };

  const triggerShake = () => {
    setIsShaking(false);
    setTimeout(() => setIsShaking(true), 10);
    setTimeout(() => setIsShaking(false), 410);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Inter:wght@400;500;600&display=swap');

          /* Latar belakang ungu gelap dengan pusat yang bercahaya */
          .glowing-background {
              background-color: #0b0213;
              background-image: radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.4) 0%, rgba(59, 7, 100, 0.6) 40%, #05010a 100%);
              min-height: 100vh;
              display: flex;
              justify-content: center;
              align-items: center;
              font-family: 'Inter', sans-serif;
              color: #ffffff;
              overflow: hidden;
              position: relative;
          }

          /* Wadah untuk debu/partikel */
          .particles-container {
              position: absolute;
              inset: 0;
              overflow: hidden;
              z-index: 0;
              pointer-events: none;
          }

          /* Styling masing-masing debu terbang */
          .particle {
              position: absolute;
              bottom: -10px;
              background: #fff;
              border-radius: 50%;
              box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.8), 0 0 20px 4px rgba(167, 139, 250, 0.6);
              animation: flyUp linear infinite;
          }

          /* Animasi terbang ke atas */
          @keyframes flyUp {
              0% { transform: translateY(0) scale(1); opacity: 0; }
              10% { opacity: var(--target-opacity); }
              90% { opacity: var(--target-opacity); }
              100% { transform: translateY(-100vh) scale(0.5); opacity: 0; }
          }

          /* Kartu utama dengan efek kaca (glassmorphism) dan glow */
          .card {
              background: rgba(20, 10, 35, 0.5);
              backdrop-filter: blur(25px);
              -webkit-backdrop-filter: blur(25px);
              border: 1px solid rgba(255, 255, 255, 0.08);
              border-radius: 24px;
              padding: 50px 40px;
              width: 100%;
              max-width: 420px;
              text-align: center;
              box-shadow: 0 0 60px 10px rgba(139, 92, 246, 0.2), inset 0 0 20px rgba(139, 92, 246, 0.1);
              z-index: 1;
          }

          .shake {
              animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
          }
          
          @keyframes shake {
              10%, 90% { transform: translate3d(-1px, 0, 0); }
              20%, 80% { transform: translate3d(2px, 0, 0); }
              30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
              40%, 60% { transform: translate3d(4px, 0, 0); }
          }

          .icon-container {
              width: 44px;
              height: 44px;
              border-radius: 50%;
              border: 2px solid #a78bfa;
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 0 auto 24px;
              background: rgba(167, 139, 250, 0.1);
              box-shadow: 0 0 15px rgba(167, 139, 250, 0.4);
          }

          .icon-container svg {
              width: 22px;
              height: 22px;
              fill: #c4b5fd;
          }

          .eyebrow {
              font-size: 11px;
              letter-spacing: 4px;
              text-transform: uppercase;
              color: #c4b5fd;
              margin-bottom: 12px;
              font-weight: 600;
          }

          .title {
              font-family: 'Playfair Display', serif;
              font-size: 34px;
              line-height: 1.2;
              margin-bottom: 15px;
              font-weight: 600;
              color: #fdfcff;
              text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
          }

          .subtitle {
              font-size: 13px;
              color: #d8b4fe;
              line-height: 1.6;
              margin-bottom: 40px;
              opacity: 0.9;
          }

          .pin-container {
              display: flex;
              justify-content: center;
              gap: 12px;
              margin-bottom: 35px;
          }

          .pin-input {
              width: 55px;
              height: 65px;
              background: rgba(0, 0, 0, 0.2);
              border: 2px solid rgba(139, 92, 246, 0.5);
              border-radius: 12px;
              text-align: center;
              font-size: 28px;
              color: white;
              font-weight: 500;
              outline: none;
              transition: all 0.3s ease;
              box-shadow: inset 0 0 10px rgba(139, 92, 246, 0.1);
          }

          .pin-input:focus {
              border-color: #c4b5fd;
              box-shadow: 0 0 20px rgba(167, 139, 250, 0.5), inset 0 0 10px rgba(167, 139, 250, 0.3);
              background: rgba(167, 139, 250, 0.1);
              transform: translateY(-2px);
          }

          .btn-unlock {
              width: 100%;
              background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);
              color: #4c1d95;
              border: none;
              padding: 16px;
              border-radius: 30px;
              font-size: 16px;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.3s ease;
              box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
          }

          .btn-unlock:hover {
              transform: translateY(-2px);
              box-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
          }

          .message {
              margin-top: 20px;
              font-size: 14px;
              min-height: 20px;
              font-weight: 500;
          }
          
          .success { color: #4ade80; text-shadow: 0 0 10px rgba(74, 222, 128, 0.5); }
          .error { color: #f87171; text-shadow: 0 0 10px rgba(248, 113, 113, 0.5); }
        `
      }} />

      <div className="glowing-background">
        
        {/* Render Partikel Debu Terbang */}
        <div className="particles-container">
          {particles.map((p) => (
            <div 
              key={p.id} 
              className="particle" 
              style={{
                left: p.left,
                width: p.size,
                height: p.size,
                animationDuration: p.animationDuration,
                animationDelay: p.animationDelay,
                '--target-opacity': p.opacity,
              } as React.CSSProperties} 
            />
          ))}
        </div>

        {/* Kartu UI */}
        <div className={`card ${isShaking ? 'shake' : ''}`}>
          <div className="icon-container">
            <svg viewBox="0 0 24 24">
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
            </svg>
          </div>

          <div className="eyebrow">— FOR YOUR EYES ONLY</div>
          <h1 className="title">Enter Your Secret<br />Code</h1>
          <p className="subtitle">Something has been waiting just past the<br />surface, only for you.</p>

          <div className="pin-container">
            {pin.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                className="pin-input"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(el) => { inputRefs.current[index] = el; }}
                autoFocus={index === 0}
              />
            ))}
          </div>

          <button className="btn-unlock" onClick={checkCode}>
            Unlock it ✨
          </button>

          <div className={`message ${message.type === 'success' ? 'success' : 'error'}`}>
            {message.text}
          </div>
        </div>
      </div>
    </>
  );
}