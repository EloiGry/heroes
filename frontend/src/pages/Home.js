import React from 'react';
import Search from '../components/Search';
import { HeroesContext } from '../context/heroes';
import { useContext } from 'react';
import { Container } from '@chakra-ui/react'
import styled from 'styled-components';


const Box = styled.div`
border : 1px solid lightgray;
border-radius : 20px;
width : 200px;
text-align : center;
margin : 20px 80px;
`

const Image = styled.div`
background-size: contain;
background-repeat: no-repeat;
background-position: center; 
height : 200px;
`



const Home = () => {
    const { heroes } = useContext(HeroesContext)
    return (
        <>
            <Search />
            <Container>
            {heroes.map(heroe => 
                <Box>
                    <Image style={{backgroundImage: `url(${heroe.image})`}}> </Image>
                    <p> {heroe.name} </p>
                    <details> 
                        <summary> Powers </summary> 
                        {heroe.power.map(onePower => 
                                <p> {onePower} </p>
                            )} 
                    </details>
                </Box>
                )}
            </Container>
        </>
        
        
            
    );
};

export default Home;