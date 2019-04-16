import React from 'react'
import { Container, Row } from 'reactstrap'
import './footer.css'

const header = props => {
  return (
    <Container fluid="true" >
      <Row className="footerRow extraSmallFont">
            © Nutrition Planner - William Westerlund & Philip Rumman
      </Row>
    </Container>
  )
}

export default header
