import React from 'react'
import { compose } from 'redux'
import { withRouter } from 'next/router'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import Editor from '@orbiting/publikator-editor'
import EditorUI from '@orbiting/publikator-editor/components/UI'

import {
  EditPageRepo,
  CommitWithDocument,
} from '../../lib/graphql/fragments'

import Frame from '../../components/Frame'
import RepoNav from '../../components/Repo/Nav'
import withAuthorization from '../../components/Auth/withAuthorization'
import Loader from '../../components/Loader'
import Template from '../../components/Template'

export const GET_COMMIT_BY_ID = gql`
  query getCommitById(
    $repoId: ID!
    $commitId: ID!
  ) {
    repo(id: $repoId) {
      ...EditPageRepo
      commit(id: $commitId) {
        ...CommitWithDocument
      }
    }
  }
  ${EditPageRepo}
  ${CommitWithDocument}
`

const EditPage = ({ router }) => {
  const isNew = router.query.commitId === 'new'
  const nav = (
    <RepoNav
      route="repo/edit"
      url={router}
      isNew={isNew}
    />
  )
  return (
    <Frame url={router} raw nav={nav}>
      <Frame.Header>
        <Frame.Header.Section align="left">
          <Frame.Nav url={router}>
            <RepoNav
              route="repo/edit"
              url={router}
              isNew={isNew}
            />
          </Frame.Nav>
        </Frame.Header.Section>
        <Frame.Header.Section align="right">
          <Frame.Me />
        </Frame.Header.Section>
      </Frame.Header>
      <Frame.Body raw>
        <EditorUI />

        <Query
          query={GET_COMMIT_BY_ID}
          skip={
            router.query.commitId === 'new' ||
            !router.query.commitId
          }
          variables={{
            repoId: router.query.repoId,
            commitId: router.query.commitId,
          }}
        >
          {({ loading, data }) => (
            <Loader
              loading={loading}
              render={() => (
                <Template
                  mdastDocument={
                    data.repo.commit.document
                      .content
                  }
                >
                  {editorProps => (
                    <Editor {...editorProps} />
                  )}
                </Template>
              )}
            />
          )}
        </Query>
      </Frame.Body>
    </Frame>
  )
}

export default compose(
  withAuthorization(['editor']),
  withRouter
)(EditPage)
