import axios from 'axios'

const chromeAPI = 'http://chrome-api-dev.hearstautolab.com'

/**
 * Make a get request to the designated URL
 * @param url
 * @returns {Promise}
 */
function getRequest(url) {
  return new Promise((resolve, reject) => {
    return axios.get(url)
    .then((resp) => {
      resolve(resp.data)
    })
    .catch(reject)
  })
}

export default {
  getChromeTrims(queryParams) {
    let url = `${chromeAPI}/api/styles`

    if (queryParams) {
      url += `?filter=${JSON.stringify(queryParams)}`
    }
    return getRequest(url)
  }
}
