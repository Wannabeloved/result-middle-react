import React, {memo} from 'react';
import {Col, Row, Spinner, Alert} from 'react-bootstrap';
import {GroupContactsCard} from 'src/components/GroupContactsCard';
import { useAppSelector } from 'src/store/hooks';

export const GroupListPage = memo(() => {
  const { items: groups, loading, error } = useAppSelector(state => state.groups);

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Row xxl={4} className="g-4">
      {groups.map((groupContacts) => (
        <Col key={groupContacts.id}>
          <GroupContactsCard groupContacts={groupContacts} withLink />
        </Col>
      ))}
    </Row>
  );
});
