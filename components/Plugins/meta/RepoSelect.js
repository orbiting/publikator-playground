import React from 'react'
import { css } from 'glamor'

import { MdClose as CloseIcon } from 'react-icons/md'

import {
  A,
  Label,
  colors,
} from '@project-r/styleguide'

import RepoSearch from '../../Editor/components/RepoSearch'
import { RepoLink } from '../../../lib/github'

const styles = {
  value: css({
    height: 60,
    marginBottom: 12,
    borderBottom: '1px solid #000',
    paddingRight: 20,
    position: 'relative',
  }),
  valueText: css({
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: 22,
    lineHeight: '40px',
  }),
  x: css({
    position: 'absolute',
    right: 0,
    bottom: 7,
  }),
}

export default ({ label, value, onChange }) => {
  const onRefChange = item => {
    onChange(
      item
        ? `https://github.com/${item.value.id}`
        : null,
      item
    )
  }
  if (value) {
    return (
      <div {...styles.value}>
        <Label style={{ color: '#000' }}>
          {label}
        </Label>
        <br />
        <div {...styles.valueText}>
          <RepoLink
            value={value}
            invalid={() => (
              <span
                style={{ color: colors.error }}
              >
                {value}
              </span>
            )}
          />
        </div>
        <A
          href="#remove"
          {...styles.x}
          onClick={e => {
            e.preventDefault()
            onRefChange(null)
          }}
        >
          <CloseIcon size={25} />
        </A>
      </div>
    )
  }
  return (
    <RepoSearch
      label={label}
      onChange={onRefChange}
    />
  )
}
