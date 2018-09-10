import React from 'react'
import { compose } from 'redux'

import withAuthorization from '../../components/Auth/withAuthorization'

import Frame from '../../components/Frame'
import RepoNav from '../../components/Repo/Nav'
import PublishForm from '../../components/Publication/PublishForm'

import withT from '../../lib/withT'

const Page = ({ url, t }) => {
  const { repoId, commitId } = url.query

  return (
    <Frame>
      <Frame.Header>
        <Frame.Header.Section align="left">
          <Frame.Nav url={url}>
            <RepoNav
              route="repo/tree"
              url={url}
            />
          </Frame.Nav>
        </Frame.Header.Section>
        <Frame.Header.Section align="right">
          <Frame.Me />
        </Frame.Header.Section>
      </Frame.Header>
      <Frame.Body>
        <h1>{t('publish/title')}</h1>
        <PublishForm
          repoId={repoId}
          commitId={commitId}
          t={t}
        />
      </Frame.Body>
    </Frame>
  )
}

export default compose(
  withAuthorization(['editor']),
  withT
)(Page)
