
import { useState } from 'react';
import * as XLSX from 'xlsx';

function AInsight() {
  const [fileName, setFileName] = useState('');
  const [aiInsight, setAiInsight] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      sendToAI(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  const sendToAI = async (jsonData) => {
    try {
      const response = await fetch('http://localhost:5000/api/insight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jsonData }),
      });
      const data = await response.json();
      setAiInsight(data.insight);
    } catch (error) {
      console.error('AI Insight Error:', error);
    }
  };

  const downloadInsight = () => {
    const blob = new Blob([aiInsight], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName || 'AI_Insight'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📊 AI Insight Generator</h1>
      <input type="file" accept=".xlsx, .xls, .csv" onChange={handleFileUpload} />

      {aiInsight && (
        <div className="mt-6 p-4 bg-gray-100 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">🧠 Insight</h2>
          <pre className="whitespace-pre-wrap text-sm">{aiInsight}</pre>
          <button
            onClick={downloadInsight}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Download Insight
          </button>
        </div>
      )}
    </div>
  );
}

export default AInsight;