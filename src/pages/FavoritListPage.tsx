import React, {memo, useMemo} from 'react';
import {Col, Row, Spinner, Alert} from 'react-bootstrap';
import {ContactCard} from 'src/components/ContactCard';
import { useAppSelector } from 'src/store/hooks';

export const FavoritListPage = memo(() => {
  const { items: contacts, loading, error } = useAppSelector(state => state.contacts);

  const favoriteContacts = useMemo(
    () => contacts.filter(contact => contact.isFavorite),
    [contacts]
  );
  if (loading) {
    return <Spinner animation="border" />;
  }
  if (error) {
    return <Alert variant="danger">{error}</Alert>;
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
