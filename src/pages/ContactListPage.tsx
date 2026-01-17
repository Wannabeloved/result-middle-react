import React, {memo, useMemo} from 'react';
import {Col, Row, Spinner, Alert} from 'react-bootstrap';
import {ContactCard} from 'src/components/ContactCard';
import {FilterForm, FilterFormValues} from 'src/components/FilterForm';
import { observer } from 'mobx-react-lite';
import { useStore } from 'src/store/RootStore';

export const ContactListPage = observer(() => {
  const store = useStore();
  const { filteredContacts, groups, filters, isLoading, error } = store;
  const loading = isLoading.contacts || isLoading.groups;
  const dataError = error.contacts || error.groups ? 'Data loading error' : undefined;

  const onSubmit = (fv: Partial<FilterFormValues>) => {
    store.setNameFilter(fv.name || '');
    store.setGroupFilter(fv.groupId || '');
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (dataError) {
    return <Alert variant="danger">{dataError}</Alert>;
  }

  return (
    <Row xxl={1}>
      <Col className="mb-3">
        <FilterForm groupContactsList={groups} initialValues={filters} onSubmit={onSubmit} />
      </Col>
      <Col>
        <Row xxl={4} className="g-4">
          {filteredContacts.map((contact) => (
            <Col key={contact.id}>
              <ContactCard contact={contact} withLink />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
});
