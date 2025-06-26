// import { StrictMode } from 'react' 
// import { createRoot } from 'react-dom/client'
// import App from "./App"
// import './index.css'
// import { BrowserRouter } from 'react-router-dom';
// import { TransactionProvider } from "./Context/TransactionContext.jsx";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <BrowserRouter>
//       <TransactionProvider>
//         <App />
//       </TransactionProvider>
//     </BrowserRouter>
//   </StrictMode>
// );
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from "./App"
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { TransactionProvider} from "./Context/TransactionContext.jsx";
import React from 'react';

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TransactionProvider>
      <App />
    </TransactionProvider>
  </React.StrictMode>,
)
