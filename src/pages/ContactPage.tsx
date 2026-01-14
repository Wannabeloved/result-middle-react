import React, {FC} from 'react';
import {Col, Row, Spinner, Alert} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {ContactCard} from 'src/components/ContactCard';
import {Empty} from 'src/components/Empty';
// import { useAppSelector } from 'src/store/hooks';
import { useGetContactsQuery } from 'src/store/api';

export const ContactPage: FC = () => {
  const {contactId} = useParams<{ contactId: string }>();
  const { contact, loading, error } = useGetContactsQuery(undefined, {
    selectFromResult: ({ data, isLoading, isError }) => ({
      contact: data?.find(({ id }) => id === contactId),
      loading: isLoading,
      error: isError ? 'Error loading contact' : undefined,
    }),
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
