import React, { useEffect } from 'react';
import gsap from 'gsap';
import './loadingScreenAnim.css'

const AnimationComponent = () => {
  useEffect(() => {
    // Setup initial state
    const setupAnimations = () => {
      gsap.set("#shadow", { scale:0, transformOrigin:"15px 8px" });
      gsap.set("#tree", { scale:0, transformOrigin:"154px bottom" });
      gsap.set("#leaf-rb", { scale:0, rotation:'-60cw', y: -15, transformOrigin:"left bottom" });
      gsap.set("#leaf-rm", { scale:0, rotation:'-50cw', y: 30, transformOrigin:"left bottom" });
      gsap.set("#leaf-lb", { scale:0, rotation:'60cw', y: -80, transformOrigin:"right bottom" });
      gsap.set("#leaf-lm", { scale:0, rotation:'40cw', y: -90, transformOrigin:"right bottom" });
      gsap.set("#leaf-top", { scale:0, transformOrigin:"center bottom" });
      gsap.set("#leaf-rb g", { scale:0, transformOrigin:"left 60px" });
      gsap.set("#leaf-rm g", { scale:0, transformOrigin:"22px 140px" });
      gsap.set("#leaf-lb g", { scale:0, transformOrigin:"right 56px" });
      gsap.set("#leaf-lm g", { scale:0, transformOrigin:"106px bottom" });
    };

    // Define the animation sequence
    const animate = () => {
      const tl = gsap.timeline({
        delay: 0.42,
        repeat: -1,
        repeatDelay: 2,
        yoyo: true
      });

      tl.to("#shadow", { scale:1, duration: 2 }, 0)
        .to("#tree", { scale:1, duration: 2 }, 0)
        .to(["#leaf-rb", "#leaf-rm", "#leaf-lb", "#leaf-lm"], { scale:1, rotation:'0cw', y: 0, delay: 0.35, duration: 2 }, 0)
        .to("#leaf-top", { scale:1, duration: 2.5, delay: 0.35 }, 0)
        .to(["#leaf-rb g", "#leaf-rm g", "#leaf-lb g", "#leaf-lm g"], { scale:1, delay: 0.5, duration: 2.25 }, 0);

      return tl;
    };

    setupAnimations();
    const masterTimeline = animate();

    // Cleanup function to prevent memory leaks
    return () => {
      masterTimeline.kill();
      gsap.set(["#shadow", "#tree", "#leaf-top", "#leaf-rb", "#leaf-rm", "#leaf-lb", "#leaf-lm", "#leaf-rb g", "#leaf-rm g", "#leaf-lb g", "#leaf-lm g"], { clearProps:"all" });
    };
  }, []);

  // Function to restart the animation
  /*const playAgain = () => {
    gsap.set(["#shadow", "#tree", "#leaf-top", "#leaf-rb", "#leaf-rm", "#leaf-lb", "#leaf-lm", "#leaf-rb g", "#leaf-rm g", "#leaf-lb g", "#leaf-lm g"], { clearProps:"all" });
    useEffect(); // Re-initialize the useEffect hook to restart the animation
  };*/

  return (
    <div className="container">
    <svg id="animation" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 302.7 436.37">
      <defs>
      <linearGradient id="Dégradé_sans_nom_18" data-name="Dégradé sans nom 18" x1="156.31" y1="365.15" x2="246.31" y2="431.81" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#39505d" />
        <stop offset="1" stopColor="#39505d" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="Dégradé_sans_nom_4" data-name="Dégradé sans nom 4" x1="200.34" y1="253.69" x2="176.67" y2="221.09" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#929669" />
        <stop offset="0.23" stopColor="#929669" />
        <stop offset="1" stopColor="#fdfcf1" />
      </linearGradient>
      <linearGradient id="Dégradé_sans_nom_2" data-name="Dégradé sans nom 2" x1="303.2" y1="168.65" x2="213.62" y2="249.02" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#45aa3a" />
        <stop offset="1" stopColor="#3d9439" />
      </linearGradient>
      <linearGradient id="Dégradé_sans_nom_3" data-name="Dégradé sans nom 3" x1="236.83" y1="175.48" x2="254.62" y2="212.29" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#41a83b" />
        <stop offset="1" stopColor="#5ebc44" />
      </linearGradient>
        <linearGradient id="Dégradé_sans_nom_4-2" x1="196.6" y1="195.74" x2="177" y2="178.38" xlinkHref="#Dégradé_sans_nom_4" />
        <linearGradient id="Dégradé_sans_nom_3-2" x1="296.11" y1="44.64" x2="176.48" y2="155.68" xlinkHref="#Dégradé_sans_nom_3" />
        <linearGradient id="Dégradé_sans_nom_2-2" x1="274.3" y1="150.3" x2="231.97" y2="99.99" xlinkHref="#Dégradé_sans_nom_2" />
        <linearGradient id="Dégradé_sans_nom_4-3" x1="-19.56" y1="223.16" x2="218.1" y2="279.92" xlinkHref="#Dégradé_sans_nom_4" />
        <linearGradient id="Dégradé_sans_nom_2-3" x1="16.11" y1="204.08" x2="92.18" y2="276.48" xlinkHref="#Dégradé_sans_nom_2" />
        <linearGradient id="Dégradé_sans_nom_2-4" x1="106.7" y1="255.03" x2="106.7" y2="255.03" xlinkHref="#Dégradé_sans_nom_2" />
        <linearGradient id="Dégradé_sans_nom_3-3" x1="63.36" y1="209.36" x2="54.16" y2="240.65" xlinkHref="#Dégradé_sans_nom_3" />
        <linearGradient id="Dégradé_sans_nom_4-4" x1="75.32" y1="182.31" x2="144.32" y2="160.33" xlinkHref="#Dégradé_sans_nom_4" />
        <linearGradient id="Dégradé_sans_nom_2-5" x1="19.89" y1="76.27" x2="141.37" y2="193.45" xlinkHref="#Dégradé_sans_nom_2" />
        <linearGradient id="Dégradé_sans_nom_3-4" x1="38.58" y1="178.83" x2="83.36" y2="134.66" xlinkHref="#Dégradé_sans_nom_3" />
        <linearGradient id="Dégradé_sans_nom_39" data-name="Dégradé sans nom 39" x1="148.36" y1="248.02" x2="163.23" y2="248.02" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#EDF0EC" />
          <stop offset="0.69" stopColor="#EDF0EC" />
          <stop offset="1" stopColor="#EDF0EC" />
        </linearGradient>
        <linearGradient id="Dégradé_sans_nom_2-6" x1="147.41" y1="4.1" x2="181.15" y2="164.83" xlinkHref="#Dégradé_sans_nom_2" />
        <linearGradient id="Dégradé_sans_nom_3-5" x1="98.37" y1="94.42" x2="168.31" y2="80.31" xlinkHref="#Dégradé_sans_nom_3" />
      </defs>
      <title>mongo-tree</title>
      <g id="tree">
        <g id="leaf-rb">
          <g>
            <path d="M226.46,217.24S207.89,223.52,201,229c-2.12,1.69.56,1.74.52,3.5,0,0,30.61,20,66.11-3.15,25.12-18.4,27.8-37.3,30.61-40.42a45.85,45.85,0,0,1,5.32-6.52Z" transform="translate(-1.14 -2.3)" fill="url(#Dégradé_sans_nom_2)" stroke="black" strokeWidth="1" />
            <path d="M296.79,182.08c-4.39-2.39-28-14.22-60.31-2s-38.85,46.27-38.85,46.27c3.37,3.66,9.48-1.84,18.58-5,8.63-3,19.24-7.3,30-12.34,5.66-2.66,54.85-23.65,57.66-26.82C301.3,183,300.29,183.34,296.79,182.08Z" transform="translate(-1.14 -2.3)" fill="url(#Dégradé_sans_nom_3)" stroke="black" strokeWidth="1" />
          </g>
          <path d="M214.36,221.93c-8.15,2.8-14.29,4.4-16.71,4.41-8.73,8.22-47.32,28-47.32,28l.33,3.69s42.57-24.81,47.09-25.68a8.57,8.57,0,0,1,4,.26l-.21-.13C201.6,228.71,208,224.83,214.36,221.93Z" transform="translate(-1.14 -2.3)" fill="url(#Dégradé_sans_nom_4)" stroke="black" strokeWidth="1" />
        </g>
        <g id="leaf-rm">
          <g>
            <path d="M278.57,52c-5.14,3.07-32.38,1.65-65.06,31.82-42.24,43.41-22.55,91.82-22.55,91.82,10.05,8.39,28.23-30.77,28.23-30.77l70-98.55A65.5,65.5,0,0,1,278.57,52Z" transform="translate(-1.14 -2.3)" fill="url(#Dégradé_sans_nom_3-2)" stroke="black" strokeWidth="1" />
            <path d="M287.76,55.87c-.8-5.26-.08-6.58,1.86-9.89-5.21,3.07-48.13,66.28-53.41,73.48a463.05,463.05,0,0,0-28,43c-2.27,4-8.66,10.5-10.19,13.58-2.21,4.45.88,4.89.52,6.76,0,0,49.56.17,75.53-41.78S289.91,62.69,287.76,55.87Z" transform="translate(-1.14 -2.3)" fill="url(#Dégradé_sans_nom_2-2)" stroke="black" strokeWidth="1" />
          </g>
          <path d="M209.28,160.51c-5.8,8.06-13,16-18.34,15.1l-.12-.3c-7.31,14.08-39.23,40.24-39.23,40.24l2.08,2.47s30.9-29.42,45-35.26h-.15C199.16,179.4,203.11,171.2,209.28,160.51Z" transform="translate(-1.14 -2.3)" fill="url(#Dégradé_sans_nom_4-2)" stroke="black" strokeWidth="1" />
        </g>
        <g id="leaf-lb">
          <polygon points="106.7 255.03 106.7 255.03 106.7 255.03 106.7 255.03" fill="url(#Dégradé_sans_nom_2-3)" />
          <g>
            <path d="M100,250,1.44,217.33a45.85,45.85,0,0,1,5.93,6c3.09,2.83,7.59,21.39,34.37,37.28,37.57,19.65,66.11-3.25,66.11-3.25A7.91,7.91,0,0,0,100,250Z" transform="translate(-1.14 -2.3)" fill="url(#Dégradé_sans_nom_2-4)" stroke="black" strokeWidth="1" />
            <path d="M68,208.52c-33.34-9-55.7,5-59.83,7.83-3.37,1.59-4.4,1.37-7,.73,3.1,2.88,54.07,19.08,60,21.12C101,252,104,253,111.12,250.82,111.12,250.82,101.32,217.54,68,208.52Z" transform="translate(-1.14 -2.3)" fill="url(#Dégradé_sans_nom_3-3)" stroke="black" strokeWidth="1" />
          </g>
          <path d="M151.59,271.16s-26.7-11.72-40.52-20.5l.05.17A63.85,63.85,0,0,1,93,249c6.56,2.28,14.39,4.57,14.84,8.33h0l-.2.15a8.57,8.57,0,0,1,3.94-.64c4.58.43,40,18,40,18Z" transform="translate(-1.14 -2.3)" fill="url(#Dégradé_sans_nom_4-3)" stroke="black" strokeWidth="1" />
        </g>
        <g id="leaf-lm">
          <g>
            <path d="M100.8,117C68.12,86.85,40.88,88.27,35.74,85.2a65.5,65.5,0,0,1-10.6-5.68l70,98.55S108.58,201.6,118,210c3.14,2.8,2.73-.7,5.36-1.16C123.36,208.84,143,160.43,100.8,117Z" transform="translate(-1.14 -2.3)" fill="url(#Dégradé_sans_nom_2-5)" stroke="black" strokeWidth="1" />
            <path d="M78.1,152.7c-5.28-7.21-48.21-70.41-53.41-73.48,1.94,3.32,2.66,4.63,1.86,9.89-2.15,6.81-12.26,43.16,13.71,85.11S115.79,216,115.79,216c-.38-2-.31-3.08-2.79-8C106.73,195.59,92.83,172.8,78.1,152.7Z" transform="translate(-1.14 -2.3)" fill="url(#Dégradé_sans_nom_3-4)" stroke="black" strokeWidth="1" />
          </g>
          <path d="M124.21,214.16a12.25,12.25,0,0,1-.73-5.65l-.13.33c-5.34.92-12.54-7-18.34-15.1,6.17,10.68,10.11,18.87,10.77,22.24,12.74,9.65,33.34,37.83,33.34,37.83l5.08-1.47S126.67,220.25,124.21,214.16Z" transform="translate(-1.14 -2.3)" fill="url(#Dégradé_sans_nom_4-4)" stroke="black" strokeWidth="1" />
        </g>
        <g id="main">
          <g id="leaf-top">
            <path d="M190.25,76.57c-9.85-43.37-33.1-57.63-35.6-63.08a65.5,65.5,0,0,1-5.52-10.68L151,123.66s-3.84,36.9,5.84,41.35C156.83,165,200.48,136.27,190.25,76.57Z" transform="translate(-1.14 -2.3)" fill="url(#Dégradé_sans_nom_2-6)" stroke="black" strokeWidth="1" />
            <path d="M151.33,93.11c.06-8.93.15-85.33-2.4-90.81-.28,3.83-.43,5.32-4.07,9.21-5.63,4.4-34.55,28.63-36.91,77.91s38.59,77.21,38.59,77.21C151,165,151,147,151.33,93.11Z" transform="translate(-1.14 -2.3)" fill="url(#Dégradé_sans_nom_3-5)" stroke="black" strokeWidth="1" />
          </g>
          <path id="stem" d="M172.18,366.33l0-.12a1.74,1.74,0,0,0-.23-.59C157.31,327.94,153,183,154.53,169.88a9.89,9.89,0,0,1,2.16-4.95A111.2,111.2,0,0,1,151,139s-3,21-4.64,27.5c5.39,21.3,2.7,91.54,1.07,142.46-.94,29.43-3.93,37.31-5.62,57.36h.12a1.48,1.48,0,0,0,0,.16c0,2.57,6.78,4.66,15.14,4.66s15.14-2.09,15.14-4.66a1.48,1.48,0,0,0,0-.16Z" transform="translate(-1.14 -2.3)" fill="url(#Dégradé_sans_nom_39)" stroke="black" strokeWidth="1" />
        </g>
      </g>
    </svg>
    </div>
  );
};

export default AnimationComponent;
