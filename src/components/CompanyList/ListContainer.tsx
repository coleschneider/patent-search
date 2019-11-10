import React, { useContext, useEffect } from 'react'
import { FixedSizeList as List } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import AutoSizer from 'react-virtualized-auto-sizer'
import { AppState } from '../../hooks/useCompanies/appReducer'
import { CompanyContext } from '../App'
import { companySearch } from '../../utils/service'

const LOADED = 2

export const ListContainer = () => {
  const { state, getCompaniesByName } = CompanyContext()
  const { appState, appDispatch } = useContext(AppState)

  const { itemStatusMap } = appState
  const { assignees, total_assignee_count, count } = state.companies
  useEffect(() => {
    companySearch('sprint', 1).then(res => {
      appDispatch({
        type: 'POPULATE',
        payload: { total_assignee_count: res.data.total_assignee_count, count: res.data.count },
      })
    })
  }, [])

  const isItemLoaded = index => itemStatusMap[index] === LOADED
  const loadMoreItems = (startIndex, stopIndex) => {
    console.log({ startIndex, stopIndex })
    appDispatch({
      type: 'SET_ITEM_AND_INDEX',
      payload: { startIndex, stopIndex },
    })
    return companySearch('sprint', 2).then(res => {
      const nState = itemStatusMap.concat()

      for (let index = startIndex; index <= stopIndex; index++) {
        nState[index] = LOADED
      }
      console.log(nState)
      appDispatch({
        type: 'SET_ASYNC_DATA',
        payload: nState,
      })
    })
    // return new Promise(resolve =>
    //   setTimeout(() => {
    //     const nState = itemStatusMap.concat()

    //     for (let index = startIndex; index <= stopIndex; index++) {
    //       nState[index] = LOADED
    //     }
    //     console.log(nState)
    //     appDispatch({
    //       type: 'SET_ASYNC_DATA',
    //       payload: nState,
    //     })
    //     resolve()
    //   }, 2500),
    // )
  }

  const ItemRenderer = ({ style, index }) => {
    if (itemStatusMap[index] === LOADED) {
      return (
        <div className="ListItem" style={style}>
          {`Row ${index}`}
        </div>
      )
    }
    return (
      <div className="ListItem" style={style}>
        Loading...
      </div>
    )
  }

  return (
    <div>
      <p className="Note">This demo app mimics loading and functional component aproach</p>
      <div className="ContainerList">
        <AutoSizer>
          {({ width, height }) => (
            <InfiniteLoader isItemLoaded={isItemLoaded} itemCount={itemStatusMap.length} loadMoreItems={loadMoreItems}>
              {({ onItemsRendered, ref }) => (
                <List
                  className="List"
                  height={height}
                  itemCount={itemStatusMap.length}
                  itemSize={50}
                  onItemsRendered={onItemsRendered}
                  ref={ref}
                  width={width}
                >
                  {ItemRenderer}
                </List>
              )}
            </InfiniteLoader>
          )}
        </AutoSizer>
      </div>
    </div>
  )
}
