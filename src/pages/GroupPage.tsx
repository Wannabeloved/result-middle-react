import React, {memo} from 'react';
import {Col, Row, Spinner, Alert} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {GroupContactsCard} from 'src/components/GroupContactsCard';
import {Empty} from 'src/components/Empty';
import {ContactCard} from 'src/components/ContactCard';
import { observer } from 'mobx-react-lite';
import { useStore } from 'src/store/RootStore';

export const GroupPage = observer(() => {
  const { groupId } = useParams<{ groupId: string }>();
  const store = useStore();
  
  const group = store.groups.find(({ id }) => id === groupId);
  const contactsInGroup = group 
    ? store.contacts.filter(({ id }) => group.contactIds.includes(id)) 
    : [];

  const loading = store.isLoading.groups || store.isLoading.contacts;
  const dataError = store.error.groups || store.error.contacts ? 'Error loading data' : undefined;

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (dataError) {
    return <Alert variant="danger">{dataError}</Alert>;
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
