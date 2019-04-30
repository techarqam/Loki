
let orgConfig = require('../config/orgConfig');

export default {
    'courseList': `${orgConfig.serverEndpoint}/api/course`,
    'leadList': `${orgConfig.serverEndpoint}/api/lead`,
    'stageList': `${orgConfig.serverEndpoint}/api/stage?sort=order`,
    'categoryList': `${orgConfig.serverEndpoint}/api/category?sort=order`,
    'login': `${orgConfig.serverEndpoint}/user/login`,
    'user': `${orgConfig.serverEndpoint}/user`,
    'activity': `${orgConfig.serverEndpoint}/api/activity`,
    'resetPassword': `${orgConfig.serverEndpoint}/user/resetpassword`,
    'leadsCount': `${orgConfig.serverEndpoint}/api/lead`,
}