import * as request from "request";

export class ITunesService {
  static retrieveUrlInfo(url) {
    return new Promise((resolve, rejected) => {
      request({url: url, json: true}, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          if (body.resultCount >= 1) {
            resolve(body.results[0]);
          }
          else {
            console.error('ERROR retrieveUrlInfo - body', url, body);
          }
        }
        else {
          console.error('ERROR retrieveUrlInfo', error, response, body);
        }
      });
    })
  }
}