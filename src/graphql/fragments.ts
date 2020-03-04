import { gql } from 'apollo-boost'

export const tripFragments = {
  trip: gql`
    fragment AllFields on Trip {
      id
      name
      enabled
      start
      end
      from_lat
      from_lon
      to_lat
      to_lon
      notify_at
    }
  `
}
