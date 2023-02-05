import React, { useState } from 'react';
import './App.css';
import { Line } from 'react-chartjs-2';
import { JsxAttribute } from 'typescript';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [inputValue, setInputValue] = useState(0);
  const [weights, setweights] = useState<weight[]>([]);

  type weight = {
    inputValue: number;
    id: number;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.valueAsNumber);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 新しい情報を作成
    const newWeight: weight = {
      inputValue: inputValue,
      id: weights.length,
    };

    setweights([newWeight, ...weights]);
    setInputValue(0)

  };

  const handleEdit = (id: number, inputValue: number) => {
    const newWeights = weights.map((weight) => {
      if (weight.id == id) {
        weight.inputValue = inputValue;
      }
      return weight;
    });

    setweights(newWeights);
  };


  const handleDelete = (id: number) => {
    const newWeights = weights.filter((weight) => weight.id !== id);
    setweights(newWeights)
  };

  const kidsChart = (kidsData: weight[]): JSX.Element => {

    if (kidsData.length == 0) {
      var idList: number[] = new Array(2);
      var valueList: number[] = new Array(2);
      idList = [0, 1];
      valueList = [0, 0];
    } else {
      var idList: number[] = new Array(kidsData.length);
      var valueList: number[] = new Array(kidsData.length);
      for (var i: number = 0; i < kidsData.length; i++) {
        idList[i] = kidsData[i].id + 1;
        valueList[i] = kidsData[i].inputValue;
      }
      idList.reverse();
      valueList.reverse();
    }

    const lineData = {
      // x 軸のラベル
      labels: idList,

      datasets: [
        {
          label: '体重遷移図(g)',
          // データの値
          data: valueList,
          // グラフの背景色
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
          ],
          // グラフの枠線の色
          borderColor: [
            'rgb(255, 99, 132)',
          ],
          // グラフの枠線の太さ
          borderWidth: 1,
        },
      ],
    };

    return <Line data={lineData} />
  }

  return (
    <div className="App">
      <div>
        <h2>こどもの体重記録管理</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="number" onChange={(e) => handleChange(e)} className="inputText" />
          <input type="submit" value="登録" className='submitbottan' />
        </form>
        {kidsChart(weights)}
        <ul className="weightList">
          {weights.map((weight) => (
            <li key={weight.id}>
              <h4>{weight.id + 1}</h4>
              <input
                type="number"
                onChange={(e) => handleEdit(weight.id, e.target.valueAsNumber)}
                className="inputText"
                value={weight.inputValue}
              />
              <button onClick={() => handleDelete(weight.id)}>消す</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
