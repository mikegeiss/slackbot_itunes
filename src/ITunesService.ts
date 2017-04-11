import request from "request";

export class ITunesService {
  static retrieveUrlInfo(url) {
    return new Promise((resolve, rejected) => {
      request({url: url, json: true}, function (error, response, body) {
        if (!error && response.statusCode === 200 && body.resultCount >= 1) {
          resolve(body.results[0]);
        }
        else {
          console.log(error, response, body);
        }
      });
    })
  }
}