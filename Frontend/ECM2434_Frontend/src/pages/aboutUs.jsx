import React from 'react';
import './aboutUs.css'; // Make sure to define your styles in this CSS file

const AboutUs = () => {
  return (
    <div class="page">
        <div class="about-us">
        <h1 class="about-title">About Us</h1>
        <p class="about-text">
        <strong>We are a diverse team of six students from the University of Exeter</strong>, 
        united by a common drive to contribute to environmental sustainability. Our backgrounds 
        are as varied as our skills, but we all share the belief that even small actions can lead 
        to significant positive impacts on our planet.
        </p>
        <p class="about-text">
        <strong>EcoQuest</strong> was conceived from a desire to integrate eco-conscious living 
        into daily life in a fun and engaging way. We seek to create a platform where sustainability 
        is not just encouraged but celebrated. Through EcoQuest, we envision a world where every 
        individual feels empowered to take part in eco-friendly practices.
        </p>
        <p class="about-text">
        Our mission with EcoQuest is clear: <span class="highlight">we aim to transform the way 
        sustainability is perceived and enacted</span>. By converting sustainable behaviors into 
        game-like challenges, we introduce a competitive yet enjoyable angle to being environmentally 
        responsible. Our hope is to not only raise awareness but to start a wave of change that ripples 
        throughout the campus community and beyond.
        </p>
        <p class="about-text">
        Join us in our quest—a quest for sustainability, for awareness, and for a greener tomorrow. 
        At EcoQuest, we believe that every action counts, and together, we can make a monumental 
        difference. Let's take the leap towards sustainability, one quest at a time.
        </p>
    </div>
  </div>
  );
}

export default AboutUs;
