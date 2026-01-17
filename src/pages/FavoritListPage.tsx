import React, {memo} from 'react';
import {Col, Row, Spinner, Alert} from 'react-bootstrap';
import {ContactCard} from 'src/components/ContactCard';
import { observer } from 'mobx-react-lite';
import { useStore } from 'src/store/RootStore';

export const FavoritListPage = observer(() => {
  const store = useStore();
  const { favoriteContacts, isLoading, error } = store;
  const loading = isLoading.contacts;
  const dataError = error.contacts ? 'Error loading data' : undefined;
  if (loading) {
    return <Spinner animation="border" />;
  }
  if (dataError) {
    return <Alert variant="danger">{dataError}</Alert>;
  }


  return (
    <Row xxl={4} className="g-4">
      {favoriteContacts.map((contact) => (
        <Col key={contact.id}>
          <ContactCard contact={contact} withLink />
        </Col>
      ))}
    </Row>
  );
});
