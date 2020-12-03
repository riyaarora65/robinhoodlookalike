import React from 'react';
import HomePageLayout from './HomePageLayout';
import SignUpPageLayout from './SignUpPageLayoutPage';
import SignInPageLayout from './SignInPageLayout';
import RegisteredPage from './RegisteredPage';
import axios from 'axios';


class AppContainer extends React.Component
{
    state = {
        displayHomePage: true,
        displaySignUpPage: false,
        displaySignInPage: false,
        displayRegisteredPage: false
    }

    componentDidMount()
    {
        const data = { username: 'riya', email: 'vartikawinget@gmail.com', password: 'ddd', purpose: 'ddd' };
        axios({
            method: "post",
            url: 'http://localhost:5000/api/adduser',
            headers: {
                'content-type': 'application/json',
            },
            data: JSON.stringify(data),
        })
    }
    

    setDisplayHomePage = (flag) => {
        this.setState({
            displayHomePage: flag
        });
    }

    setDisplaySignUpPage = (flag) => {
        this.setState({
            displaySignUpPage: flag,
            displayHomePage: false
        });
    }

    setDisplaySignInPage = (flag) => {
        this.setState({
            displaySignInPage:flag,
            displayHomePage: false,

        });
    }

    setDisplayRegisteredPage = (flag) => {
        this.setState({
            displayRegisteredPage: flag,
            displayHomePage: false,
            displaySignInPage: false,
            displaySignUpPage: false
        })
    }

    render()
    {
        const {
            displayHomePage,
            displaySignUpPage,
            displaySignInPage,
            displayRegisteredPage
        } = this.state;
        console.log(this.state);

        return(
            <React.Fragment>
                {displayHomePage && <HomePageLayout  
                                        setDisplaySignUpPage={this.setDisplaySignUpPage}
                                        setDisplaySignInPage={this.setDisplaySignInPage}
                                    />}
                {displaySignUpPage && <SignUpPageLayout 
                                        setDisplayRegisteredPage={this.setDisplayRegisteredPage}
                                      />}
                {displaySignInPage && <SignInPageLayout 
                                         setDisplayRegisteredPage={this.setDisplayRegisteredPage}
                                      />}
                {displayRegisteredPage && <RegisteredPage/>}
            </React.Fragment>
        );
    }
}

export default AppContainer;