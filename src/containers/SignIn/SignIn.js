/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react'
import './SignIn.css'
import { FaEnvelope, FaKey } from 'react-icons/fa'
import { NavLink as RRNavLink } from 'react-router-dom'
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, FormFeedback, NavLink, Spinner } from 'reactstrap'
import Layout from '../../components/Layout/Layout'
import FakeLogo from '../../images/fake-logo.png'

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  validate: {
    emailState: ''
  },
  isLoading: true
}

export default class SignIn extends Component {
  constructor(props) {
    super(props)
    
    this.state = { ...INITIAL_STATE }
    
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const { firebase, history } = this.props
    const this_ = this
    firebase.auth.onAuthStateChanged(function(user) {
      if (user) {
        history.push('/home')
      } else {
        // No user is signed in.
        this_.setState({isLoading: false})
      }
    });
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
    const { email, password, error, validate, isLoading } = this.state
    console.log(isLoading)
    return (
      <Layout className="home">
      {!isLoading ? (
        <Container className="entryPage">
          <Row>
            <Col>
            <Form className="form" onSubmit={e => this.submitForm(e)}>
              <Col className="logo-wrapper">
                  <img src={FakeLogo} alt=""></img>
                  <p id="welcome-text" className="smallFont uppercase"> Welcome to Nutrition Planner. Are you ready to get fit?</p>
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
              <Button type="submit" id="login-button" className="smallFont uppercase">Sign In</Button>
              {error && error.message}
              <NavLink tag={RRNavLink} exact to="/signup" className="register-link smallFont uppercase">
                Sign Up - start using the app{' '}
              </NavLink>
            </Form>
            </Col>
          </Row>
        </Container>
          ) :
          (
          <div className="app-loading">
              <div className="logo"></div>
              <svg className="spinner" viewBox="25 25 50 50">
                <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" />
              </svg>
          </div>
          )
          }
      </Layout>
    )
  }
}
