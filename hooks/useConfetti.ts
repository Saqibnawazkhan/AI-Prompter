'use client';

import confetti from 'canvas-confetti';

export function useConfetti() {
  const fireConfetti = () => {
    // First burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#667eea', '#764ba2', '#6B8DD6', '#8E37D7'],
    });

    // Second burst with delay
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#667eea', '#764ba2', '#6B8DD6'],
      });
    }, 150);

    // Third burst with delay
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#764ba2', '#6B8DD6', '#8E37D7'],
      });
    }, 300);
  };

  const fireStars = () => {
    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      colors: ['#667eea', '#764ba2', '#6B8DD6', '#8E37D7', '#FFE066'],
    };

    confetti({
      ...defaults,
      particleCount: 40,
      scalar: 1.2,
      shapes: ['star'],
    });

    confetti({
      ...defaults,
      particleCount: 20,
      scalar: 0.75,
      shapes: ['circle'],
    });
  };

  return { fireConfetti, fireStars };
}
