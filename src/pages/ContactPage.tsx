import React, {FC} from 'react';
import {Col, Row, Spinner, Alert} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {ContactCard} from 'src/components/ContactCard';
import {Empty} from 'src/components/Empty';
import { useAppSelector } from 'src/store/hooks';

export const ContactPage: FC = () => {
  const {contactId} = useParams<{ contactId: string }>();
  const { contact, loading, error } = useAppSelector(state => {
    return {
      contact: state.contacts.items.find(({id}) => id === contactId),
      loading: state.contacts.loading,
      error: state.contacts.error,
    }
  });

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Row xxl={3}>
      <Col className={'mx-auto'}>
        {contact ? <ContactCard contact={contact} /> : <Empty />}
      </Col>
    </Row>
  );
};
