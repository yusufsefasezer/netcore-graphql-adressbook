import gql from 'graphql-tag';

export const addContact = gql`
mutation addContact($contact: ContactInputType!) {
  addContact(contact: $contact) {
    id
    firstName
    lastName
  }
}`

export const updateContact = gql`
mutation updateContact($contactId: Int!, $contact: ContactInputType!) {
  updateContact(contactId: $contactId, contact: $contact) {
    id
    firstName
    lastName
  }
}`

export const deleteContact = gql`
mutation deleteContact($contactId: Int!) {
  deleteContact(contactId: $contactId)
}`