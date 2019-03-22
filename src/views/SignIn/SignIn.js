import React, { Component } from 'react'
import './SignIn.css'
import { FaEnvelope, FaKey } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Container, Col, Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap'
import Layout from '../../components/layout'

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
        Welcome to SignIn
        <Container className="loginPage">
          <h2>Sign In</h2>
          <Form className="form" onSubmit={e => this.submitForm(e)}>
            <Col>
              <FormGroup>
                <Label>
                  <span>
                    <FaEnvelope />
                  </span>{' '}
                  Email
                </Label>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="myemail@email.com"
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
                  <span>
                    <FaKey />
                  </span>{' '}
                  Password
                </Label>
                <Input
                  type="password"
                  name="password"
                  id="signupPassword"
                  placeholder="********"
                  value={password}
                  onChange={e => this.handleChange(e)}
                />
              </FormGroup>
            </Col>
            <Button type="submit">Submit</Button>
            {error && error.message}
            <Link className="router-link" to="/signup">
              Sign Up
            </Link>
          </Form>
        </Container>
      </Layout>
    )
  }
}
