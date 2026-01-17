import React, {memo} from 'react';
import {Col, Row, Spinner, Alert} from 'react-bootstrap';
import {GroupContactsCard} from 'src/components/GroupContactsCard';
import { observer } from 'mobx-react-lite';
import { useStore } from 'src/store/RootStore';

export const GroupListPage = observer(() => {
  const store = useStore();
  const { groups, isLoading, error } = store;
  const loading = isLoading.groups;
  const dataError = error.groups ? 'Error loading data' : undefined;

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (dataError) {
    return <Alert variant="danger">{dataError}</Alert>;
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
