import gql from 'graphql-tag';

export const GET_CONTACTS = gql`
query getContacts {
  contacts {
    id
    firstName
    lastName
    contactType
    notes
    countOfAddress
  }
}`;

export const GET_CONTACT_BY_ID = gql`
query getContactById($id: Int!) {
  contact(id: $id) {
    id
    firstName
    lastName
    phoneNumber
    email
    contactType
    webAddress
    notes
    countOfAddress
    addresses {
      id
      name
      country
      city
      postalCode
      addressLine
    }
  }
}`;