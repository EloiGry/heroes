import React from 'react';
import { Input } from '@chakra-ui/react'
import { Button} from '@chakra-ui/react'
import styled from "styled-components"

const Form = styled.div`
display : flex;
margin : 20px 300px;
justify-content : space-between;
`




const Search = () => {
    return (
        <Form>
            <Input variant='filled' placeholder='Search your hero' />
            <Button colorScheme='teal' variant='solid' mx={1} px={10}> Search </Button>
            <Button colorScheme='teal' variant='solid' mx={5} px={10}> Add new hero </Button>
        </Form>
        
    );
};

export default Search;