import React, {useState, useEffect} from 'react';
import axios from 'axios';
export default function App(){
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [payload, setPayload] = useState('{}');

  useEffect(()=>{ fetchTasks() }, []);
  function fetchTasks(){
    axios.get('http://localhost:8000/api/tasks/').then(r=>setTasks(r.data)).catch(()=>{});
  }
  function createTask(e){
    e.preventDefault();
    let p = {};
    try { p = JSON.parse(payload) } catch(err){ alert('Invalid JSON payload'); return; }
    axios.post('http://localhost:8000/api/tasks/', {name, schedule_time: time, payload: p}).then(()=>{ setName(''); setTime(''); setPayload('{}'); fetchTasks() });
  }
  return (<div style={{fontFamily:'Arial',padding:20}}>
    <h2>Task Automation — Frontend</h2>
    <form onSubmit={createTask} style={{marginBottom:20}}>
      <input placeholder='Task name' value={name} onChange={e=>setName(e.target.value)} required />
      <input placeholder='Schedule time (ISO)' value={time} onChange={e=>setTime(e.target.value)} required />
      <textarea rows={4} value={payload} onChange={e=>setPayload(e.target.value)} />
      <button type='submit'>Create Task</button>
    </form>
    <h3>Tasks</h3>
    <ul>
      {tasks.map(t=> <li key={t.id}>{t.name} — {t.status} — {t.schedule_time}</li>)}
    </ul>
  </div>);
}
