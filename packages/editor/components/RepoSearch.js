import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import {
  Autocomplete,
  InlineSpinner,
} from '@project-r/styleguide'
import debounce from 'lodash.debounce'

import {
  GITHUB_ORG,
  REPO_PREFIX,
} from '@self/settings'

export const GET_FILTERED_REPOS = gql`
  query searchRepo(
    $after: String
    $search: String
  ) {
    repos(
      first: 10
      after: $after
      search: $search
    ) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        id
        latestCommit {
          id
          document {
            id
            meta {
              title
              image
              template
              description
              credits
              kind
              color
              format {
                id
                repoId
                meta {
                  title
                  color
                  kind
                }
              }
            }
          }
        }
      }
    }
  }
`

const safeValue = value =>
  typeof value === 'string'
    ? { value, text: value }
    : null

export default class RepoSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      filter: '',
      search: '',
      value: safeValue(props.value),
    }

    this.filterChangeHandler = this.filterChangeHandler.bind(
      this
    )
    this.changeHandler = this.changeHandler.bind(
      this
    )
    this.setSearchValue = debounce(
      this.setSearchValue.bind(this),
      500
    )
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: safeValue(nextProps.value),
    })
  }

  componentWillUnmount() {
    this.setSearchValue.cancel()
  }

  setSearchValue() {
    this.setState({
      search: this.state.filter,
    })
  }

  filterChangeHandler(value) {
    this.setState(
      () => ({
        filter: value,
      }),
      this.setSearchValue
    )
  }

  changeHandler(value) {
    this.setState(
      () => ({
        value: null,
        filter: null,
      }),
      () => this.props.onChange(value)
    )
  }

  render() {
    const { filter, value, search } = this.state

    return (
      <Query
        query={GET_FILTERED_REPOS}
        variables={{ search }}
        skip={!filter}
      >
        {({ loading, data /*error*/ }) => {
          const {
            repos: { nodes = [] } = {},
          } = data
          const items = loading
            ? []
            : nodes.map(v => ({
                value: v,
                text:
                  v.latestCommit.document.meta
                    .title ||
                  v.id.replace(
                    [
                      GITHUB_ORG,
                      REPO_PREFIX || '',
                    ].join('/'),
                    ''
                  ),
              }))

          return (
            <span
              style={{
                position: 'relative',
                display: 'block',
              }}
            >
              <Autocomplete
                filter={filter}
                value={value}
                items={items}
                label={this.props.label}
                onChange={this.changeHandler}
                onFilterChange={
                  this.filterChangeHandler
                }
              />
              {loading && (
                <span
                  style={{
                    position: 'absolute',
                    top: '21px',
                    right: '0px',
                    zIndex: 500,
                  }}
                >
                  <InlineSpinner size={35} />
                </span>
              )}
            </span>
          )
        }}
      </Query>
    )
  }
}
