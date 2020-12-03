import React from 'react';
import {Container, Icon} from 'semantic-ui-react';

class RegisteredPage extends React.Component
{
    render(){
        return(
            <Container text>
                <Icon size='massive' name='check' /> <br/><br/>
                <p style={{fontSize: '36px'}}>Congratulations!!!</p>
                <p style={{fontSize: '26px'}}>Thankyou for being a part of us.Your waiting number is</p>
                <p style={{fontSize: '36px'}}>25</p>
            </Container>    
        );
    }
}

export default RegisteredPage;