/**
 * 全局配置文件
 */
const _keys={
    bmapkey:'DOccg9buS8Vz1EngbQgfxvZvUNjI4Abl'
}
export default{
    server_url:"http://192.168.0.104:9001",
    page:{
        pagesize:10
    },
    apiurl:{
        bmapurl:{
            getLocationUrl:`https://api.map.baidu.com/location/ip?ak=${_keys.bmapkey}&coor=bd09ll`
        },
        doubanurl:{
            movie:'https://api.douban.com/v2/movie/'
        }
    },
    fetchmode:'axios' // 跨域请求获取数据的方式：fetch、axios、vue-resource
}