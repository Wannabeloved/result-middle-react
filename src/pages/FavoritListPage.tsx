import React, {memo} from 'react';
import {Col, Row, Spinner, Alert} from 'react-bootstrap';
import {ContactCard} from 'src/components/ContactCard';
// import { useAppSelector } from 'src/store/hooks';
import { useGetContactsQuery } from 'src/store/api';

export const FavoritListPage = memo(() => {
  const { items: favoriteContacts, loading, error } = useGetContactsQuery(undefined, {
    selectFromResult: ({ data, isLoading, isError }) => ({
      items: data?.filter(contact => contact.isFavorite) || [],
      loading: isLoading,
      error: isError ? 'Error loading data' : undefined,
    }),
  });
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
