import gql from 'graphql-tag';

export const getAddressById = gql`
query getAddressById($id: Int!) {
  address(id: $id) {
    id
    name
    country
    city
    postalCode
    addressLine
  }
}`;