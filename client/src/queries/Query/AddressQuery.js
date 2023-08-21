import gql from 'graphql-tag';

export const GET_ADDRESS_BY_ID = gql`
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