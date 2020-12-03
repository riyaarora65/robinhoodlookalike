import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'

const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

const HomepageHeading = (props, {mobile}) => (
  <Container text>
    <Header
      as='h1'
      content='RobinHood'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Header
      as='h2'
      content='Investing is for everyone'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
    <Button primary size='huge' onClick={() => props.setDisplaySignUpPage(true)}>
      Sign Up
      <Icon name='right arrow' />
    </Button>
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}


class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children, setDisplaySignUpPage, setDisplaySignInPage } = this.props
    const { fixed } = this.state

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                <Menu.Item position='right'>
                  <Button inverted={!fixed} onClick={() => setDisplaySignInPage(true)}>
                    Log in
                  </Button>
                  <Button  onClick={() =>setDisplaySignUpPage(true)} inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button>
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading setDisplaySignUpPage={setDisplaySignUpPage}/>
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children, setDisplaySignUpPage, setDisplaySignInPage } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 350, padding: '1em 0em' }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size='large'>
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name='sidebar' />
                </Menu.Item>
                <Menu.Item position='right'>
                  <Button inverted onClick={() => setDisplaySignInPage(true)}>
                    Log in
                  </Button>
                  <Button onClick={() => setDisplaySignUpPage(true)} inverted style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button>
                </Menu.Item>
              </Menu>
            </Container>
            <HomepageHeading mobile setDisplaySignUpPage={setDisplaySignUpPage}/>
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = (props) => {

    const {
        setDisplaySignUpPage,
        setDisplaySignInPage,
        children
    } = props;
    return (
            <div>
                <DesktopContainer 
                    setDisplaySignUpPage={setDisplaySignUpPage}
                    setDisplaySignInPage={setDisplaySignInPage}
                >
                            {children}
                </DesktopContainer>
                <MobileContainer 
                    setDisplaySignUpPage={setDisplaySignUpPage}
                    setDisplaySignInPage={setDisplaySignInPage}
                >
                            {children}
                </MobileContainer>
            </div>
    );
}

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const HomepageLayout = (props) => (
  <ResponsiveContainer setDisplaySignUpPage={props.setDisplaySignUpPage} setDisplaySignInPage={props.setDisplaySignInPage}>
    <Segment style={{ padding: '0em' }} vertical>
      <Grid celled='internally' columns='equal' stackable>
        <Grid.Row textAlign='center'>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              "Break Free from Commission Fees"
            </Header>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              "Introducing Fractional Shares"
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Header as='h3' style={{ fontSize: '2em' }}>
            Invest Any Amount
        </Header>
        <p style={{ fontSize: '1.33em' }}>
             Choose how much you want to invest, and we’ll convert from dollars to parts of a whole share.
        </p>
        <Divider
          as='h4'
          className='header'
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
        </Divider>

        <Header as='h3' style={{ fontSize: '2em' }}>
            Trade in Real Time
        </Header>
        <p style={{ fontSize: '1.33em' }}>
            Trades placed during market hours are executed at that time, so you’ll always know the share price.
        </p>
      </Container>
    </Segment>
  </ResponsiveContainer>
)

export default HomepageLayout
