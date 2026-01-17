import React, {memo} from 'react';
import {ContactDto} from 'src/types/dto/ContactDto';
import {Card, ListGroup, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
// import { useAppDispatch } from 'src/store/hooks';
// import { contactsActions } from 'src/store/contacts/contacts';
import { observer } from 'mobx-react-lite';
import { useStore } from 'src/store/RootStore';

interface ContactCardProps {
  contact: ContactDto,
  withLink?: boolean
}

export const ContactCard = observer<ContactCardProps>(({
    contact, withLink
  }) => {
    const { id, name, phone, birthday, address, photo, isFavorite } = contact;
    const store = useStore();

    const handleToggleFavorite = () => {
      store.toggleFavorite(id, !isFavorite);
    };

    return (
      <Card key={id}>
        <Card.Img variant="top" src={photo} />
        <Card.Body>
          <Card.Title className="d-flex justify-content-between align-items-start">
            {withLink ? <Link to={`/contact/${id}`}>{name}</Link> : name}
            <Button variant="link" onClick={handleToggleFavorite} style={{ fontSize: '1.5rem', textDecoration: 'none', color: 'orange' }}>
              {isFavorite ? '★' : '☆'}
            </Button>
          </Card.Title>
          <Card.Body>
            <ListGroup>
              <ListGroup.Item><Link to={`tel:${phone}`} target="_blank">{phone}</Link></ListGroup.Item>
              <ListGroup.Item>{birthday}</ListGroup.Item>
              <ListGroup.Item>{address}</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card.Body>
      </Card>
    );
  }
);
