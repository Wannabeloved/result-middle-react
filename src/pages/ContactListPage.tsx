import React, {memo, useMemo} from 'react';
import {Col, Row, Spinner, Alert} from 'react-bootstrap';
import {ContactCard} from 'src/components/ContactCard';
import {FilterForm, FilterFormValues} from 'src/components/FilterForm';
import { useAppSelector, useAppDispatch } from 'src/store/hooks';
import { setNameFilter, setGroupFilter } from 'src/store/filterSlice';
import { useGetContactsQuery, useGetGroupsQuery } from 'src/store/api';

export const ContactListPage = memo(() => {
  const dispatch = useAppDispatch();
  const { data: contacts = [], isLoading: isContactsLoading, isError: isContactsError } = useGetContactsQuery();
  const { data: groups = [], isLoading: isGroupsLoading, isError: isGroupsError } = useGetGroupsQuery();
  const filter = useAppSelector(state => state.filter);
  const loading = isContactsLoading || isGroupsLoading;
  const error = isContactsError || isGroupsError ? 'Data loading error' : undefined;

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
    dispatch(setNameFilter(fv.name || ''));
    dispatch(setGroupFilter(fv.groupId || ''));
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
