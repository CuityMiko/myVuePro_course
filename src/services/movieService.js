/**
 * movie数据服务
 */
import HttpHelper from '../js/commons/httpHelper'
import Config from '../js/config.js' 

export default class MovieService{
    // 服务器地址
    static serverUrl=Config.server_url;
    static doubanApi=Config.apiurl.doubanurl.movie

    /**
     * 获取电影列表
     * @param {*电影类型} movietype 
     * @param {*参数} parmas 
     * @param {*可选参数：Vue根实例的$http} vrobj 
     */
    static GetMovieList(movietype,parmas,vrobj=null){
        let _url=`${this.serverUrl}/movie/${movietype}/getlist`;
        return HttpHelper.Get(_url,parmas,vrobj);

        // let _url=`${this.doubanApi}/${movietype}`;
        // return HttpHelper.Jsonp(_url,parmas,vrobj);
    }
}