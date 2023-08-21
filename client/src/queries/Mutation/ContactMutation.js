import gql from 'graphql-tag';

export const ADD_CONTACT = gql`
mutation addContact($contact: ContactInputType!) {
  addContact(contact: $contact) {
    id
    firstName
    lastName
  }
}`

export const UPDATE_CONTACT = gql`
mutation updateContact($contactId: Int!, $contact: ContactInputType!) {
  updateContact(contactId: $contactId, contact: $contact) {
    id
    firstName
    lastName
  }
}`

export const DELETE_CONTACT = gql`
mutation deleteContact($contactId: Int!) {
  deleteContact(contactId: $contactId)
}`