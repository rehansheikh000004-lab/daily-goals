import { useEffect, useState } from "react";
import { API } from "../api";

export default function Dashboard() {
  const [text, setText] = useState("");
  const [goals, setGoals] = useState([]);

  const load = async () => {
    const res = await fetch(`${API}/api/goals`, {
      headers: { Authorization: localStorage.getItem("token") }
    });
    setGoals(await res.json());
  };

  const addGoal = async () => {
    await fetch(`${API}/api/goals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({ text })
    });
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <>
      <h2>Your Daily Goals</h2>
      <input onChange={(e) => setText(e.target.value)} />
      <button onClick={addGoal}>Add</button>

      {goals.map((g) => (
        <div key={g._id}>
          <p style={{ textDecoration: g.completed ? "line-through" : "" }}>
            {g.text}
          </p>
        </div>
      ))}
    </>
  );
}
