import request from '@/utils/request'

// export const getUserInfo = (data: any) =>
//   request({
//     url: '/users/info',
//     method: 'post',
//     data
//   })

export const getLists = () =>
  request({
    url: 'v1/udpn/member/node/manager/searchs',
    method: 'post'
  })
