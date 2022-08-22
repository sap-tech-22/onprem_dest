const express = require('express');
const cfAxios = require('sap-cf-axios').default;

const app = express();

const port = process.env.VCAP_APP_PORT || 5000;
app.get('/onprem1', async (req, res) => {
    var axios = require('axios');

    var username = 's4H08';
    var password = 'Bolo111'

    const token = `${username}:${password}`;
    const encodedToken = Buffer.from(token).toString('base64');

    var config = {
      method: 'get',
    //   url: 'http://six30.mydomain.com:8770/sap/opu/odata/sap/ZTEST_ODATA1_SRV/StudentSet?$format=json',
      url: 'http://103.44.1.51:8770/sap/opu/odata/sap/ZTEST_ODATA1_SRV/StudentSet',
      headers: { 
        'Authorization': 'Basic ' + encodedToken, //czRoMDg6Qm9sbzExMQ==', 
        'Cookie': 'SAP_SESSIONID_S20_800=5EPMbJ0H9mJM-uqLuae10jo2K7EhxhHtorEYZtr1Xno%3d; sap-usercontext=sap-client=800'
      },
    //   auth: {
    //       username: 'S4H08',
    //       password: 'Bolo111'
    //   }
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      res.send(response.data.d.results);
    })
    .catch(function (error) {
      console.log(error);
    });
})
app.get('/onprem', async (req, res) => {
    axios_cf = cfAxios('S4H_1809');
    const response = await axios_cf({
        method : 'GET',
        url: '/sap/opu/odata/sap/ZTEST_ODATA1_SRV/StudentSet',
        params: {
            $format : 'json'
        },
        header : {
            accept: 'application/json'
        }
    });
    console.log(response);
    res.send(response.data.d.results);

})

app.listen(port, () => {
    console.log('App is running on port ', port);
})