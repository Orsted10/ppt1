export const scrambleText = (
  element: HTMLElement,
  finalText: string,
  durationMs: number = 1000
) => {
  const chars = '!<>-_\\\\/[]{}—=+*^?#________';
  let frameRequest: number;
  let frame = 0;
  
  // Calculate total frames based on 60fps (durationMs / (1000/60))
  const totalFrames = (durationMs / 1000) * 60;
  
  const originalTextLength = finalText.length;
  
  const update = () => {
    let output = '';
    
    // As frames progress, more of the final string is revealed
    const progress = frame / totalFrames;
    const revealedCount = Math.floor(progress * originalTextLength);
    
    for (let i = 0; i < originalTextLength; i++) {
      if (i < revealedCount) {
        output += finalText[i];
      } else if (finalText[i] === ' ' || finalText[i] === '\n') {
        output += finalText[i]; // Preserve spaces and line breaks immediately
      } else {
        output += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    
    element.innerHTML = output.replace(/\n/g, '<br/>');
    
    if (frame < totalFrames) {
      frame++;
      frameRequest = requestAnimationFrame(update);
    } else {
      element.innerHTML = finalText.replace(/\n/g, '<br/>');
    }
  };
  
  update();
  
  // Return a cleanup function
  return () => {
    cancelAnimationFrame(frameRequest);
    element.innerHTML = finalText.replace(/\n/g, '<br/>');
  };
};
