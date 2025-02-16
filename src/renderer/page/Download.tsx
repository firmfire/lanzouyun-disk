import React from 'react'
import {observer, Observer} from 'mobx-react'
import {ScrollView} from '../component/ScrollView'
import {Header} from '../component/Header'
import {Button} from '../component/Button'
import {Bar} from '../component/Bar'
import {Icon} from '../component/Icon'
import {byteToSize} from '../../common/util'
import {download} from '../store'
import {TaskStatus} from '../store/AbstractTask'
import Table from '../component/Table'
import path from 'path'

const Download = observer(() => {
  return (
    <ScrollView
      HeaderComponent={
        <>
          <Header>
            <Button onClick={() => download.pauseAll()}>全部暂停</Button>
            <Button onClick={() => download.startAll()}>全部开始</Button>
            <Button onClick={() => download.removeAll()}>全部删除</Button>
          </Header>
          <Bar>
            <span>正在下载</span>
          </Bar>
        </>
      }
    >
      <Table
        rowKey={'url'}
        dataSource={[...download.list]}
        // dataSource={download.list}
        columns={[
          {
            title: '文件名',
            render: item => {
              const extname = path.extname(item.name).replace(/^\./, '')

              return (
                <>
                  <Icon iconName={extname} defaultIcon={'file'} />
                  <span title={item.dir}>{item.name}</span>
                </>
              )
            },
          },
          {
            title: '大小',
            width: 170,
            render: item => (
              <Observer>
                {() => (
                  <span>
                    {`${byteToSize(item.resolve)} / ${byteToSize(item.total)}`} (
                    {((item.resolve / item.total) * 100).toFixed(1)}%)
                  </span>
                )}
              </Observer>
            ),
          },
          {
            title: '操作',
            render: item => (
              <>
                <Observer>
                  {() => (
                    <Button
                      icon={item.status === TaskStatus.pending ? 'pause' : 'start'}
                      type={'icon'}
                      onClick={() => {
                        if (item.status === TaskStatus.pending) {
                          download.pause(item.url)
                        } else {
                          download.start(item.url, true)
                        }
                      }}
                    />
                  )}
                </Observer>

                <Button icon={'delete'} type={'icon'} onClick={() => download.remove(item.url)} />
              </>
            ),
          },
        ]}
      />
    </ScrollView>
  )
})

export default Download
