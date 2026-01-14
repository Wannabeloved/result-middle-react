import React, {memo} from 'react';
import {Col, Row, Spinner, Alert} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {GroupContactsCard} from 'src/components/GroupContactsCard';
import {Empty} from 'src/components/Empty';
import {ContactCard} from 'src/components/ContactCard';
import { useAppSelector } from 'src/store/hooks';

export const GroupPage = memo(() => {
  const {groupId} = useParams<{ groupId: string }>();
  const { group, contactsInGroup, loading, error } = useAppSelector(state => {
    const group = state.groups.items.find(({id}) => id === groupId);
    const contactsInGroup = group 
      ? state.contacts.items.filter(({id}) => group.contactIds.includes(id))
      : [];
    
    return {
      group,
      contactsInGroup,
      loading: state.groups.loading || state.contacts.loading,
      error: state.groups.error || state.contacts.error,
    }
  });

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Row className="g-4">
      {group ? (
        <>
          <Col xxl={12}>
            <Row xxl={3}>
              <Col className="mx-auto">
                <GroupContactsCard groupContacts={group} />
              </Col>
            </Row>
          </Col>
          <Col>
            <Row xxl={4} className="g-4">
              {contactsInGroup.map((contact) => (
                <Col key={contact.id}>
                  <ContactCard contact={contact} withLink />
                </Col>
              ))}
            </Row>
          </Col>
        </>
      ) : <Empty />}
    </Row>
  );
});
