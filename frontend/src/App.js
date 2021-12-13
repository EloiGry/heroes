import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { HeroesProvider } from './context/heroes';
import { ChakraProvider } from '@chakra-ui/react'
import NewHero from './pages/NewHero';

const App = () => {
  return (
    <ChakraProvider> 
      <HeroesProvider> 
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />}/>
          </Routes>  
        </BrowserRouter>
      </HeroesProvider>
    </ChakraProvider>

    
  );
};

export default App;
