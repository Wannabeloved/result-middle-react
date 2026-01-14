import React, {memo, useMemo} from 'react';
import {Col, Row, Spinner, Alert} from 'react-bootstrap';
import {ContactCard} from 'src/components/ContactCard';
import {FilterForm, FilterFormValues} from 'src/components/FilterForm';
import { useAppSelector, useAppDispatch } from 'src/store/hooks';
import { filterActions } from 'src/store/contacts/filter';

export const ContactListPage = memo(() => {
  const dispatch = useAppDispatch();
  const { contacts, groups, filter, loading, error } = useAppSelector(state => ({
    contacts: state.contacts.items,
    groups: state.groups.items,
    filter: state.filter,
    loading: state.contacts.loading || state.groups.loading,
    error: state.contacts.error || state.groups.error,
  }));

  const filteredContacts = useMemo(() => {
    const { name, groupId } = filter;
    const nameLower = name.toLowerCase();
    
    const group = groups.find(g => g.id === groupId);
    const contactIdsInGroup = group ? new Set(group.contactIds) : null;

    return contacts.filter(contact => {
      const nameMatch = !nameLower || contact.name.toLowerCase().includes(nameLower);
      const groupMatch = !contactIdsInGroup || contactIdsInGroup.has(contact.id);
      return nameMatch && groupMatch;
    });
  }, [contacts, groups, filter]);

  const onSubmit = (fv: Partial<FilterFormValues>) => {
    dispatch(filterActions.setNameFilter(fv.name || ''));
    dispatch(filterActions.setGroupFilter(fv.groupId || ''));
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Row xxl={1}>
      <Col className="mb-3">
        <FilterForm groupContactsList={groups} initialValues={filter} onSubmit={onSubmit} />
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
