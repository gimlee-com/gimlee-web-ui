import React, { PureComponent } from 'react';
import { translate } from 'react-i18next';
import { Nav, NavItem } from 'gimlee-ui-components/Nav';
import Container from 'gimlee-ui-components/Container';
import Section from 'gimlee-ui-components/Section';

class Footer extends PureComponent {
  render() {
    return (
      <Section type="muted">
        <Container>
          <Nav>
            <NavItem>Who cares about the footer?</NavItem>
          </Nav>
        </Container>
      </Section>
    );
  }
}

export default translate()(Footer);
