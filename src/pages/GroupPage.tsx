import React, {memo} from 'react';
import {Col, Row, Spinner, Alert} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {GroupContactsCard} from 'src/components/GroupContactsCard';
import {Empty} from 'src/components/Empty';
import {ContactCard} from 'src/components/ContactCard';
// import { useAppSelector } from 'src/store/hooks';
import { useGetContactsQuery, useGetGroupsQuery } from 'src/store/api';

export const GroupPage = memo(() => {
  const {groupId} = useParams<{ groupId: string }>();
  const { group, loading: groupLoading, error: groupError } = useGetGroupsQuery(undefined, {
    selectFromResult: ({ data, isLoading, isError }) => ({
      group: data?.find(({ id }) => id === groupId),
      loading: isLoading,
      error: isError,
    }),
  });

  const { contactsInGroup, loading: contactsLoading, error: contactsError } = useGetContactsQuery(undefined, {
    selectFromResult: ({ data, isLoading, isError }) => ({
      contactsInGroup: group ? data?.filter(({ id }) => group.contactIds.includes(id)) || [] : [],
      loading: isLoading,
      error: isError,
    }),
  });

  const loading = groupLoading || contactsLoading;
  const error = groupError || contactsError ? 'Error loading data' : undefined;

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
