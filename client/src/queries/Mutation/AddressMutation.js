import gql from 'graphql-tag';

export const ADD_ADDRESS = gql`
mutation addAddress($contactId: Int!, $address: AddressInputType!) {
  addAddress(contactId: $contactId, address: $address) {
    id
    name
    city
    country
  }
}`

export const UPDATE_ADDRESS = gql`
mutation updateAddress($addressId: Int!, $address: AddressInputType!) {
  updateAddress(addressId: $addressId, address: $address) {
    id
    name
    country
    city
    postalCode
    addressLine
  }
}`

export const DELETE_ADDRESS = gql`
mutation deleteAddress($addressId: Int!) {
  deleteAddress(addressId: $addressId)
}`
