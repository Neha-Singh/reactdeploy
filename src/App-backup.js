import logo from './logo.svg';
import './App.css';
import {Bar, Pie, Doughnut} from 'react-chartjs-2';
import { useEffect } from 'react';
import Chart from 'chart.js'



function App() {

  useEffect( () => {

    const dataObj = {
      "chaincode":"assetOnboardAndValuation",
      "args":[
         "GetAssetCount",
         "{\"selector\":{\"entityId\":\"dgrandprideco\",\"type\":\"asset\",\"isActive\":\"true\"}}"
      ]
   }

    fetch('https://dgrandprideco-novblockchain-phx.blockchain.ocp.oraclecloud.com:7443/restproxy/api/v2/channels/dpmsharedchannel/chaincode-queries', {
      method: 'POST',
      mode: "no-cors",
      credentials: 'include',
      headers: { "Content-Type": "application/json", 
      "Authorization": "Basic cHJpYW5rYS5tYWhlc2hzaGFybWFAbm92LmNvbTpTdWtvb25AMTIzNDU2" },
      body: JSON.stringify(dataObj)
    }).then((res) => {
      console.log('Service response',res);
    })

  })
  return (
    <div class="col-4">
    <div class="bg-white"> <p>Asset Status</p>
     <Doughnut
           
           data={{
             labels:['Onboarded','Not Onboarded','Onboarding Failed'],
             text: '23%',
             datasets:[{
               data:[35,165,250],
               backgroundColor:['#ff084a','#F6BE00','#006400'],
             }],
           }
           }
           options={{
            cutoutPercentage: 80
           }}

           
           >
     
           </Doughnut>
           </div>
           </div>
      
  );
}

export default App;
