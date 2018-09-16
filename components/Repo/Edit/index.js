import React, { Component, Fragment } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Value, KeyUtils } from 'slate'

import {
  Editor,
  EditorUI,
  EditorStateProvider,
} from '../../Editor'

import VersionControl from '../../VersionControl'
import CommitButton from '../../VersionControl/CommitButton'
import Sidebar from '../../Sidebar'

import {
  EditPageRepo,
  CommitWithDocument,
} from '../../../lib/graphql/fragments'

import Frame from '../../Frame'
import RepoNav from '../Nav'
import Loader from '../../Loader'
import Template from '../../Template'

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

export const COMMIT = gql`
  mutation commit(
    $repoId: ID!
    $parentId: ID
    $message: String!
    $document: DocumentInput!
  ) {
    commit(
      repoId: $repoId
      parentId: $parentId
      message: $message
      document: $document
    ) {
      ...CommitWithDocument
      repo {
        ...EditPageRepo
      }
    }
  }
  ${CommitWithDocument}
  ${EditPageRepo}
`

let keysReset = false
const resetSlateKeys = () => {
  if (!keysReset) {
    KeyUtils.resetGenerator()
    keysReset = !!process.browser
  }
}

// export class EditPage extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       mdastDocument,
//     }
//   }
// }

export default ({ router }) => {
  resetSlateKeys()
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
          <EditorStateProvider>
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
                <Loader
                  loading={loading}
                  render={() => {
                    const templateName =
                      repo.commit.document.content
                        .meta.template

                    return (
                      <Fragment>
                        <Template
                          name={templateName}
                        >
                          {({
                            plugins,
                            schema,
                            serialize,
                            deserialize,
                          }) => (
                            <Editor
                              plugins={plugins}
                              schema={schema}
                              value={Value.fromJSON(
                                {
                                  document: deserialize(
                                    data.repo
                                      .commit
                                      .document
                                      .content
                                  ),
                                }
                              )}
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
                    )
                  }}
                />
              </Frame.Body>
            </Frame>
          </EditorStateProvider>
        )
      }}
    </Query>
  )
}
