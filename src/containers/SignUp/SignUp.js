/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react'
import { Container, Col, Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap'
import { FaEnvelope, FaKey, FaAddressBook } from 'react-icons/fa'
import Layout from '../../components/Layout/Layout'
import './SignUp.css'

const INITIAL_STATE = {
  username: '',
  email: '',
  password: '',
  error: null,
  validate: {
    emailState: ''
  },
  isLoading: true
}

const DEFAULT_VALUES = {
  settings: {
  calories: 3200,
  carbs: 352,
  protein: 177,
  fat: 121
  }
}

class SignUp extends Component {
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
    const { username, email, password } = this.state
    const { firebase, history } = this.props
    const isInvalid = password === '' || email === '' || username === ''
    if (!isInvalid) {
      firebase
        .doCreateUserWithEmailAndPassword(email, password)
        .then(authUser => {
          return firebase.user(authUser.user.uid).set(
            {
              username,
              email,
              ...DEFAULT_VALUES
            },
            { merge: true }
          )
        })
        .then(() => {
          this.setState({ ...INITIAL_STATE })
          history.push('home')
        })
        .catch(error => {
          console.log('Error creating user')

          this.setState({ error })
        })
    }
    e.preventDefault()
  }

  render() {
    const { username, email, password, error, validate, isLoading } = this.state
    return (
      <Layout className="home">
      {!isLoading ? (
        <Container className="entryPage">
          <Form className="form" onSubmit={e => this.submitForm(e)}>
            <Col>
              <h2 id="register-text" className="smallFont uppercase">Register now to start using the app!</h2>
            </Col>
            <Col>
              <FormGroup>
                <Label for="signupUsername" className="text smallFont uppercase">
                  <span>
                    <FaAddressBook />
                  </span>{' '}
                  Username
                </Label>
                <Input
                  className="smallFont"
                  type="text"
                  name="username"
                  id="signupUsername"
                  placeholder="Your nickname!"
                  value={username}
                  onChange={e => this.handleChange(e)}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label className="text smallFont uppercase">
                  <span>
                    <FaEnvelope />
                  </span>{' '}
                  Email
                </Label>
                <Input
                  className="smallFont"
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
                <Label for="examplePassword" className="text smallFont uppercase">
                  <span>
                    <FaKey />
                  </span>{' '}
                  Password
                </Label>
                <Input
                  className="smallFont"
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="********"
                  value={password}
                  onChange={e => this.handleChange(e)}
                />
              </FormGroup>
            </Col>
            <Button type="submit" className="submitButton smallFont uppercase">Submit</Button>
            {error && error.message}
          </Form>
        </Container>
      ) : ( 
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

export default SignUp
