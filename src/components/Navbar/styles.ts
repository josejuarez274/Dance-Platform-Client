import styled from "styled-components";

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6); /* Darker overlay for better readability */
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
`;

// Container to hold everything
export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  overflow: hidden;
  position: relative;
`;

// Background with a silhouette image
export const Background = styled.div`
    position: fixed; /* Fixed to the viewport */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    //background: url("/assets/bachata-login.png") no-repeat center center / cover;
    opacity: 0.2; /* Subtle background for modal focus */
    z-index: -1; /* Behind modal content */
`;

// Glassmorphic panel
export const GlassPanel = styled.div`
    background: rgba(255, 255, 255, 0.15); /* Slightly transparent white */
    border-radius: 20px;
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.2); /* Add white glow */
    backdrop-filter: blur(15px); /* Glass effect */
    -webkit-backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 255, 255, 0.3); /* Subtle border for structure */
    padding: 40px 30px; /* Add padding for content */
    text-align: center;
    width: 320px; /* Control the width */
    max-width: 90%; /* Ensure responsiveness */
    color: #fff;

    animation: fadeIn 0.5s ease-in-out;
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.95);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;

// Input fields
export const Input = styled.input`
  width: 100%;
  padding: 10px 15px;
  margin: 15px 0;
  border: none;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 16px;
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.5); /* Slight glow for contrast */
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

// Button for login
export const Button = styled.button`
  width: 100%;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background: linear-gradient(135deg, #2575fc 0%, #6a11cb 100%);
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  }
`;

// Text for switching between login/register
export const SwitchText = styled.p`
  margin-top: 20px;
  font-size: 14px;
    

  a {
    color: #6a11cb;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

// Form wrapper
export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
