import React, {memo} from 'react';
import {ContactDto} from 'src/types/dto/ContactDto';
import {Card, ListGroup, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
// import { useAppDispatch } from 'src/store/hooks';
// import { contactsActions } from 'src/store/contacts/contacts';
import { useToggleFavoriteMutation } from 'src/store/api';

interface ContactCardProps {
  contact: ContactDto,
  withLink?: boolean
}

export const ContactCard = memo<ContactCardProps>(({
    contact, withLink
  }) => {
    const { photo, id, name, phone, birthday, address, isFavorite } = contact;
    const [toggleFavorite] = useToggleFavoriteMutation();
    // const dispatch = useAppDispatch();

    const handleToggleFavorite = () => {
      // dispatch(contactsActions.toggleFavorite(id));
      toggleFavorite({ id, isFavorite: !isFavorite });
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
)
