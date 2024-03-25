import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState('');
  const [testCode, setTestCode] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [apiResponse, setApiResponse] = useState({ text1: "", text2: "" }); // Initialize apiResponse state
  const [stage, setStage] = useState(1);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleTestCodeChange = (event) => {
    setTestCode(event.target.value);
  };

  // for testing only
  const sampleJson = {
    "predicted_testcases": [
      {
        "input": "10 5\n1 0 1 0 1 0 1 0 1 0",
        "output": ["5"]
      },
      {
        "input": "7 4\n0 1 0 1 0 1 0",
        "output": ["3"]
      },
      {
        "input": "8 1\n1 0 0 0 0 0 0 0",
        "output": ["1"]
      },
      {
        "input": "9 9\n0 0 0 0 0 0 0 0 1",
        "output": ["1"]
      },
      {
        "input": "5 3\n1 1 1 1 1",
        "output": ["3"]
      }
    ]
  }


  // const sampleMsg = "Testing result"
  const sampleMsg = 'Predicted Pass Rate: 80.0<br>Predicted Line Coverage: 87.5<br>Predicted Branch Coverage: 87.5';


  // 接收使用者選擇的程式語言和自然語言敘述，得到unit case
  const handleFirstSubmit = () => {
    setIsLoading(true);

    document.getElementById('output').classList.remove('hidden');
    const sampleApiResponse = {
      text1: "",
      text2: JSON.stringify({ "unitTest": "Generated Unit Test Code Here" }, null, 2)
    };

    // user's input
    const data = { language, description };
    const jsonString = JSON.stringify(data);
    console.log(jsonString);
    const url = 'http://127.0.0.1:5000/data';

    // testing only
    setApiResponse({ text1: sampleMsg, text2: JSON.stringify(sampleJson, null, 2) }); // Update apiResponse state with the API response
    setIsLoading(false); // Stop loading
    setStage(2);

    // 呼叫
    // fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: jsonString,
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log('Success:', data);
    //     setApiResponse({ text1: data.message, text2: JSON.stringify(data.yourData, null, 2) }); // Update apiResponse state with the API response
    //     setIsLoading(false); // Stop loading
    //     setStage(2);
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //     setIsLoading(false); // Stop loading in case of error
    //     setStage(2);
    //   });

  };

  // 接收使用者test code，取得score
  const handleSecondSubmit = () => {
    setIsLoading(true);

    const data = { testCode };
    const jsonString = JSON.stringify(data);
    console.log(jsonString);
    const url = 'http://127.0.0.1:5000/data';


    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonString,
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setApiResponse({ text1: data.message, text2: '' }); // Update apiResponse state with the API response
        setIsLoading(false); // Stop loading
        setStage(3);
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsLoading(false); // Stop loading in case of error
        setStage(3);
      });

  };






  return (
    <div className="container mt-5 comic-neue-regular">
      <h1>AgentUTest</h1>
      <p className="lead">This is a demo website for final project of UCSB Win24 CS272.<br />
        Our team includes Weixiang Yan, Bairu Hou, Jiabao Ji, Chieh-Ying Lai, Wanjing Huang.<br />
        The core design philosophy of AgentUTest is a Generate-Verify-Include loop mechanism. AgentUTest initially auto-generates test cases for input code fragments, then verifies the effectiveness and accuracy of these test cases in a code execution engine. During the verification stage, the tool will evaluate whether the test cases accurately cover different aspects of the code being tested, including boundary conditions and potential exception handling. Once verified, these test cases are included in the test case collection for output.</p>
      <hr />
      <div className='mt-3'>
        {stage === 1 && (
          <>
            {/* 第一階段的輸入 */}
            <div className="mb-3">
              {/* 語言選擇 */}
              <label htmlFor="Programming languages" className="form-label me-3">Choose a Programming languages</label>
              <div className="btn-group" role="group" aria-label="Programming languages">
                <input type="radio" className="btn-check" id="radioPython" name="programming-language" value="python" checked={language === "python"} onChange={handleLanguageChange} />
                <label className="btn btn-outline-primary" htmlFor="radioPython">Python</label>

                <input type="radio" className="btn-check" id="radioJava" name="programming-language" value="java" checked={language === "java"} onChange={handleLanguageChange} />
                <label className="btn btn-outline-primary" htmlFor="radioJava">Java</label>

                <input type="radio" className="btn-check" id="radioC" name="programming-language" value="c" checked={language === "c"} onChange={handleLanguageChange} />
                <label className="btn btn-outline-primary" htmlFor="radioC">C</label>

                <input type="radio" className="btn-check" id="radioCPlusPlus" name="programming-language" value="c++" checked={language === "c++"} onChange={handleLanguageChange} />
                <label className="btn btn-outline-primary" htmlFor="radioCPlusPlus">C++</label>
              </div>
            </div>
            <div className="mb-3">

              <label htmlFor="description" className="form-label">Description</label>

              <textarea className="form-control" value={description} onChange={handleDescriptionChange} placeholder="Natural Language Description" rows={5} />
            </div>
            <button className="btn btn-success" onClick={handleFirstSubmit}>Send</button>
          </>
        )}
        {(stage === 2 || stage === 3) && (
          <>
            {/* 第二階段的輸入 */}
            <div className='mb-3'>
              <label htmlFor="Programming languages" className="form-label me-3">Seleted Programming Language:  <strong>{language}</strong></label>
              <br />
              <label htmlFor="description" className="form-label">Description</label>
              <textarea className="form-control" value={description} readOnly rows={5} />
            </div>
            <div className="mb-3">
              <label htmlFor="testCode" className="form-label">Test Code</label>
              <textarea className="form-control" value={testCode} onChange={handleTestCodeChange} placeholder="Paste Your Test Code" rows={10} />
            </div>
            <button className="btn btn-success" onClick={handleSecondSubmit}>Send</button>
          </>
        )}

      </div>

      <div id='output' className='hidden mt-3 mb-3'>
        {isLoading ? (
          <div className="loading">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : stage === 2 ? (
          <div>
            {/* Output Card */}
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Output</h5>
                <pre><code>{apiResponse.text2}</code></pre>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* API Response Card */}
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">API Response</h5>
                <p className="card-text">{apiResponse.text1}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div >
  );

};

export default App;
