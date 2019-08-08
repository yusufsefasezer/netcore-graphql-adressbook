import gql from 'graphql-tag';

export const getContacts = gql`
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

export const getContactById = gql`
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