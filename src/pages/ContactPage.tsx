import React, {FC} from 'react';
import {Col, Row, Spinner, Alert} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {ContactCard} from 'src/components/ContactCard';
import {Empty} from 'src/components/Empty';
import { observer } from 'mobx-react-lite';
import { useStore } from 'src/store/RootStore';

export const ContactPage: FC = observer(() => {
  const { contactId } = useParams<{ contactId: string }>();
  const store = useStore();
  
  const contact = store.contacts.find(({ id }) => id === contactId);
  const loading = store.isLoading.contacts;
  const error = store.error.contacts ? 'Error loading contact' : undefined;

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
});
