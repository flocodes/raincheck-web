import { gql } from 'apollo-boost'
import { tripFragments } from './fragments'

// Create a trip
export const CREATE_TRIP_MUTATION = gql`
mutation create_trip(
  $enabled: Boolean!
  $start: DateTime!
  $end: DateTime!
  $name: String!
  $from_lat: Float!
  $from_lon: Float!
  $to_lat: Float!
  $to_lon: Float!
  $notify_at: DateTime!
  ) {
    createTrip (
      enabled: $enabled
      start: $start
      end:$end
      name: $name
      from_lat: $from_lat
      from_lon: $from_lon
      to_lat: $to_lat
      to_lon: $to_lon
      notify_at: $notify_at
    ) {
      ...AllFields
    }
  }
  ${tripFragments.trip}
`

// Update a trip by its ID
export const UPDATE_TRIP_MUTATION = gql`
mutation update_trip(
  $id: ID!
  $enabled: Boolean
  $start: DateTime
  $end: DateTime
  $name: String
  $from_lat: Float
  $from_lon: Float
  $to_lat: Float
  $to_lon: Float
  $notify_at: DateTime
  ) {
    updateTrip (
      id: $id
      enabled: $enabled
      start: $start
      end:$end
      name: $name
      from_lat: $from_lat
      from_lon: $from_lon
      to_lat: $to_lat
      to_lon: $to_lon
      notify_at: $notify_at
    ) {
      ...AllFields
    }
  }
  ${tripFragments.trip}
`

// Delete a trip by its ID
export const DELETE_TRIP_MUTATION = gql`
  mutation delete_trip($id: ID!) {
    deleteTrip(id: $id) {
      ...AllFields
    }
  }
  ${tripFragments.trip}
`

// Sign up a new user
export const SIGNUP_MUTATION = gql`
  mutation signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      user {
        id
      }
    }
  }
`

// Log in an existing user
export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
      }
    }
  }
`

export const LOGOUT_MUTATION = gql`
  mutation logout {
    logout
  }
`
