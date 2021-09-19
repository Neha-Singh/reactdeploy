import logo from "./logo.svg";
import "./App.css";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import { useEffect } from "react";
import Chart from "chart.js";

function App() {
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Basic c2FtcnVkZGhpLmJoYW5nYWxlQG5vdi5jb206TW5ibGtqQDEyMzQ1Njc4OQ=="
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      chaincode: "assetOnboardAndValuation",
      args: [
        "GetAssetCount",
        '{"selector":{"entityId":"dgrandprideco","type":"asset","isActive":"true"}}',
      ],
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      //mode: "no-cors",
      body: raw,
      redirect: "follow",
    };

    fetch(
      "/restproxy/api/v2/channels/dpmsharedchannel/chaincode-queries",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  });
  const data = {
    labels: ["Onboarded", "Not Onboarded", "Onboarding Failed"],
    text: "Total Assets 116",
    datasets: [
      {
        data: [35, 165, 250],
        backgroundColor: ["#ff084a", "#F6BE00", "#006400"],
      },
    ],
  };

  const options = {
    cutoutPercentage: 60,
  };

  const plugins = [
    {
      beforeDraw: function (chart) {
        var width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
        ctx.restore();
        var fontSize = (height / 160).toFixed(2);
        ctx.font = fontSize + "em sans-serif";
        ctx.textBaseline = "top";
        var text = "116",
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2;
        ctx.fillText(text, textX, textY);
        ctx.save();
      },
    },
  ];

  const doughnutlabel = {
    labels: [
      {
        text: "550",
        font: {
          size: 20,
          weight: "bold",
        },
      },
      {
        text: "total",
      },
    ],
  };

  return (
    <div class="col-4">
      <div class="bg-white">
        {" "}
        <p>Asset Status</p>
        <Doughnut
          type="doughnut"
          data={data}
          options={{
            cutout: 100,
          }}
          plugins={plugins}
          doughnutlabel={doughnutlabel}
        />
      </div>
    </div>
  );
}

export default App;
