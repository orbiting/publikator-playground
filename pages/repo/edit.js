import React, { Fragment } from 'react'
import { compose } from 'redux'
import { withRouter } from 'next/router'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import Editor from '@orbiting/publikator-editor'
import EditorUI from '@orbiting/publikator-editor/components/UI'

import VersionControl from '../../components/VersionControl'
import Sidebar from '../../components/Sidebar'

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
  const { repoId, commitId } = router.query
  const isNew = commitId === 'new'

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
        <Query
          query={GET_COMMIT_BY_ID}
          skip={isNew || !commitId}
          variables={{
            repoId: router.query.repoId,
            commitId: router.query.commitId,
          }}
        >
          {({ loading, data }) => {
            const { repo } = data
            return (
              <Loader
                loading={loading}
                render={() => (
                  <Fragment>
                    <Template
                      mdastDocument={
                        data.repo.commit.document
                          .content
                      }
                    >
                      {editorProps => (
                        <Editor
                          {...editorProps}
                        />
                      )}
                    </Template>
                    <Sidebar
                      selectedTabId={'edit'}
                      isOpen
                    >
                      {
                        <Sidebar.Tab
                          tabId="edit"
                          label="Editieren"
                        >
                          <EditorUI />
                        </Sidebar.Tab>
                      }
                      <Sidebar.Tab
                        tabId="workflow"
                        label="Workflow"
                      >
                        <VersionControl
                          repoId={repoId}
                          commit={
                            repo &&
                            (repo.commit ||
                              repo.latestCommit)
                          }
                          isNew={isNew}
                        />
                      </Sidebar.Tab>
                    </Sidebar>
                  </Fragment>
                )}
              />
            )
          }}
        </Query>
      </Frame.Body>
    </Frame>
  )
}

export default compose(
  withAuthorization(['editor']),
  withRouter
)(EditPage)
