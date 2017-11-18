let app = require("express")(),
    Server = require("../../utils/server.js");

/**************
*接口参见：'https://github.com/iMeiji/Toutiao/wiki/%E4%BB%8A%E6%97%A5%E5%A4%B4%E6%9D%A1Api%E5%88%86%E6%9E%90#%E6%99%AE%E9%80%9A%E7%94%A8%E6%B3%95'

'推荐': '__all__',
'热点': 'news_hot',
'社会': 'news_society',
'娱乐': 'news_entertainment',
'科技': 'news_tech',
'军事': 'news_military',
'体育': 'news_sports'
'汽车': 'news_car',
'财经': 'news_finance',
'国际': 'news_world',
'时尚': 'news_fashion',
'旅游': 'news_travel',
'探索': 'news_discovery',
'育儿': 'news_baby',
'养生': 'news_regimen',
'故事': 'news_story',
'美文': 'news_essay',
'游戏': 'news_game',
'历史': 'news_history',
'美食': 'news_food',

**************/

app.get('/', (req, res) => {

    let type = ['__all__', 'news_hot', 'news_society', 'news_entertainment', 'news_tech', 'news_military', 'news_sports', 'news_car', 'news_finance', 'news_world', 'news_fashion', 'news_travel', 'news_discovery', 'news_baby', 'news_regimen', 'news_story', 'news_essay', 'news_game', 'news_history', 'news_food'],
        //随机选一种类型
        index = Math.floor((Math.random() * type.length)),
        path = `/list/?tag=${type[index]}&ac=wap&count=20&format=json_raw&as=A1A59982B911729&cp=585DF0A65F0F1E1&min_behot_time=0`,
        host = "m.toutiao.com",
        data = {};
    
    //false:http请求  true:https请求
    let fetch = () => {
        console.log(path)
        Server.httpGet(host, data, path, true).then(function (body) {
            res.send({
                msg: "success",
                code: 1,
                type:type[index],
                data: JSON.parse(body)
            })
        }).catch(function (err) {
            // 获取失败的话再来一遍
            fetch()
        });
    };

    fetch();
});

module.exports = app;