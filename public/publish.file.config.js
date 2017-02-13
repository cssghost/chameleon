var path = require('path');

module.exports = {
    js : {
        // npm project
        vendors : ['jquery', 'underscore', 'backbone', 'react', 'react-dom', 'react-router', 'redux', 'react-redux', 'redux-thunk', 'react-router-redux'],
        // vendors : ['jquery', 'underscore', 'backbone', 'react', 'react-dom', 'es5-shim', 'es5-shim/es5-sham'],
        // framework
        dep : [
            path.resolve(__dirname, 'js/framework/config.js'),
            path.resolve(__dirname, 'js/framework/store.js'),
            path.resolve(__dirname, 'js/framework/filter.js'),
            path.resolve(__dirname, 'js/framework/ct.template.js'),
            path.resolve(__dirname, 'js/framework/main.service.js'),
            path.resolve(__dirname, 'js/framework/jquery.jsonview.js'),
        ],
        verify: [
            path.resolve(__dirname, 'js/service/verify.service.js'),
            path.resolve(__dirname, 'js/components/verify/verify.form.js'),
            path.resolve(__dirname, 'js/components/verify/verify.input.js'),
            path.resolve(__dirname, 'js/components/verify/verify.checkbox.js'),
        ],
        api: [
            path.resolve(__dirname, 'js/service/api.service.js'),
            path.resolve(__dirname, 'js/components/api/api.sidebar.item.com.js'),
            path.resolve(__dirname, 'js/components/api/api.operation.edit.detail.com.js'),
            path.resolve(__dirname, 'js/constants/api.constants.js'),
            path.resolve(__dirname, 'js/actions/api.action.js'),
            path.resolve(__dirname, 'js/reducers/api.reducer.js'),
        ],
        room: [
            path.resolve(__dirname, 'js/service/room.service.js'),
            path.resolve(__dirname, 'js/constants/room.constants.js'),
            path.resolve(__dirname, 'js/actions/room.action.js'),
            path.resolve(__dirname, 'js/reducers/room.reducer.js'),
        ],
        common : [
            // path.resolve(__dirname, 'js/model/account.model.js'),
            path.resolve(__dirname, 'js/reducers/combine.js'),
        ],
        // module
        // module : [
        //     path.resolve(__dirname, 'js/module/layour.header.js')
        // ],
        // main
        main : [
            // path.resolve(__dirname, 'js/router.js')
            path.resolve(__dirname, 'js/react.router.js'),
            path.resolve(__dirname, 'js/biz/home.view.js'),
            path.resolve(__dirname, 'js/biz/api.list.view.js'),
            path.resolve(__dirname, 'js/containers/api.detail.view.js'),
            path.resolve(__dirname, 'js/containers/api.data.view.js'),
        ]
    },
    css : {

    }
}
