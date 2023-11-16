export default class ApiUtils {
  static URL_IP = 'http://127.0.0.1:5000';
  static URL_ROOT = '/api/v1';

  // static API_STAFF_UPDATE = ApiUtils.URL_ROOT + '/updateStaff';
  // static API_STAFF_LIST = ApiUtils.URL_ROOT + '/getStaffList/';
  // static API_STAFF_DELETE = ApiUtils.URL_ROOT + '/deleteStaff/';
  static API_SEARCH = ApiUtils.URL_IP + ApiUtils.URL_ROOT + '/search';
  static API_GRAPH = ApiUtils.URL_IP + ApiUtils.URL_ROOT + '/graph';
  static API_SEARCH_CONC = ApiUtils.URL_IP + ApiUtils.URL_ROOT + '/searchconc';
  static API_SEARCH_OPER = ApiUtils.URL_IP + ApiUtils.URL_ROOT + '/searchoper';
  static API_SEARCH_METH = ApiUtils.URL_IP + ApiUtils.URL_ROOT + '/searchmeth';
  static API_QUESTION = ApiUtils.URL_IP + ApiUtils.URL_ROOT + '/question';
  static API_WHOLE_GRAPH = ApiUtils.URL_IP + ApiUtils.URL_ROOT + '/whole';
  static API_SEARCH_NODE = ApiUtils.URL_IP + ApiUtils.URL_ROOT + '/node';

  // static API_CHECK_PASSWORD = ApiUtils.URL_ROOT + '/checkPassword';
  // static API_ADMIN = ApiUtils.URL_ROOT + '/gotoAdmin'; //进入管理员状态
  // static API_EXPORT_TO_FILE = ApiUtils.URL_ROOT + '/export_to_file'; //将数据导出到文件
}
