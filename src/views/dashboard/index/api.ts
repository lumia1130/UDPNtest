import request from '@/utils/request'


export const getLists = () =>
  request({
    url: 'v1/udpn/member/node/manager/searchs',
    method: 'post'
  })
