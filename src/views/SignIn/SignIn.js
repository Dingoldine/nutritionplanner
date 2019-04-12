import React, { Component } from 'react'
import './SignIn.css'
import { FaEnvelope, FaKey } from 'react-icons/fa'
import { NavLink as RRNavLink } from 'react-router-dom'
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, FormFeedback, NavLink } from 'reactstrap'
import Layout from '../../components/layout'
import FakeLogo from '../../images/fake-logo.jpg'

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  validate: {
    emailState: ''
  }
}

export default class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = async event => {
    const { target } = event
    const value = target.type === 'checkbox' ? target.checked : target.value
    const { name } = target
    await this.setState({
      [name]: value
    })
  }

  validateEmail(e) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const { validate } = this.state
    if (emailRex.test(e.target.value)) {
      validate.emailState = 'has-success'
    } else {
      validate.emailState = 'has-danger'
    }
    this.setState({ validate })
  }

  submitForm(e) {
    const { email, password } = this.state
    const { firebase, history } = this.props
    const isInvalid = password === '' || email === ''
    if (!isInvalid) {
      firebase
        .doSignInWithEmailAndPassword(email, password)
        .then(() => {
          this.setState({ ...INITIAL_STATE })
          history.push('/home')
        })
        .catch(error => {
          this.setState({ error })
        })
    }
    e.preventDefault()
  }

  render() {
    const { email, password, error, validate } = this.state
    return (
      <Layout className="home">
        <Container className="loginPage">
          <Row>
            <Col>
            <Form className="form" onSubmit={e => this.submitForm(e)}>
              <Col className="logo-wrapper">
                  <img src={FakeLogo} alt=""></img>
                  <p id="welcome-text" className="smallFont"> Welcome to Nutrition Planner. Are you ready to get fit?</p>
              </Col>
              <Col>
                <FormGroup>
                  <Label>
                      <FaEnvelope />
                  </Label>
                  <Input
                    className="smallFont"
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="Email"
                    value={email}
                    valid={validate.emailState === 'has-success'}
                    invalid={validate.emailState === 'has-danger'}
                    onChange={e => {
                      this.validateEmail(e)
                      this.handleChange(e)
                    }}
                  />
                  <FormFeedback valid>That's a tasty looking email you've got there.</FormFeedback>
                  <FormFeedback>
                    Uh oh! Looks like there is an issue with your email. Please input a correct email.
                  </FormFeedback>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="signupPassword">
                      <FaKey />
                  </Label>
                  <Input
                    className="smallFont"
                    type="password"
                    name="password"
                    id="signupPassword"
                    placeholder="Password"
                    value={password}
                    onChange={e => this.handleChange(e)}
                  />
                </FormGroup>
              </Col>
              <Button type="submit" id="login-button" className="smallFont">Sign In</Button>
              {error && error.message}
              <NavLink tag={RRNavLink} exact to="/signup" className="register-link smallFont">
                Sign Up - start using the app{' '}
              </NavLink>
            </Form>
            </Col>
          </Row>
        </Container>
      </Layout>
    )
  }
}
