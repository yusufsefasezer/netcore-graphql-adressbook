import gql from 'graphql-tag';

export const addAddress = gql`
mutation addAddress($contactId: Int!, $address: AddressInputType!) {
  addAddress(contactId: $contactId, address: $address) {
    id
    name
    city
    country
  }
}`

export const updateAddress = gql`
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

export const deleteAddress = gql`
mutation deleteAddress($addressId: Int!) {
  deleteAddress(addressId: $addressId)
}`
