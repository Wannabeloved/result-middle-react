import React, {memo} from 'react';
import {Col, Row, Spinner, Alert} from 'react-bootstrap';
import {GroupContactsCard} from 'src/components/GroupContactsCard';
// import { useAppSelector } from 'src/store/hooks';
import { useGetGroupsQuery } from 'src/store/api';

export const GroupListPage = memo(() => {
  const { data: groups = [], loading, error } = useGetGroupsQuery(undefined, {
    selectFromResult: ({ data, isLoading, isError }) => ({
      data,
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
      {groups.map((groupContacts) => (
        <Col key={groupContacts.id}>
          <GroupContactsCard groupContacts={groupContacts} withLink />
        </Col>
      ))}
    </Row>
  );
});
