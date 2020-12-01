let cheerio = require('cheerio');
let request = require('request');

module.exports = doing = (link) => new Promise((resolve, reject) => {
    
    let image_url = link;
    if(image_url !== undefined){

        if(image_url.substring(0,8) === 'https://' || image_url.substring(0,7) === 'http://'){

            request(image_url, (error, response, html) => {
                if(!error){
                    console.log('Insta_grab : '+image_url+' : Loaded');
                    let $ = cheerio.load(html);

                    //basic data from the meta tags
                    let file = $('meta[property="og:type"]').attr('content');
                    let tagnya = $(`meta[property="og:${file}"]`).attr('content');
                    let url = $('meta[property="og:url"]').attr('content');
                    let title = $('meta[property="og:title"]').attr('content');
                    if(response.statusCode === 200) { resolve({'status':'ok', 'result': {'judul': title, 'from':url, 'url':tagnya, 'type':file} }) };
                    
                }else{
                    if(response.statusCode === 400){ resolve({'status':'no','result': {'pesan' : 'Error, tidak bisa mengunjungi link tersebut'} }) };
                }
            });
        }else{
            resolve({ 'status':'no', 'result': {'message' : 'link salah!'} });
        }
    }else{
        res.status(400).json({ 'status':'no', 'result': {'message' : 'Link tidak ada'} });
    }
});