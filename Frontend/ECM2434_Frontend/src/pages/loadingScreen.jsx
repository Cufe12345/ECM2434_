import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import AnimationComponent from '../components/loadingScreenAnim.jsx';


const LoadingScreen = () => {
  useEffect(() => {
    // Tree animation goes here
    // Example animation that scales the tree from 0 to its natural size
    gsap.to(".tree", { duration: 2, scale: 1, ease: "elastic.out(1, 0.3)" });

    // Optionally, set a timeout to fade out the loading screen after a certain period
    const timer = setTimeout(() => {
      gsap.to("#loadingScreen", {
        duration: 0.5, opacity: 0, onComplete: () => {
          document.getElementById('loadingScreen').style.display = 'none';
        }
      });
    }, 2800); // Adjust time as needed

    return () => clearTimeout(timer); // Clean up the timeout on component unmount
  }, []);

  return (
    <div id="loadingScreen" style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, // Ensure it's above everything else
      opacity: 1, // Start fully visible
      transition: 'opacity 0.5s ease', // Smooth transition for fade out
      display: 'flex', flexDirection: 'column'
    }}>
      {/* Tree image or SVG goes here */}
      {/* <img src="/path/to/tree-image.png" alt="Loading..." className="tree" style={{ transform: 'scale(0)' }} />*/}
      <AnimationComponent />
    </div>
  );
};

export default LoadingScreen;
